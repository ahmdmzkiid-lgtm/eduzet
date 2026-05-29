export const SUBJECT_DATA = [
  {
    id: 'matematika',
    title: 'Penalaran Matematika',
    description: 'Kuasai konsep matematika melalui kurikulum berbasis kompetensi yang dirancang secara editorial untuk kejernihan berpikir.',
    icon: 'calculate',
    bgColor: '#dae1ff',
    iconColor: '#0050cb',
    totalProgress: 42,
    items: [
      { 
        title: 'Aljabar', 
        questions: '128 Pertanyaan Tersedia', 
        progress: 65, 
        icon: 'calculate', 
        isPopular: true,
        type: 'standard' 
      },
      { 
        title: 'Geometri', 
        questions: '94 Pertanyaan Tersedia', 
        progress: 12, 
        icon: 'category', 
        type: 'standard' 
      },
      { 
        title: 'Kalkulus', 
        questions: '45 Pertanyaan Baru', 
        level: 'Tingkat Lanjut',
        description: 'Eksplorasi limit, turunan, dan integral dalam konteks dunia nyata.',
        isFeatured: true,
        type: 'featured' 
      },
      { 
        title: 'Statistika', 
        questions: '210 Pertanyaan Tersedia', 
        progress: 0, 
        icon: 'bar_chart', 
        type: 'standard' 
      },
      { 
        title: 'Trigonometri', 
        questions: '76 Pertanyaan Tersedia', 
        progress: 88, 
        icon: 'change_history', 
        type: 'standard' 
      },
      { 
        title: 'Logika & Himpunan', 
        description: 'Fundamental penalaran matematis untuk pemecahan masalah kompleks.',
        icon: 'psychology', 
        type: 'centered' 
      }
    ]
  },
  {
    id: 'umum',
    title: 'Penalaran Umum',
    description: 'Analisis logika dan pola berpikir secara sistematis melalui kurikulum berbasis kompetensi.',
    icon: 'psychology',
    bgColor: '#c2e8ff',
    iconColor: '#001e2b',
    totalProgress: 15,
    items: [
      { 
        title: 'Logika Verbal', 
        questions: '80 Pertanyaan', 
        progress: 90, 
        icon: 'chat', 
        type: 'standard' 
      },
      { 
        title: 'Penalaran Logis', 
        questions: '120 Pertanyaan', 
        progress: 10, 
        icon: 'psychology', 
        isFeatured: true,
        type: 'featured' 
      }
    ]
  },
  {
    id: 'pengetahuan_umum',
    title: 'Pengetahuan dan Pemahaman Umum',
    description: 'Wawasan komprehensif teks dan konteks teks formal dalam berbagai disiplin ilmu.',
    icon: 'menu_book',
    bgColor: '#ffdbd0',
    iconColor: '#390c00',
    totalProgress: 20,
    isNew: true,
    items: [
      { title: 'Wawasan Kebangsaan', questions: '60 Pertanyaan', progress: 40, icon: 'flag', type: 'standard' },
      { title: 'Isu Kontemporer', questions: '50 Pertanyaan', progress: 0, icon: 'public', type: 'standard' }
    ]
  },
  {
    id: 'indonesia',
    title: 'Literasi B. Indonesia',
    description: 'Asah kemampuan analisis teks dalam Bahasa Indonesia secara mendalam dan kritis.',
    icon: 'translate',
    bgColor: '#dae1ff',
    iconColor: '#0050cb',
    totalProgress: 45,
    items: [
      { title: 'Ide Pokok & Simpulan', questions: '150 Pertanyaan', progress: 100, icon: 'article', type: 'standard' },
      { title: 'Ejaan & Tata Bahasa', questions: '120 Pertanyaan', progress: 45, icon: 'spellcheck', type: 'standard' }
    ]
  },
  {
    id: 'bacaan_tulisan',
    title: 'Pemahaman Bacaan & Tulisan',
    description: 'Pemahaman mendalam struktur bacaan dan teknik menulis efektif untuk simulasi SNBT.',
    icon: 'edit_note',
    bgColor: '#f2f3ff',
    iconColor: '#727687',
    totalProgress: 10,
    items: [
      { title: 'Struktur Kalimat', questions: '200 Pertanyaan', progress: 50, icon: 'notes', type: 'standard' },
      { title: 'Koherensi Paragraf', questions: '180 Pertanyaan', progress: 10, icon: 'segment', type: 'standard' }
    ]
  },
  {
    id: 'kuantitatif',
    title: 'Pengetahuan Kuantitatif',
    description: 'Logika matematika dasar dan problem solving SNBT berbasis data.',
    icon: 'functions',
    bgColor: '#c2e8ff',
    iconColor: '#006688',
    totalProgress: 25,
    items: [
      { title: 'Operasi Bilangan', questions: '300 Pertanyaan', progress: 85, icon: 'numbers', type: 'standard' },
      { title: 'Himpunan & Logika', questions: '240 Pertanyaan', progress: 25, icon: 'data_object', type: 'standard' }
    ]
  },
  {
    id: 'inggris',
    title: 'Literasi B. Inggris',
    description: 'Advanced reading comprehension and context mastery for international standards.',
    icon: 'language',
    bgColor: '#ffdbd0',
    iconColor: '#a33200',
    totalProgress: 15,
    items: [
      { title: 'Main Idea Analysis', questions: '180 Pertanyaan', progress: 60, icon: 'description', type: 'standard' },
      { title: 'Contextual Clues', questions: '150 Pertanyaan', progress: 20, icon: 'find_in_page', type: 'standard' }
    ]
  }
];
