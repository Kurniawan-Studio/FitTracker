import React from 'react';
import { Dumbbell, Calendar, BookOpen, Sparkles, Timer, Flame } from 'lucide-react';

interface HeaderProps {
  activeTab: 'schedule' | 'library' | 'dreambody';
  setActiveTab: (tab: 'schedule' | 'library' | 'dreambody') => void;
  completedDaysCount: number;
  totalDays: number;
  onOpenTimer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  completedDaysCount,
  totalDays,
  onOpenTimer,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-lime-500/20">
              <Dumbbell className="w-5 h-5 text-zinc-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                  Fit<span className="text-lime-400">Track</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-lime-400 rounded border border-zinc-700">
                  Local Sync
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Jadwal Mingguan • Pustaka Gerakan • Dream Body
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800">
            <button
              id="tab-schedule-btn"
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'schedule'
                  ? 'bg-lime-400 text-zinc-950 shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Jadwal Latihan</span>
              {completedDaysCount > 0 && (
                <span className={`text-xs px-1.5 py-0.2 rounded-full ${
                  activeTab === 'schedule' ? 'bg-zinc-900 text-lime-300' : 'bg-zinc-800 text-lime-400'
                }`}>
                  {completedDaysCount}/{totalDays}
                </span>
              )}
            </button>

            <button
              id="tab-library-btn"
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-lime-400 text-zinc-950 shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Pustaka Gerakan</span>
            </button>

            <button
              id="tab-dreambody-btn"
              onClick={() => setActiveTab('dreambody')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'dreambody'
                  ? 'bg-lime-400 text-zinc-950 shadow-md font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Dream Body & Progres</span>
            </button>
          </nav>

          {/* Right Action: Rest Timer & Quick Stat */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              id="open-timer-btn"
              onClick={onOpenTimer}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer"
              title="Buka Timer Istirahat Antar Set"
            >
              <Timer className="w-4 h-4 text-lime-400" />
              <span>Timer</span>
            </button>

            <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              <span>{completedDaysCount}/{totalDays}</span>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-zinc-800/60 text-xs">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'schedule' ? 'bg-zinc-800 text-lime-400' : 'text-zinc-400'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Jadwal</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'library' ? 'bg-zinc-800 text-lime-400' : 'text-zinc-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Gerakan</span>
          </button>

          <button
            onClick={() => setActiveTab('dreambody')}
            className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'dreambody' ? 'bg-zinc-800 text-lime-400' : 'text-zinc-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dream Body</span>
          </button>
        </div>

      </div>
    </header>
  );
};

