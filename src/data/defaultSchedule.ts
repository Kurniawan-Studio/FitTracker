import { DayWorkout } from '../types';

export const DEFAULT_WEEKLY_SCHEDULE: DayWorkout[] = [
  {
    dayName: 'Senin',
    title: 'Dada & Triceps (Push Day)',
    focus: 'Otot Dada, Bahu Depan, dan Lengan Belakang',
    isRestDay: false,
    completed: false,
    exercises: [
      { exerciseId: 'barbell-bench-press', completed: false, customNotes: 'Fokus pada kontraksi dada' },
      { exerciseId: 'incline-barbell-press', completed: false, customNotes: 'Sudut bench 30 derajat' },
      { exerciseId: 'standard-push-up', completed: false, customNotes: 'Burnout set' },
      { exerciseId: 'close-grip-bench-press', completed: false, customNotes: 'Siku rapat' }
    ]
  },
  {
    dayName: 'Selasa',
    title: 'Punggung & Biceps (Pull Day)',
    focus: 'Otot Punggung Sayap, Rhomboids, dan Lengan Depan',
    isRestDay: false,
    completed: false,
    exercises: [
      { exerciseId: 'barbell-deadlift', completed: false, customNotes: 'Jaga tulang punggung lurus' },
      { exerciseId: 'barbell-bent-over-row', completed: false, customNotes: 'Tarik ke arah pusar' },
      { exerciseId: 'pull-up', completed: false, customNotes: 'Rentang gerak penuh' },
      { exerciseId: 'barbell-bicep-curl', completed: false, customNotes: 'Tempo terkontrol' }
    ]
  },
  {
    dayName: 'Rabu',
    title: 'Kaki & Core (Leg Day)',
    focus: 'Paha Depan, Hamstring, Betis & Otot Perut',
    isRestDay: false,
    completed: false,
    exercises: [
      { exerciseId: 'barbell-back-squat', completed: false, customNotes: 'Kedalaman 90 derajat' },
      { exerciseId: 'romanian-deadlift', completed: false, customNotes: 'Dorong pinggul ke belakang' },
      { exerciseId: 'bulgarian-split-squat', completed: false, customNotes: '10 rep tiap kaki' },
      { exerciseId: 'plank-hold', completed: false, customNotes: 'Tahan 60 detik' }
    ]
  },
  {
    dayName: 'Kamis',
    title: 'Hari Istirahat Aktif / Recovery',
    focus: 'Pemulihan Otot, Peregangan & Jalan Santai',
    isRestDay: true,
    completed: false,
    exercises: []
  },
  {
    dayName: 'Jumat',
    title: 'Bahu & Dada Atas (Upper Focus)',
    focus: 'Otot Bahu Bulat, Postur Atas & Ketahanan',
    isRestDay: false,
    completed: false,
    exercises: [
      { exerciseId: 'overhead-press', completed: false, customNotes: 'Kunci glutes & perut' },
      { exerciseId: 'pike-push-up', completed: false, customNotes: 'Variasi bodyweight bahu' },
      { exerciseId: 'barbell-upright-row', completed: false, customNotes: 'Siku memimpin angkatan' },
      { exerciseId: 'diamond-push-up', completed: false, customNotes: 'Fokus dada tengah & triceps' }
    ]
  },
  {
    dayName: 'Sabtu',
    title: 'Full Body Conditioning & Core',
    focus: 'Pembakaran Lemak, Kardio Intensitas Tinggi & Sixpack',
    isRestDay: false,
    completed: false,
    exercises: [
      { exerciseId: 'burpees-full-body', completed: false, customNotes: 'Kardio pembakar lemak' },
      { exerciseId: 'mountain-climbers', completed: false, customNotes: 'Kecepatan stabil' },
      { exerciseId: 'bicycle-crunches', completed: false, customNotes: 'Otot perut samping' },
      { exerciseId: 'leg-raises', completed: false, customNotes: 'Perut bagian bawah' }
    ]
  },
  {
    dayName: 'Minggu',
    title: 'Total Rest & Evaluasi Mingguan',
    focus: 'Tidur Cukup, Nutrisi Protein & Cek Progres Dream Body',
    isRestDay: true,
    completed: false,
    exercises: []
  }
];

export const BODYWEIGHT_WEEKLY_PRESET: DayWorkout[] = [
  {
    dayName: 'Senin',
    title: 'Calisthenics Push & Chest',
    focus: 'Push Up variasi, Dips & Triceps',
    isRestDay: false,
    completed: false,
    exercises: [
      { exerciseId: 'standard-push-up', completed: false },
      { exerciseId: 'diamond-push-up', completed: false },
      { exerciseId: 'decline-push-up', completed: false },
      { exerciseId: 'bench-tricep-dips', completed: false }
    ]
  },
  {
    dayName: 'Selasa',
    title: 'Calisthenics Pull & Back',
    focus: 'Pull Up, Chin Up & Inverted Row',
    isRestDay: false,
    completed: false,
    exercises: [
      { exerciseId: 'pull-up', completed: false },
      { exerciseId: 'chin-up', completed: false },
      { exerciseId: 'inverted-row', completed: false },
      { exerciseId: 'superman-hold', completed: false }
    ]
  },
  {
    dayName: 'Rabu',
    title: 'Legs & Core Bodyweight',
    focus: 'Squats, Lunges & Perut',
    isRestDay: false,
    completed: false,
    exercises: [
      { exerciseId: 'bodyweight-squat', completed: false },
      { exerciseId: 'bulgarian-split-squat', completed: false },
      { exerciseId: 'walking-lunges', completed: false },
      { exerciseId: 'plank-hold', completed: false }
    ]
  },
  {
    dayName: 'Kamis',
    title: 'Rest Day (Istirahat)',
    focus: 'Regenerasi otot & hidrasi',
    isRestDay: true,
    completed: false,
    exercises: []
  },
  {
    dayName: 'Jumat',
    title: 'Shoulders & Arms Calisthenics',
    focus: 'Pike push up & Dips',
    isRestDay: false,
    completed: false,
    exercises: [
      { exerciseId: 'pike-push-up', completed: false },
      { exerciseId: 'elevated-pike-pushup', completed: false },
      { exerciseId: 'bench-tricep-dips', completed: false },
      { exerciseId: 'diamond-push-up', completed: false }
    ]
  },
  {
    dayName: 'Sabtu',
    title: 'HIIT & Sixpack Burner',
    focus: 'Burpees, Mountain Climbers, Abs',
    isRestDay: false,
    completed: false,
    exercises: [
      { exerciseId: 'burpees-full-body', completed: false },
      { exerciseId: 'mountain-climbers', completed: false },
      { exerciseId: 'bicycle-crunches', completed: false },
      { exerciseId: 'leg-raises', completed: false }
    ]
  },
  {
    dayName: 'Minggu',
    title: 'Rest & Recovery',
    focus: 'Pemulihan penuh',
    isRestDay: true,
    completed: false,
    exercises: []
  }
];
