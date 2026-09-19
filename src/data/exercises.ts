import { Exercise } from '../types';

export const EXERCISE_DATABASE: Exercise[] = [
  // --- DADA (CHEST) - BARBEL ---
  {
    id: 'barbell-bench-press',
    name: 'Barbell Flat Bench Press',
    category: 'Dada',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Dada Tengah', 'Triceps', 'Bahu Depan'],
    description: 'Gerakan dasar terpenting untuk membangun massa otot dada dan kekuatan dorong tubuh bagian atas menggunakan barbel di bangku datar.',
    steps: [
      'Berbaring di flat bench dengan mata sejajar di bawah palang barbel.',
      'Genggam barbel sedikit lebih lebar dari bahu, kunci pergelangan tangan.',
      'Tarik napas, turunkan barbel secara terkontrol hingga menyentuh dada bagian tengah/bawah.',
      'Dorong barbel kembali ke atas dengan mengontraksikan otot dada sambil menghembuskan napas.'
    ],
    tips: 'Jaga telapak kaki tetap menapak kuat di lantai dan hindari mengangkat pinggul dari bangku.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 12 Repetisi',
    searchQuery: 'cara gerakan barbell bench press yang benar'
  },
  {
    id: 'incline-barbell-press',
    name: 'Incline Barbell Bench Press',
    category: 'Dada',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Dada Atas (Clavicular)', 'Bahu Depan', 'Triceps'],
    description: 'Latihan menggunakan bangku condong (sudut 30-45 derajat) untuk fokus menebalkan otot dada bagian atas.',
    steps: [
      'Atur sudut bench sekitar 30-45 derajat.',
      'Genggam palang barbel dengan pronasi selebar bahu.',
      'Turunkan barbel perlahan ke dada atas (tepat di bawah tulang selangka).',
      'Dorong ke atas dengan kuat tanpa mengunci sendi siku secara berlebihan.'
    ],
    tips: 'Sudut bench jangan terlalu tegak (>45 derajat) agar beban tidak berpindah dominan ke bahu.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 10 Repetisi',
    searchQuery: 'incline barbell bench press form tutorial'
  },
  {
    id: 'decline-barbell-press',
    name: 'Decline Barbell Bench Press',
    category: 'Dada',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Dada Bawah (Sternal)', 'Triceps'],
    description: 'Variasi bench press dengan posisi kepala lebih rendah dari kaki untuk membentuk garis tegas dada bawah.',
    steps: [
      'Kaitkan kaki dengan aman pada penyangga decline bench.',
      'Genggam barbel selebar bahu dan angkat dari rak.',
      'Turunkan barbel ke garis puting atau batas dada bawah.',
      'Tekan kembali ke atas dengan kontraksi dada bawah yang kuat.'
    ],
    tips: 'Selalu gunakan spotter atau safety bar saat melakukan decline bench press.',
    recommendedSets: '3 Set',
    recommendedReps: '10 - 12 Repetisi',
    searchQuery: 'decline barbell bench press tutorial bahasa indonesia'
  },

  // --- DADA (CHEST) - BODYWEIGHT ---
  {
    id: 'standard-push-up',
    name: 'Standard Push Up',
    category: 'Dada',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Dada', 'Triceps', 'Otot Inti (Core)', 'Bahu'],
    description: 'Gerakan kalistenik dasar tanpa alat terbaik untuk melatih kekuatan dada, triceps, dan stabilitas inti.',
    steps: [
      'Posisikan tubuh tengkurap dengan tangan selebar bahu.',
      'Jaga tubuh tetap lurus sempurna dari kepala hingga tumit.',
      'Turunkan dada hingga hampir menyentuh lantai (sudut siku 45-60 derajat).',
      'Dorong tubuh kembali ke posisi awal dengan kuat.'
    ],
    tips: 'Hindari pantat melorot ke bawah atau mencuat ke atas. Kencangkan perut (bracing).',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '12 - 20 Repetisi',
    searchQuery: 'cara push up yang benar untuk pemula'
  },
  {
    id: 'diamond-push-up',
    name: 'Diamond Push Up',
    category: 'Dada',
    equipment: 'bodyweight',
    difficulty: 'Menengah',
    targetMuscles: ['Dada Tengah/Dalam', 'Triceps', 'Bahu Depan'],
    description: 'Variasi push up dengan mendekatkan kedua tangan membentuk segitiga (diamond) untuk penekanan ekstra pada dada tengah dan triceps.',
    steps: [
      'Posisikan kedua telapak tangan di lantai saling bersentuhan membentuk pola berlian.',
      'Pertahankan postur tubuh dalam garis lurus.',
      'Turunkan dada mengarah ke tengah tangan.',
      'Dorong kembali ke atas sambil memeras otot dada dan triceps.'
    ],
    tips: 'Jika terasa terlalu berat di siku, buka sedikit jarak kedua tangan.',
    recommendedSets: '3 Set',
    recommendedReps: '8 - 15 Repetisi',
    searchQuery: 'diamond push up proper form tutorial'
  },
  {
    id: 'decline-push-up',
    name: 'Decline Push Up (Kaki Terangkat)',
    category: 'Dada',
    equipment: 'bodyweight',
    difficulty: 'Menengah',
    targetMuscles: ['Dada Atas', 'Bahu Depan', 'Core'],
    description: 'Push up dengan kedua kaki diletakkan di atas kursi/bangku untuk menargetkan dada bagian atas tanpa beban eksternal.',
    steps: [
      'Letakkan ujung kaki di atas bangku atau kursi yang kokoh.',
      'Letakkan telapak tangan di lantai selebar bahu.',
      'Turunkan tubuh secara terkontrol ke lantai.',
      'Dorong ke atas hingga lengan lurus kembali.'
    ],
    tips: 'Semakin tinggi posisi kaki, semakin besar beban yang dipindahkan ke dada atas dan bahu.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '10 - 15 Repetisi',
    searchQuery: 'decline push up chest target tutorial'
  },
  {
    id: 'chest-dips',
    name: 'Parallel Bar Dips',
    category: 'Dada',
    equipment: 'bodyweight',
    difficulty: 'Mahir',
    targetMuscles: ['Dada Bawah', 'Triceps', 'Bahu Depan'],
    description: 'Latihan menggunakan palang sejajar dengan condong ke depan untuk memaksimalkan regangan dan kontraksi dada bawah.',
    steps: [
      'Naik ke atas palang sejajar dengan lengan lurus terkunci.',
      'Condongkan tubuh sedikit ke depan sekitar 20-30 derajat.',
      'Tekuk siku hingga membentuk sudut minimal 90 derajat.',
      'Dorong kembali ke atas dengan fokus kontraksi dada bawah.'
    ],
    tips: 'Condongkan tubuh ke depan agar beban fokus ke dada, bukan murni ke triceps.',
    recommendedSets: '3 Set',
    recommendedReps: '8 - 12 Repetisi',
    searchQuery: 'chest dips tutorial form and technique'
  },

  // --- PUNGGUNG (BACK) - BARBEL ---
  {
    id: 'barbell-deadlift',
    name: 'Conventional Barbell Deadlift',
    category: 'Punggung',
    equipment: 'barbell',
    difficulty: 'Mahir',
    targetMuscles: ['Punggung Bawah & Atas', 'Hamstring', 'Glutes', 'Traps', 'Forearms'],
    description: 'Raja dari segala gerakan angkat beban. Melatih seluruh rantai posterior tubuh dari telapak kaki hingga leher.',
    steps: [
      'Berdiri dengan palang barbel tepat di atas pertengahan kaki (midfoot).',
      'Bungkukkan pinggul (hip hinge) dan genggam barbel di luar garis lutut.',
      'Tegakkan dada, luruskan tulang punggung, dan tarik napas dalam.',
      'Dorong lantai dengan telapak kaki sambil mengangkat barbel hingga posisi berdiri tegak (lockout).'
    ],
    tips: 'Jangan pernah membungkukkan punggung bawah (hindari lumbar rounding) demi keamanan tulang belakang.',
    recommendedSets: '3 - 5 Set',
    recommendedReps: '5 - 8 Repetisi',
    searchQuery: 'cara deadlift yang benar dan aman untuk pemula'
  },
  {
    id: 'barbell-bent-over-row',
    name: 'Barbell Bent-Over Row',
    category: 'Punggung',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Latissimus Dorsi (Lats)', 'Rhomboids', 'Traps Tengah', 'Biceps'],
    description: 'Latihan utama untuk menambah ketebalan otot punggung dan kekuatan postur bahu.',
    steps: [
      'Berdiri selebar bahu, tekuk sedikit lutut dan bungkukkan badan 45 derajat.',
      'Genggam barbel dengan telapak tangan menghadap ke bawah atau ke atas.',
      'Tarik barbel ke arah pusar dengan mengarahkan siku ke belakang tubuh.',
      'Tahan kontraksi 1 detik di atas lalu turunkan perlahan.'
    ],
    tips: 'Jaga otot perut tetap kencang dan jangan mengayunkan badan untuk mengangkat beban.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 12 Repetisi',
    searchQuery: 'barbell bent over row technique tutorial'
  },
  {
    id: 'pendlay-row',
    name: 'Pendlay Row (Dead Stop Row)',
    category: 'Punggung',
    equipment: 'barbell',
    difficulty: 'Mahir',
    targetMuscles: ['Upper Back', 'Lats', 'Explosive Posterior Chain'],
    description: 'Variasi row di mana setiap repetisi dimulai dari lantai dengan posisi badan sejajar lantai untuk kekuatan eksplosif.',
    steps: [
      'Mulai dengan barbel di lantai, punggung sejajar lantai.',
      'Tarik barbel dengan eksplosif menyentuh dada bawah.',
      'Kembalikan barbel ke lantai hingga berhenti sempurna sebelum repetisi berikutnya.'
    ],
    tips: 'Gerakan harus bertenaga tanpa menaikkan sudut pinggang secara drastis.',
    recommendedSets: '4 Set',
    recommendedReps: '6 - 8 Repetisi',
    searchQuery: 'pendlay row vs bent over row form'
  },

  // --- PUNGGUNG (BACK) - BODYWEIGHT ---
  {
    id: 'pull-up',
    name: 'Wide Grip Pull Up',
    category: 'Punggung',
    equipment: 'bodyweight',
    difficulty: 'Menengah',
    targetMuscles: ['Lats (Sayap)', 'Punggung Atas', 'Biceps', 'Grip'],
    description: 'Gerakan terbaik untuk membentuk punggung V-taper (sayap lebar) hanya dengan palang tunggal.',
    steps: [
      'Gantung pada bar dengan telapak tangan menghadap ke depan (pronasi), lebih lebar dari bahu.',
      'Tarik tubuh ke atas dengan memimpin menggunakan dada, bukan dagu.',
      'Tarik hingga dagu melewati palang dan rasakan kontraksi lats.',
      'Turunkan tubuh kembali secara perlahan hingga lengan hampir lurus.'
    ],
    tips: 'Aktifkan belikat (scapular depression) sebelum menarik tubuh ke atas.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '6 - 12 Repetisi',
    searchQuery: 'cara bisa pull up untuk pemula calisthenics'
  },
  {
    id: 'chin-up',
    name: 'Underhand Chin Up',
    category: 'Punggung',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Lats Bawah', 'Biceps', 'Brachialis'],
    description: 'Pull up dengan telapak tangan menghadap ke diri sendiri (supinasi) yang memberi aktivasi besar pada otot biceps dan lats bawah.',
    steps: [
      'Genggam palang selebar bahu dengan telapak tangan menghadap ke wajah.',
      'Tarik tubuh ke atas hingga dagu melampaui palang.',
      'Kunci kontraksi di puncak selama 1 detik, lalu turun perlahan.'
    ],
    tips: 'Bagus untuk yang belum kuat wide pull up karena bantuan tenaga dari biceps.',
    recommendedSets: '3 Set',
    recommendedReps: '6 - 10 Repetisi',
    searchQuery: 'chin up tutorial dan perbedaannya dengan pull up'
  },
  {
    id: 'inverted-row',
    name: 'Inverted Row (Australian Pull Up)',
    category: 'Punggung',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Rhomboids', 'Rear Delts', 'Lats'],
    description: 'Latihan menarik horizontal menggunakan palang rendah atau meja kokoh, sangat ramah pemula.',
    steps: [
      'Posisikan diri di bawah palang setinggi pinggang, pegang palang selebar bahu.',
      'Luruskan kaki dengan tumit di lantai, tubuh lurus.',
      'Tarik dada menyentuh palang sambil merapatkan tulang belikat.',
      'Turunkan kembali dengan lambat dan terkontrol.'
    ],
    tips: 'Bisa ditekuk lututnya jika ingin mengurangi beban bagi pemula.',
    recommendedSets: '3 Set',
    recommendedReps: '10 - 15 Repetisi',
    searchQuery: 'australian pull up inverted row tutorial'
  },
  {
    id: 'superman-hold',
    name: 'Superman Back Extension Hold',
    category: 'Punggung',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Erector Spinae (Punggung Bawah)', 'Glutes', 'Bahu Belakang'],
    description: 'Latihan di lantai tanpa alat untuk memperkuat punggung bawah dan memperbaiki postur bungkuk.',
    steps: [
      'Tengkurap di lantai dengan kedua tangan lurus ke depan.',
      'Angkat dada, lengan, dan kedua paha secara bersamaan dari lantai.',
      'Tahan posisi melengkung selama 2-3 detik di setiap repetisi.',
      'Turunkan kembali perlahan.'
    ],
    tips: 'Tarik napas teratur dan jangan memaksakan leher mendongak berlebihan.',
    recommendedSets: '3 Set',
    recommendedReps: '12 - 15 Repetisi / Tahan 30 Detik',
    searchQuery: 'superman exercise lower back form'
  },

  // --- KAKI (LEGS) - BARBEL ---
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    category: 'Kaki',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Quadriceps (Paha Depan)', 'Glutes (Pantat)', 'Hamstring', 'Core'],
    description: 'Gerakan fundamental nomor satu untuk membangun kekuatan dan massa otot kaki secara menyeluruh.',
    steps: [
      'Letakkan barbel di atas otot trapezius (upper back).',
      'Buka kaki selebar bahu dengan jari kaki sedikit mengarah keluar.',
      'Bungkukkan pinggul ke belakang lalu tekuk lutut seperti hendak duduk di kursi.',
      'Turun hingga paha minimal sejajar dengan lantai (depth 90 derajat).',
      'Dorong melalui tumit dan tengah kaki untuk kembali berdiri tegak.'
    ],
    tips: 'Jaga lutut selalu sejajar dengan arah jari kaki (hindari lutut menekuk ke dalam/knee valgus).',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 12 Repetisi',
    searchQuery: 'cara squat barbel yang benar back squat tutorial'
  },
  {
    id: 'barbell-front-squat',
    name: 'Barbell Front Squat',
    category: 'Kaki',
    equipment: 'barbell',
    difficulty: 'Mahir',
    targetMuscles: ['Quadriceps Isolasi', 'Core Tegak', 'Glutes'],
    description: 'Squat dengan barbel diletakkan di depan bahu (clavicle), menuntut postur tegak dan beban tinggi pada paha depan.',
    steps: [
      'Letakkan barbel di bahu depan, sangga dengan ujung jari (clean grip) atau menyilang tangan.',
      'Jaga siku tetap tinggi sejajar lantai selama gerakan.',
      'Turun ke bawah dengan tubuh tetap tegak lurus.',
      'Dorong ke atas kembali ke posisi awal.'
    ],
    tips: 'Siku tidak boleh turun agar barbel tidak merosot ke depan.',
    recommendedSets: '3 Set',
    recommendedReps: '6 - 10 Repetisi',
    searchQuery: 'front squat barbel tutorial tips'
  },
  {
    id: 'romanian-deadlift',
    name: 'Barbell Romanian Deadlift (RDL)',
    category: 'Kaki',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Hamstrings (Paha Belakang)', 'Glutes', 'Punggung Bawah'],
    description: 'Latihan hip-hinge terbaik untuk memanjangkan dan memperkuat otot paha belakang dan pantat.',
    steps: [
      'Pegang barbel selebar paha dengan lutut sedikit ditekuk (soft knees).',
      'Dorong pinggul jauh ke belakang sambil menurunkan barbel menyusuri tulang kering.',
      'Rasakan regangan maksimal pada otot hamstring.',
      'Kontraksikan glutes untuk mendorong pinggul maju ke depan kembali tegak.'
    ],
    tips: 'Lutut tidak boleh ditekuk lebih banyak saat turun; fokusnya adalah menggeser pinggul ke belakang.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 12 Repetisi',
    searchQuery: 'romanian deadlift rdl barbel tutorial'
  },
  {
    id: 'barbell-hip-thrust',
    name: 'Barbell Hip Thrust',
    category: 'Kaki',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Gluteus Maximus', 'Hamstrings'],
    description: 'Latihan paling efektif di dunia untuk membangun pantat yang kencang, padat, dan kuat.',
    steps: [
      'Duduk di lantai dengan punggung atas bersandar pada bangku datar.',
      'Posisikan barbel berbusa di atas lipatan pinggul.',
      'Tekuk lutut 90 derajat dengan telapak kaki menapak kuat di lantai.',
      'Dorong pinggul ke atas hingga tubuh lurus dari lutut ke bahu, peras glutes kuat-kuat.'
    ],
    tips: 'Gunakan bantalan busa pada barbel agar tulang panggul tidak sakit.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '10 - 15 Repetisi',
    searchQuery: 'barbell hip thrust cara gerakan yang benar'
  },

  // --- KAKI (LEGS) - BODYWEIGHT ---
  {
    id: 'bodyweight-squat',
    name: 'Air Squat (Bodyweight Squat)',
    category: 'Kaki',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstring', 'Calves'],
    description: 'Pondasi utama gerakan kaki yang melatih mobilitas sendi pinggul dan kekuatan otot paha.',
    steps: [
      'Berdiri tegak dengan kaki selebar bahu.',
      'Rentangkan tangan ke depan untuk menjaga keseimbangan.',
      'Turunkan pinggul ke bawah dan belakang seolah duduk di kursi rendah.',
      'Dorong lantai dengan tumit untuk kembali berdiri tegap.'
    ],
    tips: 'Pastikan dada tetap terangkat dan pandangan lurus ke depan.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '15 - 25 Repetisi',
    searchQuery: 'air squat bodyweight tutorial pemula'
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'Kaki',
    equipment: 'bodyweight',
    difficulty: 'Menengah',
    targetMuscles: ['Quadriceps Sepihak', 'Glutes', 'Keseimbangan Kaki'],
    description: 'Latihan satu kaki (unilateral) paling menantang yang membakar paha dan memperbaiki ketimpangan kekuatan kaki.',
    steps: [
      'Berdiri membelakangi kursi/sofa, letakkan satu punggung kaki di atas kursi.',
      'Langkahkan kaki depan cukup jauh ke depan.',
      'Turunkan tubuh ke bawah hingga lutut belakang hampir menyentuh lantai.',
      'Dorong melalui tumit kaki depan untuk kembali ke posisi atas.'
    ],
    tips: 'Condongkan badan sedikit ke depan untuk aktivasi glutes yang lebih dalam.',
    recommendedSets: '3 Set per Kaki',
    recommendedReps: '10 - 12 Repetisi',
    searchQuery: 'bulgarian split squat bodyweight cara benar'
  },
  {
    id: 'walking-lunges',
    name: 'Walking Lunges',
    category: 'Kaki',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Paha Depan', 'Glutes', 'Stabilitas Inti'],
    description: 'Gerakan melangkah maju secara bergantian yang efektif untuk pembakaran kalori dan pembentukan kaki.',
    steps: [
      'Ambil langkah panjang ke depan dengan satu kaki.',
      'Turunkan pinggul hingga kedua lutut membentuk sudut 90 derajat.',
      'Dorong ke atas dan langsung langkahkan kaki lainnya ke depan bergantian.'
    ],
    tips: 'Jangan biarkan lutut depan bergerak melewati jari kaki secara ekstrem.',
    recommendedSets: '3 Set',
    recommendedReps: '20 Langkah total',
    searchQuery: 'walking lunges form bodyweight tutorial'
  },
  {
    id: 'calf-raises',
    name: 'Standing Calf Raises',
    category: 'Kaki',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Gastrocnemius & Soleus (Betis)'],
    description: 'Latihan jinjit sederhana untuk membentuk otot betis yang atletis dan kokoh.',
    steps: [
      'Berdiri di tepi anak tangga atau permukaan datar.',
      'Jinjit setinggi mungkin dengan bertumpu pada bola kaki.',
      'Tahan di puncak selama 2 detik untuk kontraksi betis maksimal.',
      'Turunkan tumit ke bawah melampaui level anak tangga untuk regangan.'
    ],
    tips: 'Lakukan gerakan dengan tempo lambat dan jangan melompat-lompat.',
    recommendedSets: '4 Set',
    recommendedReps: '20 - 30 Repetisi',
    searchQuery: 'standing calf raises cara melatih betis'
  },

  // --- BAHU (SHOULDERS) - BARBEL ---
  {
    id: 'overhead-press',
    name: 'Barbell Overhead Press (OHP / Military Press)',
    category: 'Bahu',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Bahu Depan & Samping', 'Triceps', 'Upper Chest', 'Core'],
    description: 'Latihan berdiri mendorong beban ke atas kepala, membangun bahu bulat kelapa (boulder shoulders) dan kekuatan overhead sejati.',
    steps: [
      'Berdiri tegak, pegang barbel di dada atas tepat di bawah dagu.',
      'Kencangkan glutes dan otot perut agar pinggang tidak melengkung.',
      'Dorong barbel vertikal ke atas melewati wajah hingga lengan lurus di atas kepala.',
      'Kunci posisi di atas lalu turunkan barbel kembali ke tulang selangka.'
    ],
    tips: 'Tarik sedikit kepala ke belakang saat barbel lewat agar tidak membentur hidung/dagu.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 10 Repetisi',
    searchQuery: 'military press barbell overhead press tutorial'
  },
  {
    id: 'barbell-upright-row',
    name: 'Barbell Upright Row',
    category: 'Bahu',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Bahu Samping (Lateral Delts)', 'Trapezius'],
    description: 'Menarik barbel vertikal ke arah dada atas untuk melebarkan tampilan siluet bahu samping.',
    steps: [
      'Genggam barbel selebar bahu di depan paha.',
      'Tarik barbel ke atas dengan memimpin menggunakan siku.',
      'Angkat hingga barbel setinggi dada tengah (siku sejajar bahu).',
      'Turunkan perlahan ke posisi awal.'
    ],
    tips: 'Jangan menarik terlalu tinggi melampaui dada atas agar sendi bahu tidak terjepit (impingement).',
    recommendedSets: '3 Set',
    recommendedReps: '10 - 12 Repetisi',
    searchQuery: 'upright row barbell form safety'
  },

  // --- BAHU (SHOULDERS) - BODYWEIGHT ---
  {
    id: 'pike-push-up',
    name: 'Pike Push Up',
    category: 'Bahu',
    equipment: 'bodyweight',
    difficulty: 'Menengah',
    targetMuscles: ['Bahu Depan & Samping', 'Upper Chest', 'Triceps'],
    description: 'Variasi push up dengan pinggul terangkat tinggi menyerupai huruf V terbalik untuk memfokuskan beban pada otot bahu.',
    steps: [
      'Mulai dari posisi push up, lalu mundurkan tangan mendekati kaki hingga pinggul terangkat tinggi (posisi V terbalik).',
      'Tekuk siku dan turunkan kepala maju ke depan membentuk segitiga dengan kedua tangan.',
      'Sentuhkan ujung kepala perlahan ke lantai.',
      'Dorong ke atas dan ke belakang kembali ke posisi V.'
    ],
    tips: 'Arah kepala harus turun sedikit ke depan tangan, bukan tepat di antara kedua tangan.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '8 - 12 Repetisi',
    searchQuery: 'pike push up tutorial cara latihan bahu tanpa alat'
  },
  {
    id: 'elevated-pike-pushup',
    name: 'Feet-Elevated Pike Push Up',
    category: 'Bahu',
    equipment: 'bodyweight',
    difficulty: 'Mahir',
    targetMuscles: ['Bahu Penuh', 'Triceps', 'Kekuatan Handstand'],
    description: 'Pike push up dengan kaki ditaruh di atas kursi tinggi, langkah terbaik sebelum handstand push up.',
    steps: [
      'Letakkan kedua kaki di kursi/meja kokoh.',
      'Dekatkan tangan hingga pinggul membentuk sudut tegak lurus 90 derajat.',
      'Turunkan kepala ke lantai lalu dorong kembali ke atas.'
    ],
    tips: 'Hanya lakukan jika sudah menguasai pike push up reguler dengan mudah.',
    recommendedSets: '3 Set',
    recommendedReps: '6 - 10 Repetisi',
    searchQuery: 'elevated pike push up calisthenics shoulder workout'
  },

  // --- LENGAN (ARMS) - BARBEL ---
  {
    id: 'barbell-bicep-curl',
    name: 'Standing Barbell Bicep Curl',
    category: 'Lengan',
    equipment: 'barbell',
    difficulty: 'Pemula',
    targetMuscles: ['Biceps Brachii (Puncak Otot Lengan)', 'Brachialis'],
    description: 'Latihan isolasi klasik paling populer untuk membesarkan ukuran dan puncak lingkar otot lengan depan.',
    steps: [
      'Berdiri tegap, pegang barbel dengan telapak tangan menghadap ke depan selebar bahu.',
      'Kunci siku di samping pinggang.',
      'Tekuk lengan dan angkat barbel ke atas hingga bicep berkontraksi penuh.',
      'Turunkan perlahan selama 2-3 detik ke posisi awal.'
    ],
    tips: 'Jangan mengayunkan pinggang atau badan ke belakang untuk mengangkat beban.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '10 - 12 Repetisi',
    searchQuery: 'barbell bicep curl proper form tutorial'
  },
  {
    id: 'barbell-skull-crusher',
    name: 'Barbell Lying Tricep Extension (Skull Crusher)',
    category: 'Lengan',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Triceps (Long Head & Lateral Head)'],
    description: 'Latihan berbaring dengan menekuk siku ke arah dahi untuk mengisi massa bagian belakang lengan (triceps tebal).',
    steps: [
      'Berbaring di bangku datar dengan barbel dipegang tegak lurus di atas dada.',
      'Jaga lengan atas tetap diam tegak, tekuk siku hingga barbel turun ke arah dahi/atas kepala.',
      'Dorong barbel kembali ke atas dengan meluruskan siku.'
    ],
    tips: 'Gunakan cengkeraman kokoh dan beban yang terkontrol agar barbel tidak mengenai kepala.',
    recommendedSets: '3 Set',
    recommendedReps: '10 - 12 Repetisi',
    searchQuery: 'skull crusher barbell triceps tutorial'
  },
  {
    id: 'close-grip-bench-press',
    name: 'Close-Grip Barbell Bench Press',
    category: 'Lengan',
    equipment: 'barbell',
    difficulty: 'Menengah',
    targetMuscles: ['Triceps Medial & Lateral', 'Inner Chest'],
    description: 'Bench press dengan pegangan sempit (selebar bahu) untuk memindahkan beban kerja penuh ke otot triceps.',
    steps: [
      'Berbaring di bench, genggam barbel selebar bahu (sekitar 30-40 cm).',
      'Turunkan barbel ke dada bawah dengan siku tetap rapat dekat tubuh.',
      'Dorong ke atas dengan mengandalkan ekstensi triceps.'
    ],
    tips: 'Jangan pegang terlalu sempit (di bawah 20 cm) agar pergelangan tangan tidak nyeri.',
    recommendedSets: '3 Set',
    recommendedReps: '8 - 12 Repetisi',
    searchQuery: 'close grip bench press triceps exercise'
  },

  // --- LENGAN (ARMS) - BODYWEIGHT ---
  {
    id: 'bench-tricep-dips',
    name: 'Bench Tricep Dips',
    category: 'Lengan',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Triceps', 'Bahu Depan'],
    description: 'Latihan menggunakan pinggir kursi atau kasur untuk memahat triceps lengan belakang tanpa beban besi.',
    steps: [
      'Duduk di tepi kursi, letakkan telapak tangan di samping pinggul.',
      'Majukan kaki ke depan dan turunkan pantat melayang dari kursi.',
      'Tekuk siku hingga 90 derajat untuk menurunkan tubuh.',
      'Dorong telapak tangan ke bawah untuk meluruskan kembali lengan.'
    ],
    tips: 'Luruskan kaki ke depan untuk memperberat beban, atau tekuk lutut untuk meringankannya.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '12 - 20 Repetisi',
    searchQuery: 'bench dips triceps workout at home'
  },

  // --- CORE / PERUT - BARBEL ---
  {
    id: 'barbell-ab-rollout',
    name: 'Barbell Ab Rollout',
    category: 'Core / Perut',
    equipment: 'barbell',
    difficulty: 'Mahir',
    targetMuscles: ['Rectus Abdominis (Sixpack)', 'Transverse Abdominis', 'Lats'],
    description: 'Latihan core paling mematikan menggunakan piringan barbel yang berputar di lantai untuk daya tahan otot perut baja.',
    steps: [
      'Berlutut di lantai dengan barbel berputar di depan lutut.',
      'Pegang barbel selebar bahu, kunci otot perut.',
      'Dorong barbel maju ke depan sejauh mungkin dengan tubuh merentang rendah.',
      'Gunakan kekuatan otot perut untuk menarik kembali barbel ke posisi awal.'
    ],
    tips: 'Jangan biarkan punggung bawah melorot jatuh ke lantai.',
    recommendedSets: '3 Set',
    recommendedReps: '8 - 12 Repetisi',
    searchQuery: 'barbell ab rollout tutorial sixpack workout'
  },

  // --- CORE / PERUT - BODYWEIGHT ---
  {
    id: 'plank-hold',
    name: 'Forearm Plank Hold',
    category: 'Core / Perut',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Seluruh Otot Inti (Core)', 'Perut Dalam', 'Pundak'],
    description: 'Latihan isometrik legendaris untuk mengencangkan lingkar pinggang dan mencegah nyeri punggung.',
    steps: [
      'Tengkurap dengan bertumpu pada kedua lengan bawah (forearm) dan ujung jari kaki.',
      'Tarik pusar ke arah tulang punggung, kunci pantat dan paha.',
      'Pertahankan tubuh lurus horizontal seperti papan kayu.',
      'Bernapas secara konstan dan tenang.'
    ],
    tips: 'Jangan menahan napas dan jangan biarkan pinggul merosot ke bawah.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: 'Tahan 30 - 60 Detik',
    searchQuery: 'cara plank yang benar pemula tutorial'
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    category: 'Core / Perut',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Obliques (Perut Samping)', 'Perut Atas & Bawah'],
    description: 'Gerakan kayuhan sepeda di udara dengan memutar siku ke lutut berlawanan untuk mengikis lemak pinggang.',
    steps: [
      'Berbaring telentang dengan tangan di belakang kepala (jangan menarik leher).',
      'Angkat kaki ke udara, tekuk lutut 90 derajat.',
      'Sentuhkan siku kanan ke lutut kiri sambil meluruskan kaki kanan.',
      'Ulangi bergantian ke sisi sebaliknya dengan ritme mengayuh.'
    ],
    tips: 'Gerakan harus lambat dan terkontrol, bukan asal cepat.',
    recommendedSets: '3 Set',
    recommendedReps: '20 Repetisi (10 per sisi)',
    searchQuery: 'bicycle crunch proper form tutorial'
  },
  {
    id: 'leg-raises',
    name: 'Lying Leg Raises',
    category: 'Core / Perut',
    equipment: 'bodyweight',
    difficulty: 'Menengah',
    targetMuscles: ['Perut Bawah (Lower Abs)', 'Hip Flexors'],
    description: 'Mengangkat kedua kaki lurus dari lantai untuk meratakan perut bawah yang membandel.',
    steps: [
      'Berbaring telentang di lantai, letakkan tangan di samping atau di bawah pinggul.',
      'Rapatkan kedua kaki dan angkat lurus ke atas hingga membentuk sudut 90 derajat.',
      'Turunkan kaki perlahan ke bawah hingga hampir menyentuh lantai tanpa meletakkannya.',
      'Angkat kembali ke atas.'
    ],
    tips: 'Punggung bawah harus selalu menempel rapat di lantai (tidak ada celah melengkung).',
    recommendedSets: '3 Set',
    recommendedReps: '12 - 15 Repetisi',
    searchQuery: 'lying leg raises lower abs exercise form'
  },

  // --- KARDIO & FULL BODY ---
  {
    id: 'burpees-full-body',
    name: 'Burpees (Full Body Calisthenics)',
    category: 'Kardio & Full Body',
    equipment: 'bodyweight',
    difficulty: 'Menengah',
    targetMuscles: ['Seluruh Tubuh', 'Jantung (Kardio)', 'Kaki', 'Dada'],
    description: 'Kombinasi squat, push up, dan lompatan eksplosif untuk membakar kalori secara masif dalam waktu singkat.',
    steps: [
      'Berdiri tegak, lalu turun ke posisi squat dan letakkan tangan di lantai.',
      'Lemparkan kedua kaki ke belakang ke posisi push up dan lakukan 1 push up.',
      'Lompatkan kembali kaki ke depan dekat tangan.',
      'Lompat tegak ke atas sambil menepuk tangan di atas kepala.'
    ],
    tips: 'Bisa lewati push up jika baru pertama kali mencoba untuk mengurangi intensitas.',
    recommendedSets: '3 - 4 Set',
    recommendedReps: '10 - 15 Repetisi',
    searchQuery: 'how to do burpees properly cardio'
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'Kardio & Full Body',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Core', 'Paha Depan', 'Bahu', 'Kardiovaskular'],
    description: 'Gerakan lari di tempat dari posisi push up untuk meningkatkan detak jantung dan ketahanan tubuh.',
    steps: [
      'Mulai dari posisi push up standar dengan tangan kokoh di bawah bahu.',
      'Tarik satu lutut ke arah dada dengan cepat.',
      'Kembalikan ke belakang sambil serentak menarik lutut lainnya bergantian seolah berlari menanjak gunung.'
    ],
    tips: 'Jaga pinggul tetap rendah dan sejajar dengan bahu.',
    recommendedSets: '3 Set',
    recommendedReps: '30 - 45 Detik',
    searchQuery: 'mountain climbers exercise form tutorial'
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'Kardio & Full Body',
    equipment: 'bodyweight',
    difficulty: 'Pemula',
    targetMuscles: ['Kardio', 'Betis', 'Bahu'],
    description: 'Pemanasan dan kardio klasik untuk memompa aliran darah dan membakar kalori sebelum atau sesudah latihan beban.',
    steps: [
      'Berdiri dengan kaki rapat dan tangan di samping.',
      'Lompat sambil membuka kaki selebar bahu dan tepuk tangan di atas kepala.',
      'Lompat kembali ke posisi semula.'
    ],
    tips: 'Mendaratlah dengan lembut menggunakan bagian depan telapak kaki untuk melindungi sendi lutut.',
    recommendedSets: '3 Set',
    recommendedReps: '45 - 60 Detik',
    searchQuery: 'jumping jacks exercise tutorial'
  }
];
