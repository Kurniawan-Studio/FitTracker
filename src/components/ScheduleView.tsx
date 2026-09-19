import React, { useState } from 'react';
import { DayWorkout, Exercise } from '../types';
import { EXERCISE_DATABASE } from '../data/exercises';
import { DEFAULT_WEEKLY_SCHEDULE, BODYWEIGHT_WEEKLY_PRESET } from '../data/defaultSchedule';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Dumbbell, 
  UserCheck, 
  Search, 
  Plus, 
  Trash2, 
  Coffee, 
  RotateCcw, 
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';

interface ScheduleViewProps {
  schedule: DayWorkout[];
  setSchedule: React.Dispatch<React.SetStateAction<DayWorkout[]>>;
  onOpenExerciseDetails: (exercise: Exercise) => void;
  onNavigateToLibrary: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  schedule,
  setSchedule,
  onOpenExerciseDetails,
  onNavigateToLibrary
}) => {
  // Default to today's day of week or Monday
  const dayNames: DayWorkout['dayName'][] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  
  // Map current JS day (0 = Sunday) to Indonesian day
  const todayJs = new Date().getDay();
  const dayMapping: Record<number, DayWorkout['dayName']> = {
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
    6: 'Sabtu',
    0: 'Minggu'
  };
  const initialDay = dayMapping[todayJs] || 'Senin';
  
  const [selectedDayName, setSelectedDayName] = useState<DayWorkout['dayName']>(initialDay);
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [exerciseSearchTerm, setExerciseSearchTerm] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState<'all' | 'barbell' | 'bodyweight'>('all');

  const currentDayIndex = schedule.findIndex((d) => d.dayName === selectedDayName);
  const currentDay = schedule[currentDayIndex] || schedule[0];

  const completedDaysCount = schedule.filter((d) => d.completed).length;
  const progressPercent = Math.round((completedDaysCount / schedule.length) * 100);

  // Toggle complete for the entire day
  const handleToggleDayComplete = () => {
    setSchedule((prev) => {
      const updated = [...prev];
      const day = { ...updated[currentDayIndex] };
      const nextCompleted = !day.completed;
      day.completed = nextCompleted;
      // also toggle all exercises in that day to match
      day.exercises = day.exercises.map((e) => ({ ...e, completed: nextCompleted }));
      updated[currentDayIndex] = day;
      return updated;
    });
  };

  // Toggle single exercise completed in current day
  const handleToggleExercise = (exerciseId: string) => {
    setSchedule((prev) => {
      const updated = [...prev];
      const day = { ...updated[currentDayIndex] };
      day.exercises = day.exercises.map((item) => {
        if (item.exerciseId === exerciseId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      // If all exercises are now completed, mark day as completed
      const allDone = day.exercises.length > 0 && day.exercises.every((e) => e.completed);
      if (allDone && !day.completed) {
        day.completed = true;
      }
      updated[currentDayIndex] = day;
      return updated;
    });
  };

  // Toggle Rest Day status
  const handleToggleRestDay = () => {
    setSchedule((prev) => {
      const updated = [...prev];
      const day = { ...updated[currentDayIndex] };
      day.isRestDay = !day.isRestDay;
      if (day.isRestDay) {
        day.title = 'Hari Istirahat / Recovery';
        day.focus = 'Regenerasi otot, pemulihan sendi, dan hidrasi';
      } else {
        day.title = 'Sesi Latihan Kustom';
        day.focus = 'Latihan kekuatan dan pembentukan otot';
      }
      updated[currentDayIndex] = day;
      return updated;
    });
  };

  // Update custom note for an exercise in current day
  const handleUpdateNote = (exerciseId: string, note: string) => {
    setSchedule((prev) => {
      const updated = [...prev];
      const day = { ...updated[currentDayIndex] };
      day.exercises = day.exercises.map((item) => {
        if (item.exerciseId === exerciseId) {
          return { ...item, customNotes: note };
        }
        return item;
      });
      updated[currentDayIndex] = day;
      return updated;
    });
  };

  // Remove exercise from current day
  const handleRemoveExercise = (exerciseId: string) => {
    setSchedule((prev) => {
      const updated = [...prev];
      const day = { ...updated[currentDayIndex] };
      day.exercises = day.exercises.map((e) => ({ ...e })).filter((e) => e.exerciseId !== exerciseId);
      updated[currentDayIndex] = day;
      return updated;
    });
  };

  // Add exercise to current day
  const handleAddExerciseToDay = (exerciseId: string) => {
    setSchedule((prev) => {
      const updated = [...prev];
      const day = { ...updated[currentDayIndex] };
      if (!day.exercises.some((e) => e.exerciseId === exerciseId)) {
        day.exercises = [...day.exercises, { exerciseId, completed: false }];
        if (day.isRestDay) day.isRestDay = false;
      }
      updated[currentDayIndex] = day;
      return updated;
    });
    setIsAddExerciseOpen(false);
  };

  // Reset weekly progress checkmarks
  const handleResetWeeklyProgress = () => {
    if (window.confirm('Reset semua centang latihan minggu ini untuk memulai minggu baru?')) {
      setSchedule((prev) =>
        prev.map((day) => ({
          ...day,
          completed: false,
          exercises: day.exercises.map((ex) => ({ ...ex, completed: false }))
        }))
      );
    }
  };

  // Switch to Preset routine
  const handleApplyPreset = (presetType: 'default' | 'bodyweight') => {
    const name = presetType === 'default' ? 'PPL Barbel & Mix' : 'Full Calisthenics (Tanpa Barbel)';
    if (window.confirm(`Ganti jadwal ke preset "${name}"? Jadwal harian saat ini akan disesuaikan.`)) {
      if (presetType === 'default') {
        setSchedule(DEFAULT_WEEKLY_SCHEDULE);
      } else {
        setSchedule(BODYWEIGHT_WEEKLY_PRESET);
      }
    }
  };

  // Filtered exercises for adding
  const availableToAdd = EXERCISE_DATABASE.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(exerciseSearchTerm.toLowerCase()) ||
      ex.targetMuscles.some((m) => m.toLowerCase().includes(exerciseSearchTerm.toLowerCase())) ||
      ex.category.toLowerCase().includes(exerciseSearchTerm.toLowerCase());
    const matchesEquipment = equipmentFilter === 'all' || ex.equipment === equipmentFilter;
    const notAlreadyInDay = !currentDay.exercises.some((e) => e.exerciseId === ex.id);
    return matchesSearch && matchesEquipment && notAlreadyInDay;
  });

  return (
    <div id="schedule-planner-section" className="space-y-6">
      
      {/* Top Banner & Progress Summary */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-5 h-5 text-lime-400" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Jadwal Latihan Mingguan
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Rencanakan latihanmu dari Senin hingga Minggu. Centang gerakan yang telah diselesaikan.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="reset-week-btn"
              onClick={handleResetWeeklyProgress}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold border border-zinc-700 transition-all cursor-pointer"
              title="Reset centang minggu ini"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Minggu</span>
            </button>

            {/* Presets dropdown / switch */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-xs font-medium">
              <button
                onClick={() => handleApplyPreset('default')}
                className="px-2.5 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Gunakan Preset Barbel & Mix"
              >
                Preset Barbel
              </button>
              <button
                onClick={() => handleApplyPreset('bodyweight')}
                className="px-2.5 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Gunakan Preset Calisthenics / Bodyweight"
              >
                Preset Bodyweight
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Progress Bar */}
        <div className="mt-5 pt-4 border-t border-zinc-800/80">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-zinc-400">
              Progres Latihan Minggu Ini: <strong className="text-lime-400">{completedDaysCount} dari 7 Hari</strong> ({progressPercent}%)
            </span>
            <span className="text-zinc-400">
              {completedDaysCount === 7 ? '🎉 Target Mingguan Tercapai!' : 'Konsistensi adalah Kunci!'}
            </span>
          </div>
          <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Days of Week Tab Strip (Senin - Minggu) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {dayNames.map((dayName) => {
          const dayData = schedule.find((d) => d.dayName === dayName);
          const isSelected = selectedDayName === dayName;
          const isDone = dayData?.completed;
          const isRest = dayData?.isRestDay;

          return (
            <button
              key={dayName}
              id={`day-tab-${dayName.toLowerCase()}`}
              onClick={() => setSelectedDayName(dayName)}
              className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-zinc-800/90 border-lime-400 shadow-lg shadow-lime-400/10 ring-1 ring-lime-400'
                  : 'bg-zinc-900/70 border-zinc-800/80 hover:bg-zinc-800/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isSelected ? 'text-lime-400' : 'text-zinc-400'
                }`}>
                  {dayName}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : isRest ? (
                  <Coffee className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                )}
              </div>

              <div className="text-xs font-semibold text-zinc-200 truncate">
                {isRest ? 'Istirahat' : dayData?.title.split('(')[0] || 'Latihan'}
              </div>

              <div className="text-[11px] text-zinc-500 truncate mt-0.5">
                {isRest ? 'Recovery' : `${dayData?.exercises.length || 0} Gerakan`}
              </div>

              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-lime-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Main Dashboard */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-xl">
        
        {/* Day Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-lime-500/15 text-lime-400 border border-lime-500/30">
                Hari {currentDay.dayName}
              </span>
              {currentDay.isRestDay && (
                <span className="flex items-center gap-1 px-2.5 py-0.8 rounded-lg text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <Coffee className="w-3 h-3" />
                  Hari Istirahat
                </span>
              )}
              {currentDay.completed && (
                <span className="flex items-center gap-1 px-2.5 py-0.8 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  Selesai
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {currentDay.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              {currentDay.focus}
            </p>
          </div>

          {/* Action buttons for day */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="toggle-day-complete-btn"
              onClick={handleToggleDayComplete}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                currentDay.completed
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-lime-500 hover:bg-lime-400 text-zinc-950 hover:shadow-lime-500/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentDay.completed ? 'Batalkan Status Selesai' : 'Tandai Hari Ini Selesai'}</span>
            </button>

            <button
              onClick={handleToggleRestDay}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                currentDay.isRestDay
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>{currentDay.isRestDay ? 'Ubah ke Latihan' : 'Jadikan Hari Istirahat'}</span>
            </button>
          </div>
        </div>

        {/* Exercises List for the Day */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-lime-400" />
              Daftar Gerakan ({currentDay.exercises.length})
            </h4>

            {!currentDay.isRestDay && (
              <button
                id="add-exercise-to-day-btn"
                onClick={() => setIsAddExerciseOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-lime-400 text-xs font-semibold border border-zinc-700 hover:border-lime-500/50 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Gerakan</span>
              </button>
            )}
          </div>

          {currentDay.isRestDay && currentDay.exercises.length === 0 ? (
            <div className="text-center py-10 bg-zinc-950/40 rounded-xl border border-zinc-800/80 p-6">
              <Coffee className="w-12 h-12 text-amber-400/80 mx-auto mb-3" />
              <h5 className="text-base font-bold text-white mb-1">Hari Ini Waktunya Pemulihan Tubuh!</h5>
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed mb-4">
                Otot tumbuh dan berkembang saat kita istirahat, bukan saat berlatih. Pastikan asupan protein tercukupi, tidur minimal 7-8 jam, dan minum banyak air putih.
              </p>
              <button
                onClick={handleToggleRestDay}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 cursor-pointer"
              >
                Ingin tetap latihan hari ini? Tambah Gerakan
              </button>
            </div>
          ) : currentDay.exercises.length === 0 ? (
            <div className="text-center py-10 bg-zinc-950/40 rounded-xl border border-zinc-800/80 p-6">
              <Dumbbell className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-zinc-300 mb-1">Belum ada gerakan latihan untuk hari ini</p>
              <p className="text-xs text-zinc-500 mb-4">Pilih gerakan dari katalog barbel atau bodyweight kami.</p>
              <button
                onClick={() => setIsAddExerciseOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-zinc-950 text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Tambah Gerakan Pertama
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {currentDay.exercises.map((item, index) => {
                const exData = EXERCISE_DATABASE.find((e) => e.id === item.exerciseId);
                if (!exData) return null;

                return (
                  <div
                    key={item.exerciseId}
                    id={`exercise-row-${item.exerciseId}`}
                    className={`p-4 rounded-xl border transition-all ${
                      item.completed
                        ? 'bg-zinc-950/80 border-emerald-500/40 opacity-90'
                        : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Left: Checkbox + Title + Equipment Badge */}
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleToggleExercise(item.exerciseId)}
                          className="mt-0.5 text-zinc-400 hover:text-lime-400 transition-colors cursor-pointer"
                          title={item.completed ? 'Tandai belum selesai' : 'Tandai selesai'}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-zinc-600 hover:text-lime-400" />
                          )}
                        </button>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-mono text-zinc-500">#{index + 1}</span>
                            <h5 className={`text-base font-bold text-white transition-all ${
                              item.completed ? 'line-through text-zinc-400' : ''
                            }`}>
                              {exData.name}
                            </h5>

                            {/* Equipment Badge */}
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                              exData.equipment === 'barbell'
                                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {exData.equipment === 'barbell' ? (
                                <>
                                  <Dumbbell className="w-3 h-3" />
                                  Barbel
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-3 h-3" />
                                  Bodyweight
                                </>
                              )}
                            </span>

                            <span className="text-[11px] text-zinc-400 px-2 py-0.5 rounded bg-zinc-800">
                              {exData.category}
                            </span>
                          </div>

                          <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                            {exData.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-zinc-400">
                            <span className="text-lime-400/90 font-medium">
                              🎯 {exData.recommendedSets} • {exData.recommendedReps}
                            </span>
                            <span>
                              Target: {exData.targetMuscles.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: "Gak Tau Gerakannya? Cari Di Internet" & Actions */}
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
                        {/* THE REQUIRED SPECIAL BUTTON */}
                        <button
                          id={`search-internet-btn-${item.exerciseId}`}
                          onClick={() => onOpenExerciseDetails(exData)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lime-500/10 hover:bg-lime-500/20 text-lime-400 border border-lime-500/30 hover:border-lime-500/60 text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
                          title="Buka panduan cara gerakan dan pencarian internet"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Gak Tau Gerakannya? Cari Di Internet</span>
                        </button>

                        <button
                          onClick={() => handleRemoveExercise(item.exerciseId)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Hapus dari jadwal hari ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Custom Note input for this exercise */}
                    <div className="mt-3 pt-2.5 border-t border-zinc-900 flex items-center gap-2">
                      <span className="text-[11px] text-zinc-500 font-medium whitespace-nowrap">
                        Catatan Beban / Set:
                      </span>
                      <input
                        type="text"
                        placeholder="Contoh: Beban 30kg, 10 reps, terasa mantap..."
                        value={item.customNotes || ''}
                        onChange={(e) => handleUpdateNote(item.exerciseId, e.target.value)}
                        className="w-full text-xs bg-zinc-900 border border-zinc-800 focus:border-lime-500 rounded-lg px-2.5 py-1 text-zinc-200 placeholder-zinc-600 focus:outline-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Exercise Modal to Current Day */}
      {isAddExerciseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
            
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Pilih Gerakan untuk Hari {currentDay.dayName}
                </h3>
                <p className="text-xs text-zinc-400">
                  Cari gerakan barbel atau bodyweight yang ingin ditambahkan
                </p>
              </div>
              <button
                onClick={() => setIsAddExerciseOpen(false)}
                className="text-zinc-400 hover:text-white p-1 text-sm rounded bg-zinc-800"
              >
                Tutup
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 bg-zinc-950/70 border-b border-zinc-800 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Cari nama gerakan, otot (dada, bahu, squat, curl)..."
                  value={exerciseSearchTerm}
                  onChange={(e) => setExerciseSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-lime-400"
                />
              </div>

              {/* Equipment Selector */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEquipmentFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    equipmentFilter === 'all'
                      ? 'bg-lime-400 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Semua Alat
                </button>
                <button
                  onClick={() => setEquipmentFilter('barbell')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    equipmentFilter === 'barbell'
                      ? 'bg-amber-400 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Dumbbell className="w-3 h-3" />
                  Pakai Barbel
                </button>
                <button
                  onClick={() => setEquipmentFilter('bodyweight')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    equipmentFilter === 'bodyweight'
                      ? 'bg-emerald-400 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-3 h-3" />
                  Tanpa Barbel (Bodyweight)
                </button>
              </div>
            </div>

            {/* List of Exercises */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {availableToAdd.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 text-xs">
                  Tidak ada gerakan yang cocok dengan pencarian atau semua sudah ada di jadwal hari ini.
                </div>
              ) : (
                availableToAdd.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-3 bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 rounded-xl flex items-center justify-between gap-3 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{ex.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          ex.equipment === 'barbell' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {ex.equipment === 'barbell' ? 'Barbel' : 'Bodyweight'}
                        </span>
                        <span className="text-[10px] text-zinc-400 px-2 py-0.5 rounded bg-zinc-800">
                          {ex.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{ex.description}</p>
                    </div>

                    <button
                      onClick={() => handleAddExerciseToDay(ex.id)}
                      className="px-3 py-1.5 rounded-lg bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold text-xs flex items-center gap-1 flex-shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Pilih
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t border-zinc-800 bg-zinc-950/80 flex justify-between items-center text-xs">
              <span className="text-zinc-500">
                Menampilkan {availableToAdd.length} gerakan
              </span>
              <button
                onClick={onNavigateToLibrary}
                className="text-lime-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Buka Pustaka Gerakan Lengkap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
