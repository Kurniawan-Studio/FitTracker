import React, { useState } from 'react';
import { Exercise, MuscleGroup, EquipmentType } from '../types';
import { EXERCISE_DATABASE } from '../data/exercises';
import { 
  Search, 
  Dumbbell, 
  UserCheck, 
  ExternalLink, 
  Youtube, 
  Filter, 
  Check, 
  Plus, 
  Sparkles,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ExerciseLibraryProps {
  onOpenExerciseDetails: (exercise: Exercise) => void;
  onAddExerciseToToday: (exercise: Exercise) => void;
}

export const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({
  onOpenExerciseDetails,
  onAddExerciseToToday
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState<'all' | EquipmentType>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const categories: MuscleGroup[] = [
    'Dada',
    'Punggung',
    'Kaki',
    'Bahu',
    'Lengan',
    'Core / Perut',
    'Kardio & Full Body'
  ];

  // Filter exercises
  const filteredExercises = EXERCISE_DATABASE.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.targetMuscles.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
      exercise.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEquipment =
      equipmentFilter === 'all' || exercise.equipment === equipmentFilter;

    const matchesCategory =
      categoryFilter === 'all' || exercise.category === categoryFilter;

    const matchesDifficulty =
      difficultyFilter === 'all' || exercise.difficulty === difficultyFilter;

    return matchesSearch && matchesEquipment && matchesCategory && matchesDifficulty;
  });

  const barbellCount = EXERCISE_DATABASE.filter((e) => e.equipment === 'barbell').length;
  const bodyweightCount = EXERCISE_DATABASE.filter((e) => e.equipment === 'bodyweight').length;

  return (
    <div id="exercise-library-section" className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-lime-400" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Pustaka Gerakan & Panduan Latihan
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Koleksi lengkap gerakan latihan berbeban barbel dan kalistenik (tanpa alat), dilengkapi penjelasan dan tombol pencarian internet instan.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5" />
              {barbellCount} Variasi Barbel
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              {bodyweightCount} Variasi Bodyweight
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-5 relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          <input
            id="exercise-search-input"
            type="text"
            placeholder="Cari gerakan apa saja (cth: Bench Press, Squat, Push Up, Lats, Bahu, Sixpack)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-zinc-950/80 border border-zinc-700/80 focus:border-lime-400 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-xs text-zinc-400 hover:text-white px-2 py-1 bg-zinc-800 rounded"
            >
              Hapus
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls: Equipment Toggle + Category Pills */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
        
        {/* Equipment Filter: Barbell vs Bodyweight (As requested) */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
            Peralatan Latihan (Equipment):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              id="filter-equipment-all"
              onClick={() => setEquipmentFilter('all')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                equipmentFilter === 'all'
                  ? 'bg-lime-400 text-zinc-950 border-lime-400 shadow-md shadow-lime-400/10'
                  : 'bg-zinc-950/60 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <span>Semua Peralatan ({EXERCISE_DATABASE.length})</span>
            </button>

            <button
              id="filter-equipment-barbell"
              onClick={() => setEquipmentFilter('barbell')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                equipmentFilter === 'barbell'
                  ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-md shadow-amber-400/10'
                  : 'bg-zinc-950/60 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>Pakai Barbel ({barbellCount})</span>
            </button>

            <button
              id="filter-equipment-bodyweight"
              onClick={() => setEquipmentFilter('bodyweight')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                equipmentFilter === 'bodyweight'
                  ? 'bg-emerald-400 text-zinc-950 border-emerald-400 shadow-md shadow-emerald-400/10'
                  : 'bg-zinc-950/60 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Tanpa Barbel / Bodyweight ({bodyweightCount})</span>
            </button>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="pt-2 border-t border-zinc-800/80">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
            Target Bagian Tubuh:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-zinc-100 text-zinc-950 font-bold'
                  : 'bg-zinc-950/70 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              Semua Bagian
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-zinc-100 text-zinc-950 font-bold'
                    : 'bg-zinc-950/70 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercise Count & Active Filters Indicator */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <span>
          Menemukan <strong className="text-white">{filteredExercises.length}</strong> gerakan latihan
        </span>
        {(equipmentFilter !== 'all' || categoryFilter !== 'all' || searchTerm) && (
          <button
            onClick={() => {
              setEquipmentFilter('all');
              setCategoryFilter('all');
              setSearchTerm('');
            }}
            className="text-lime-400 hover:underline font-semibold cursor-pointer"
          >
            Reset Semua Filter
          </button>
        )}
      </div>

      {/* Grid of Exercise Cards */}
      {filteredExercises.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
          <HelpCircle className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">Gerakan Tidak Ditemukan</h3>
          <p className="text-xs text-zinc-400 mb-4 max-w-sm mx-auto">
            Coba ganti kata kunci pencarian atau sesuaikan filter barbel / bodyweight di atas.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setEquipmentFilter('all');
              setCategoryFilter('all');
            }}
            className="px-4 py-2 bg-lime-500 text-zinc-950 rounded-xl font-bold text-xs"
          >
            Tampilkan Semua Gerakan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise) => {
            const isExpanded = expandedCardId === exercise.id;
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(exercise.searchQuery)}`;
            const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.searchQuery + ' tutorial')}`;

            return (
              <div
                key={exercise.id}
                id={`exercise-card-${exercise.id}`}
                className="bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:bg-zinc-900/90"
              >
                <div>
                  {/* Badge & Category row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      exercise.equipment === 'barbell'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {exercise.equipment === 'barbell' ? (
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

                    <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60 font-medium">
                      {exercise.category}
                    </span>
                  </div>

                  {/* Title & Level */}
                  <h3 className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors">
                    {exercise.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 mb-2.5 text-xs text-zinc-400">
                    <span>Level: <strong className="text-zinc-200">{exercise.difficulty}</strong></span>
                    <span>•</span>
                    <span className="text-lime-400/90 font-medium">{exercise.recommendedSets} ({exercise.recommendedReps})</span>
                  </div>

                  {/* Short Explanation */}
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3 mb-3">
                    {exercise.description}
                  </p>

                  {/* Muscle Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {exercise.targetMuscles.map((muscle, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800">
                        {muscle}
                      </span>
                    ))}
                  </div>

                  {/* Expandable step-by-step preview */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-2 animate-fadeIn">
                      <span className="text-xs font-bold text-zinc-300 block">
                        Langkah Gerakan:
                      </span>
                      <ol className="space-y-1.5 text-xs text-zinc-400 pl-4 list-decimal">
                        {exercise.steps.map((st, i) => (
                          <li key={i} className="leading-snug">{st}</li>
                        ))}
                      </ol>

                      <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 mt-2">
                        <strong>Tips:</strong> {exercise.tips}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setExpandedCardId(isExpanded ? null : exercise.id)}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-medium mt-1 mb-4 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Sembunyikan Langkah' : 'Lihat Langkah-Langkah'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* BOTTOM ACTION BUTTONS */}
                <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                  
                  {/* THE PROMINENT REQUIRED HELPER BUTTON */}
                  <button
                    id={`library-search-internet-${exercise.id}`}
                    onClick={() => onOpenExerciseDetails(exercise)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-lime-500/15 hover:bg-lime-500/25 text-lime-400 hover:text-lime-300 font-bold text-xs border border-lime-500/40 hover:border-lime-500/70 transition-all shadow-sm cursor-pointer group/btn"
                  >
                    <Search className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                    <span>Gak Tau Gerakannya? Cari Di Internet</span>
                  </button>

                  {/* Direct Link Shortcuts */}
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <a
                      href={googleSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700"
                    >
                      <Search className="w-3 h-3 text-sky-400" />
                      <span>Google</span>
                      <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
                    </a>

                    <a
                      href={youtubeSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700"
                    >
                      <Youtube className="w-3 h-3 text-red-400" />
                      <span>YouTube</span>
                      <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
                    </a>
                  </div>

                  {/* Add to today's schedule button */}
                  <button
                    onClick={() => onAddExerciseToToday(exercise)}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-lime-400" />
                    <span>Tambahkan ke Jadwal</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
