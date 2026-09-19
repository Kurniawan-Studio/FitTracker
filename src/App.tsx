import React, { useState, useEffect } from 'react';
import { DayWorkout, Exercise, DreamBodyPhoto, UserStats, ProgressLog } from './types';
import { 
  getStoredSchedule, 
  saveStoredSchedule, 
  getStoredUserStats, 
  saveStoredUserStats, 
  getStoredDreamPhotos, 
  saveStoredDreamPhotos, 
  getStoredProgressLogs, 
  saveStoredProgressLogs 
} from './utils/storage';
import { Header } from './components/Header';
import { ScheduleView } from './components/ScheduleView';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { DreamBodyTracker } from './components/DreamBodyTracker';
import { ExerciseSearchModal } from './components/ExerciseSearchModal';
import { RestTimerModal } from './components/RestTimerModal';
import { CheckCircle2, Dumbbell, Sparkles, Calendar, BookOpen, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'schedule' | 'library' | 'dreambody'>('schedule');

  // Core application state loaded from localStorage
  const [schedule, setSchedule] = useState<DayWorkout[]>(getStoredSchedule);
  const [userStats, setUserStats] = useState<UserStats>(getStoredUserStats);
  const [photos, setPhotos] = useState<DreamBodyPhoto[]>(getStoredDreamPhotos);
  const [progressLogs, setProgressLogs] = useState<ProgressLog[]>(getStoredProgressLogs);

  // Modals state
  const [selectedExerciseForModal, setSelectedExerciseForModal] = useState<Exercise | null>(null);
  const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize state changes to localStorage
  useEffect(() => {
    saveStoredSchedule(schedule);
  }, [schedule]);

  useEffect(() => {
    saveStoredUserStats(userStats);
  }, [userStats]);

  useEffect(() => {
    saveStoredDreamPhotos(photos);
  }, [photos]);

  useEffect(() => {
    saveStoredProgressLogs(progressLogs);
  }, [progressLogs]);

  // Quick helper to show feedback toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add exercise to today's schedule
  const handleAddExerciseToToday = (exercise: Exercise) => {
    const todayJs = new Date().getDay();
    const dayMapping: Record<number, DayWorkout['dayName']> = {
      1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu', 0: 'Minggu'
    };
    const targetDayName = dayMapping[todayJs] || 'Senin';

    setSchedule((prev) => {
      return prev.map((day) => {
        if (day.dayName === targetDayName) {
          const alreadyExists = day.exercises.some((e) => e.exerciseId === exercise.id);
          if (alreadyExists) {
            showToast(`Gerakan "${exercise.name}" sudah ada di jadwal hari ${targetDayName}!`);
            return day;
          }
          showToast(`Berhasil menambahkan "${exercise.name}" ke hari ${targetDayName}!`);
          return {
            ...day,
            isRestDay: false,
            exercises: [...day.exercises, { exerciseId: exercise.id, completed: false }]
          };
        }
        return day;
      });
    });
  };

  const completedDaysCount = schedule.filter((d) => d.completed).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-lime-400 selection:text-zinc-950">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedDaysCount={completedDaysCount}
        totalDays={schedule.length}
        onOpenTimer={() => setIsRestTimerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-zinc-900 border border-lime-400/50 text-white rounded-xl shadow-2xl animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-lime-400" />
            <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Weekly Workout Planner / Schedule */}
        {activeTab === 'schedule' && (
          <ScheduleView
            schedule={schedule}
            setSchedule={setSchedule}
            onOpenExerciseDetails={(exercise) => setSelectedExerciseForModal(exercise)}
            onNavigateToLibrary={() => setActiveTab('library')}
          />
        )}

        {/* Tab 2: Exercise Library with Barbell / Bodyweight Toggle */}
        {activeTab === 'library' && (
          <ExerciseLibrary
            onOpenExerciseDetails={(exercise) => setSelectedExerciseForModal(exercise)}
            onAddExerciseToToday={handleAddExerciseToToday}
          />
        )}

        {/* Tab 3: Dream Body & Progress Tracker */}
        {activeTab === 'dreambody' && (
          <DreamBodyTracker
            userStats={userStats}
            setUserStats={setUserStats}
            photos={photos}
            setPhotos={setPhotos}
            progressLogs={progressLogs}
            setProgressLogs={setProgressLogs}
          />
        )}

      </main>

      {/* Global Interactive Modals */}
      <ExerciseSearchModal
        exercise={selectedExerciseForModal}
        onClose={() => setSelectedExerciseForModal(null)}
        onAddToSchedule={(exercise) => handleAddExerciseToToday(exercise)}
      />

      <RestTimerModal
        isOpen={isRestTimerOpen}
        onClose={() => setIsRestTimerOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-lime-400" />
            <span className="font-semibold text-zinc-300">FitTrack Planner & Library</span>
            <span>•</span>
            <span>Data tersimpan otomatis di LocalStorage perangkat</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-400">
            <button 
              onClick={() => setActiveTab('schedule')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Jadwal Mingguan
            </button>
            <button 
              onClick={() => setActiveTab('library')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Katalog Gerakan
            </button>
            <button 
              onClick={() => setActiveTab('dreambody')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Dream Body
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
