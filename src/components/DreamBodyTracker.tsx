import React, { useState, useRef } from 'react';
import { DreamBodyPhoto, UserStats, ProgressLog } from '../types';
import { compressImageFile, calculateBMI } from '../utils/storage';
import { 
  Sparkles, 
  Upload, 
  Camera, 
  Trash2, 
  Scale, 
  Target, 
  TrendingDown, 
  TrendingUp, 
  Save, 
  Plus, 
  Calendar, 
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Heart
} from 'lucide-react';

interface DreamBodyTrackerProps {
  userStats: UserStats;
  setUserStats: React.Dispatch<React.SetStateAction<UserStats>>;
  photos: DreamBodyPhoto[];
  setPhotos: React.Dispatch<React.SetStateAction<DreamBodyPhoto[]>>;
  progressLogs: ProgressLog[];
  setProgressLogs: React.Dispatch<React.SetStateAction<ProgressLog[]>>;
}

export const DreamBodyTracker: React.FC<DreamBodyTrackerProps> = ({
  userStats,
  setUserStats,
  photos,
  setPhotos,
  progressLogs,
  setProgressLogs
}) => {
  // Local form state for stats
  const [statsForm, setStatsForm] = useState<UserStats>(userStats);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // New photo modal/form state
  const [photoType, setPhotoType] = useState<DreamBodyPhoto['type']>('dream_body');
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoNotes, setPhotoNotes] = useState('');

  // New progress log entry form
  const [newLogWeight, setNewLogWeight] = useState<string>(userStats.currentWeight ? String(userStats.currentWeight) : '70');
  const [newLogNotes, setNewLogNotes] = useState('');

  const dreamBodyFileInputRef = useRef<HTMLInputElement>(null);
  const progressFileInputRef = useRef<HTMLInputElement>(null);

  // Calculate BMI
  const bmiInfo = calculateBMI(statsForm.currentWeight, statsForm.height);
  const weightDifference = statsForm.targetWeight - statsForm.currentWeight;

  // Dream Body photo(s)
  const dreamPhotos = photos.filter((p) => p.type === 'dream_body');
  const progressPhotos = photos.filter((p) => p.type !== 'dream_body');

  // Handle personal stats form submit
  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    setUserStats(statsForm);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  // Process and upload photo (both Dream Body & Progress)
  const handlePhotoUpload = async (file: File, type: DreamBodyPhoto['type']) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Harap pilih file gambar (JPG, PNG, atau WEBP).');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      // Auto compress to JPEG ~800px max, quality 0.75 so localStorage stays lightweight
      const compressedBase64 = await compressImageFile(file);

      const newPhoto: DreamBodyPhoto = {
        id: `photo-${Date.now()}`,
        title: photoTitle.trim() || (type === 'dream_body' ? 'Target Dream Body' : 'Progres Tubuh'),
        type,
        imageUrl: compressedBase64,
        date: new Date().toISOString().split('T')[0],
        notes: photoNotes.trim()
      };

      setPhotos((prev) => [newPhoto, ...prev]);
      setPhotoTitle('');
      setPhotoNotes('');
    } catch (err) {
      console.error(err);
      setUploadError('Gagal memproses gambar. Pastikan ukuran file wajar.');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete photo
  const handleDeletePhoto = (photoId: string) => {
    if (window.confirm('Hapus foto ini dari galeri?')) {
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    }
  };

  // Add a new weight log entry
  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const weightVal = parseFloat(newLogWeight);
    if (!weightVal || isNaN(weightVal)) return;

    const newEntry: ProgressLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      weight: weightVal,
      notes: newLogNotes.trim() || 'Pencatatan rutin'
    };

    setProgressLogs((prev) => [newEntry, ...prev]);
    // update current weight
    setStatsForm((prev) => ({ ...prev, currentWeight: weightVal }));
    setUserStats((prev) => ({ ...prev, currentWeight: weightVal }));
    setNewLogNotes('');
  };

  // Delete log entry
  const handleDeleteLog = (id: string) => {
    setProgressLogs((prev) => prev.filter((log) => log.id !== id));
  };

  return (
    <div id="dream-body-tracker-section" className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-lime-400" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Dream Body & Progress Tracker
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Unggah foto target bentuk tubuh impianmu ("Dream Body"), simpan progres foto transformasi, dan pantau perubahan berat badan secara lokal.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-400">
            <span>Tersimpan di Local Storage Browser</span>
          </div>
        </div>
      </div>

      {uploadError && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* SECTION 1: DREAM BODY VISION BOARD */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              Vision Board: Foto "Dream Body" (Target Impian)
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Jadikan foto postur atau bentuk badan impian ini sebagai visualisasi dan motivasi harian saat berolahraga.
            </p>
          </div>

          <button
            id="upload-dream-body-btn"
            onClick={() => dreamBodyFileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
          >
            <Upload className="w-4 h-4" />
            <span>Unggah Foto Dream Body</span>
          </button>
          
          <input
            ref={dreamBodyFileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePhotoUpload(file, 'dream_body');
              e.target.value = '';
            }}
          />
        </div>

        {dreamPhotos.length === 0 ? (
          <div 
            onClick={() => dreamBodyFileInputRef.current?.click()}
            className="border-2 border-dashed border-zinc-800 hover:border-amber-400/50 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-zinc-950/40"
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Belum Ada Foto Dream Body</h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-3">
              Klik di sini untuk mengunggah foto postur atletis, model fitness, atau bentuk fisik impian yang ingin kamu capai.
            </p>
            <span className="inline-block px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-semibold rounded-lg">
              Pilih Foto dari Perangkat
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dreamPhotos.map((photo) => (
              <div 
                key={photo.id}
                className="relative group bg-zinc-950 rounded-xl overflow-hidden border border-amber-500/30 shadow-lg"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500 text-zinc-950 shadow-md">
                  ★ Dream Body
                </div>

                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                  title="Hapus foto ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="p-3 bg-zinc-900/90 border-t border-zinc-800">
                  <h5 className="text-xs font-bold text-white truncate">{photo.title}</h5>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Target: {statsForm.targetWeight} kg • Diunggah {photo.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: PERSONAL STATS & TARGET GOALS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Form Input Target & BMI */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-lime-400" />
                Statistik & Target Pribadi
              </h3>
              <p className="text-xs text-zinc-400">
                Atur berat saat ini, target berat badan, dan kalkulator indeks massa tubuh (BMI)
              </p>
            </div>

            {saveSuccessMsg && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold animate-pulse">
                <CheckCircle className="w-3.5 h-3.5" />
                Tersimpan!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveStats} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Berat Saat Ini (kg):
                </label>
                <input
                  id="stats-current-weight"
                  type="number"
                  step="0.5"
                  value={statsForm.currentWeight || ''}
                  onChange={(e) => setStatsForm({ ...statsForm, currentWeight: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-lime-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Target Berat Badan (kg):
                </label>
                <input
                  id="stats-target-weight"
                  type="number"
                  step="0.5"
                  value={statsForm.targetWeight || ''}
                  onChange={(e) => setStatsForm({ ...statsForm, targetWeight: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-lime-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Tinggi Badan (cm):
                </label>
                <input
                  id="stats-height"
                  type="number"
                  value={statsForm.height || ''}
                  onChange={(e) => setStatsForm({ ...statsForm, height: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-lime-400"
                  required
                />
              </div>
            </div>

            {/* Target Goals Text */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Target / Goals Latihan:
              </label>
              <textarea
                rows={2}
                value={statsForm.targetGoal}
                onChange={(e) => setStatsForm({ ...statsForm, targetGoal: e.target.value })}
                placeholder="Contoh: Turunkan kadar lemak ke 15%, bentuk otot dada dan punggung sayap, push up 30 repetisi..."
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
              />
            </div>

            {/* Motivation Quote */}
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Kata Motivasi Pribadi:
              </label>
              <input
                type="text"
                value={statsForm.motivationalQuote}
                onChange={(e) => setStatsForm({ ...statsForm, motivationalQuote: e.target.value })}
                placeholder="Contoh: Jangan berhenti saat lelah, berhentilah saat selesai!"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                id="save-stats-btn"
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Statistik</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Instant BMI & Target Difference Cards */}
        <div className="space-y-4">
          
          {/* Target Gap Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Selisih Menuju Target:
            </span>
            <div className="flex items-center gap-2 mt-1">
              {weightDifference < 0 ? (
                <>
                  <TrendingDown className="w-6 h-6 text-emerald-400" />
                  <span className="text-2xl font-extrabold text-white">
                    {Math.abs(weightDifference)} kg
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">(Perlu Turun)</span>
                </>
              ) : weightDifference > 0 ? (
                <>
                  <TrendingUp className="w-6 h-6 text-amber-400" />
                  <span className="text-2xl font-extrabold text-white">
                    +{weightDifference} kg
                  </span>
                  <span className="text-xs text-amber-400 font-semibold">(Perlu Naik / Bulking)</span>
                </>
              ) : (
                <span className="text-lg font-bold text-emerald-400">
                  🎯 Target Berat Badan Tercapai!
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Dari {statsForm.currentWeight} kg menuju target {statsForm.targetWeight} kg.
            </p>
          </div>

          {/* BMI Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Kalkulator Indeks Massa Tubuh (BMI):
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white font-mono">
                {bmiInfo.bmi}
              </span>
              <span className={`text-xs font-bold ${bmiInfo.color}`}>
                • {bmiInfo.category}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
              Berdasarkan tinggi {statsForm.height} cm dan berat {statsForm.currentWeight} kg.
            </p>
          </div>

        </div>

      </div>

      {/* SECTION 3: GALERI FOTO PROGRES SAYA */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              Galeri Progres & Transformasi Fisik
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Ambil foto postur tubuh secara berkala untuk melihat perubahan otot dan penurunan lemak dari waktu ke waktu.
            </p>
          </div>

          <button
            id="upload-progress-photo-btn"
            onClick={() => progressFileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
          >
            <Upload className="w-4 h-4" />
            <span>Tambah Foto Progres</span>
          </button>

          <input
            ref={progressFileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePhotoUpload(file, 'progress_current');
              e.target.value = '';
            }}
          />
        </div>

        {progressPhotos.length === 0 ? (
          <div 
            onClick={() => progressFileInputRef.current?.click()}
            className="border-2 border-dashed border-zinc-800 hover:border-emerald-400/50 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-zinc-950/40"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Camera className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Belum Ada Foto Progres</h4>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-3">
              Ambil foto cermin (mirror selfie) atau foto postur depan/belakang hari ini untuk mencatat titik awal perjalananmu.
            </p>
            <span className="inline-block px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-emerald-400 text-xs font-semibold rounded-lg">
              Unggah Foto Progres Hari Ini
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {progressPhotos.map((photo) => (
              <div 
                key={photo.id}
                className="relative group bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 shadow-md"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-900/90 text-emerald-400 border border-emerald-500/30">
                  {photo.date}
                </div>

                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                  title="Hapus foto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="p-2.5 bg-zinc-900/90 border-t border-zinc-800">
                  <h5 className="text-xs font-bold text-white truncate">{photo.title}</h5>
                  {photo.notes && (
                    <p className="text-[10px] text-zinc-400 truncate mt-0.5">{photo.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 4: LOG CATATAN BERAT BADAN HARIAN */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-lime-400" />
          Riwayat Catatan Berat Badan & Evaluasi
        </h3>
        <p className="text-xs text-zinc-400 mb-4">
          Catat timbangan dan catatan mingguan untuk memantau tren penurunan atau kenaikan massa otot.
        </p>

        {/* Input Log Form */}
        <form onSubmit={handleAddLog} className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6 p-4 bg-zinc-950/70 border border-zinc-800 rounded-xl">
          <div className="sm:col-span-3">
            <label className="text-xs font-semibold text-zinc-400 block mb-1">
              Berat Badan (kg):
            </label>
            <input
              type="number"
              step="0.1"
              value={newLogWeight}
              onChange={(e) => setNewLogWeight(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-lime-400"
              required
            />
          </div>

          <div className="sm:col-span-7">
            <label className="text-xs font-semibold text-zinc-400 block mb-1">
              Catatan / Kondisi Fisik:
            </label>
            <input
              type="text"
              placeholder="Contoh: Otot dada makin padat, latihan squat terasa lebih enteng..."
              value={newLogNotes}
              onChange={(e) => setNewLogNotes(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2 px-3 rounded-lg bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Log</span>
            </button>
          </div>
        </form>

        {/* Logs Table / List */}
        <div className="space-y-2">
          {progressLogs.length === 0 ? (
            <p className="text-xs text-zinc-500 text-center py-4">Belum ada riwayat timbangan yang dicatat.</p>
          ) : (
            progressLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                    {log.date}
                  </span>
                  <span className="font-bold text-white text-sm">
                    {log.weight} kg
                  </span>
                  <span className="text-zinc-300 hidden sm:inline">
                    {log.notes}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteLog(log.id)}
                  className="p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Hapus log"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
