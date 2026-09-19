import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Bell } from 'lucide-react';

interface RestTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RestTimerModal: React.FC<RestTimerModalProps> = ({ isOpen, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [initialSeconds, setInitialSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      // Play a web audio API beep when timer finishes
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } catch (e) {
        console.log('Audio not supported or permitted', e);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  if (!isOpen) return null;

  const setTimerPreset = (secs: number) => {
    setInitialSeconds(secs);
    setSecondsLeft(secs);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  };

  const progressPercentage = initialSeconds > 0 
    ? ((initialSeconds - secondsLeft) / initialSeconds) * 100 
    : 0;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div 
      id="rest-timer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center text-zinc-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-800 rounded-full transition-colors cursor-pointer"
          aria-label="Tutup Timer"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-lg font-bold text-white mb-1 flex items-center justify-center gap-2">
          <Bell className="w-5 h-5 text-lime-400" />
          Timer Istirahat Antar Set
        </h3>
        <p className="text-xs text-zinc-400 mb-6">
          Istirahat optimal untuk pemulihan otot sebelum set berikutnya
        </p>

        {/* Circular Countdown Display */}
        <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="76"
              className="stroke-zinc-800"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="88"
              cy="88"
              r="76"
              className="stroke-lime-400 transition-all duration-300"
              strokeWidth="8"
              strokeDasharray={477}
              strokeDashoffset={477 - (477 * progressPercentage) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-extrabold tracking-tight text-white font-mono">
              {formatTime(secondsLeft)}
            </span>
            <span className="text-xs text-zinc-400 uppercase tracking-wider mt-1">
              {secondsLeft === 0 ? 'Selesai! Mulai Set' : isRunning ? 'Sedang Berjalan' : 'Dijeda'}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
              isRunning 
                ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950' 
                : 'bg-lime-500 hover:bg-lime-400 text-zinc-950'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Jeda
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Mulai
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-sm border border-zinc-700 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-xs font-semibold text-zinc-400 block mb-2">
            Preset Waktu Istirahat:
          </span>
          <div className="grid grid-cols-4 gap-2">
            {[30, 60, 90, 120].map((secs) => (
              <button
                key={secs}
                onClick={() => setTimerPreset(secs)}
                className={`py-2 px-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  initialSeconds === secs 
                    ? 'bg-zinc-800 text-lime-400 border-lime-400/50' 
                    : 'bg-zinc-950/60 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                }`}
              >
                {secs < 60 ? `${secs}d` : `${secs / 60}m`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
