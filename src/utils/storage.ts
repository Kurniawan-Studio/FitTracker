import { DayWorkout, DreamBodyPhoto, UserStats, ProgressLog } from '../types';
import { DEFAULT_WEEKLY_SCHEDULE } from '../data/defaultSchedule';

const KEYS = {
  SCHEDULE: 'fittrack_schedule_v1',
  USER_STATS: 'fittrack_user_stats_v1',
  DREAM_PHOTOS: 'fittrack_dream_photos_v1',
  PROGRESS_LOGS: 'fittrack_progress_logs_v1',
  ACTIVE_TAB: 'fittrack_active_tab_v1',
  EQUIPMENT_FILTER: 'fittrack_equipment_filter_v1'
};

export const DEFAULT_USER_STATS: UserStats = {
  name: 'Fitness Champion',
  currentWeight: 70,
  targetWeight: 65,
  height: 172,
  targetGoal: 'Membentuk otot atletis, mengurangi kadar lemak tubuh, dan konsisten olahraga 5 hari seminggu.',
  motivationalQuote: 'Disiplin hari ini adalah bentuk tubuh impian di masa depan.',
  startDate: new Date().toISOString().split('T')[0]
};

// Safe localStorage getters and setters
export function getStoredSchedule(): DayWorkout[] {
  try {
    const raw = localStorage.getItem(KEYS.SCHEDULE);
    if (!raw) return DEFAULT_WEEKLY_SCHEDULE;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_WEEKLY_SCHEDULE;
  } catch (e) {
    console.error('Error reading schedule from localStorage:', e);
    return DEFAULT_WEEKLY_SCHEDULE;
  }
}

export function saveStoredSchedule(schedule: DayWorkout[]): void {
  try {
    localStorage.setItem(KEYS.SCHEDULE, JSON.stringify(schedule));
  } catch (e) {
    console.error('Error saving schedule to localStorage:', e);
  }
}

export function getStoredUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(KEYS.USER_STATS);
    if (!raw) return DEFAULT_USER_STATS;
    return { ...DEFAULT_USER_STATS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error reading user stats:', e);
    return DEFAULT_USER_STATS;
  }
}

export function saveStoredUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(KEYS.USER_STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Error saving user stats:', e);
  }
}

export function getStoredDreamPhotos(): DreamBodyPhoto[] {
  try {
    const raw = localStorage.getItem(KEYS.DREAM_PHOTOS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading dream photos:', e);
    return [];
  }
}

export function saveStoredDreamPhotos(photos: DreamBodyPhoto[]): boolean {
  try {
    localStorage.setItem(KEYS.DREAM_PHOTOS, JSON.stringify(photos));
    return true;
  } catch (e) {
    console.error('Quota exceeded or error saving photos:', e);
    return false;
  }
}

export function getStoredProgressLogs(): ProgressLog[] {
  try {
    const raw = localStorage.getItem(KEYS.PROGRESS_LOGS);
    if (!raw) {
      return [
        {
          id: 'log-1',
          date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
          weight: 71.5,
          notes: 'Memulai program latihan mingguan, badan terasa kaku tapi bersemangat.'
        },
        {
          id: 'log-2',
          date: new Date().toISOString().split('T')[0],
          weight: 70.0,
          notes: 'Mulai rutin push up dan squat, stamina terasa jauh lebih bertenaga.'
        }
      ];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading progress logs:', e);
    return [];
  }
}

export function saveStoredProgressLogs(logs: ProgressLog[]): void {
  try {
    localStorage.setItem(KEYS.PROGRESS_LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error('Error saving progress logs:', e);
  }
}

/**
 * Compresses an image file before saving to base64 so localStorage won't exceed quota.
 * Resizes max dimension to 800px and saves as JPEG with 0.72 quality (~60-100kb).
 */
export async function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // compress to high efficiency jpeg
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
        resolve(compressedBase64);
      };
      img.onerror = () => reject(new Error('Gagal memproses gambar'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar'));
    reader.readAsDataURL(file);
  });
}

/**
 * Calculates Body Mass Index (BMI) and category description
 */
export function calculateBMI(weightKg: number, heightCm: number) {
  if (!weightKg || !heightCm || heightCm <= 0) {
    return { bmi: 0, category: 'Data Belum Lengkap', color: 'text-zinc-400' };
  }
  const heightM = heightCm / 100;
  const bmiVal = weightKg / (heightM * heightM);
  const bmi = Math.round(bmiVal * 10) / 10;

  if (bmi < 18.5) {
    return { bmi, category: 'Berat Kurang (Underweight)', color: 'text-amber-400' };
  } else if (bmi < 24.9) {
    return { bmi, category: 'Ideal & Normal', color: 'text-emerald-400' };
  } else if (bmi < 29.9) {
    return { bmi, category: 'Kelebihan Berat (Overweight)', color: 'text-orange-400' };
  } else {
    return { bmi, category: 'Obesitas (Perlu Defisit Kalori)', color: 'text-rose-400' };
  }
}
