export type EquipmentType = 'barbell' | 'bodyweight';

export type MuscleGroup = 
  | 'Dada' 
  | 'Punggung' 
  | 'Kaki' 
  | 'Bahu' 
  | 'Lengan' 
  | 'Core / Perut' 
  | 'Kardio & Full Body';

export interface Exercise {
  id: string;
  name: string;
  category: MuscleGroup;
  equipment: EquipmentType;
  difficulty: 'Pemula' | 'Menengah' | 'Mahir';
  targetMuscles: string[];
  description: string;
  steps: string[];
  tips: string;
  recommendedSets: string;
  recommendedReps: string;
  searchQuery: string;
}

export interface DayWorkout {
  dayName: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  title: string;
  focus: string;
  isRestDay: boolean;
  completed: boolean;
  exercises: {
    exerciseId: string;
    completed: boolean;
    customNotes?: string;
  }[];
}

export interface DreamBodyPhoto {
  id: string;
  title: string;
  type: 'dream_body' | 'progress_current' | 'before_after';
  imageUrl: string; // compressed base64
  date: string;
  notes?: string;
}

export interface UserStats {
  name: string;
  currentWeight: number; // in kg
  targetWeight: number; // in kg
  height: number; // in cm
  targetGoal: string;
  motivationalQuote: string;
  startDate: string;
}

export interface ProgressLog {
  id: string;
  date: string;
  weight: number;
  notes: string;
}
