import React from 'react';
import { Exercise } from '../types';
import { ExternalLink, Youtube, Search, CheckCircle2, AlertCircle, X, Dumbbell, UserCheck, Plus } from 'lucide-react';

interface ExerciseSearchModalProps {
  exercise: Exercise | null;
  onClose: () => void;
  onAddToSchedule?: (exercise: Exercise) => void;
}

export const ExerciseSearchModal: React.FC<ExerciseSearchModalProps> = ({
  exercise,
  onClose,
  onAddToSchedule
}) => {
  if (!exercise) return null;

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(exercise.searchQuery)}`;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.searchQuery + ' tutorial')}`;

  return (
    <div 
      id="exercise-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="exercise-modal-content"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-700/80 rounded-2xl p-6 shadow-2xl text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 rounded-full transition-colors cursor-pointer"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            exercise.equipment === 'barbell' 
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
              : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
          }`}>
            {exercise.equipment === 'barbell' ? (
              <>
                <Dumbbell className="w-3.5 h-3.5" />
                Pakai Barbel
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                Tanpa Barbel (Bodyweight)
              </>
            )}
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
            {exercise.category}
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
            Level: {exercise.difficulty}
          </span>
        </div>

        <h2 id="modal-exercise-name" className="text-2xl font-bold tracking-tight text-white mb-2">
          {exercise.name}
        </h2>

        <p className="text-sm text-zinc-300 leading-relaxed mb-5">
          {exercise.description}
        </p>

        {/* Otot Target & Rekomendasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-3.5 bg-zinc-950/60 rounded-xl border border-zinc-800">
          <div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Target Otot:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {exercise.targetMuscles.map((muscle, idx) => (
                <span key={idx} className="text-xs px-2 py-0.5 rounded bg-zinc-800/80 text-lime-400 border border-lime-400/20">
                  {muscle}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
              Rekomendasi Set & Repetisi:
            </span>
            <p className="text-sm font-semibold text-zinc-200">
              {exercise.recommendedSets} • {exercise.recommendedReps}
            </p>
          </div>
        </div>

        {/* Panduan Langkah */}
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Langkah-Langkah Gerakan:
          </h3>
          <ol className="space-y-2 text-sm text-zinc-300">
            {exercise.steps.map((step, idx) => (
              <li key={idx} className="flex gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-800 text-lime-400 font-bold text-xs flex items-center justify-center border border-zinc-700">
                  {idx + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips & Form Safety */}
        <div className="mb-6 p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-0.5">
              Tips Kunci & Keamanan Form:
            </h4>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {exercise.tips}
            </p>
          </div>
        </div>

        {/* Direct Internet Search Action Buttons */}
        <div className="border-t border-zinc-800 pt-5 space-y-3">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
              <Search className="w-4 h-4 text-lime-400" />
              Gak Tau Gerakannya? Cari Di Internet Langsung:
            </h4>
            <p className="text-xs text-zinc-400">
              Buka panduan visual dan video tutorial lengkap gerakan <span className="text-white font-medium">"{exercise.name}"</span> dengan sekali klik:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              id="google-search-link"
              href={googleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-all border border-zinc-700 hover:border-zinc-500 shadow-md group"
            >
              <Search className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              <span>Cari di Google Search</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <a
              id="youtube-search-link"
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-200 font-semibold text-sm transition-all border border-red-500/40 hover:border-red-500/70 shadow-md group"
            >
              <Youtube className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              <span>Tonton di YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 text-red-300" />
            </a>
          </div>

          {onAddToSchedule && (
            <button
              id="add-to-schedule-btn"
              onClick={() => {
                onAddToSchedule(exercise);
                onClose();
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold text-sm transition-all shadow-lg hover:shadow-lime-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Tambahkan Gerakan Ini ke Jadwal Hari Ini
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
