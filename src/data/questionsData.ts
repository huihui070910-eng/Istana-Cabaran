export interface QuestionItem {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  correctWord: string;
  category: string;
  categoryType: 'ukuran' | 'pancaindera';
  senseSubtype?: 'sentuhan' | 'bau' | 'rasa' | 'pendengaran' | 'penglihatan';
  hint: string;
  explanation: string;
  checkpointTitle: string;
  obstacleName: string;
  obstacleType: 'gate' | 'rock' | 'bridge' | 'secret_door' | 'stairs' | 'mist' | 'crystal' | 'chains';
  mapCoord: { x: number; y: number }; // Percentage along canvas (0-100)
}

export const QUESTIONS_DATA: QuestionItem[] = [
  {
    id: 1,
    question: "Baju baharu itu ______ kerana diperbuat daripada kain satin.",
    options: [
      { key: "A", text: "panjang" },
      { key: "B", text: "lembut" },
      { key: "C", text: "tinggi" },
      { key: "D", text: "pendek" }
    ],
    correctAnswer: "B",
    correctWord: "lembut",
    category: "Kata adjektif pancaindera (sentuhan)",
    categoryType: "pancaindera",
    senseSubtype: "sentuhan",
    hint: "Fikirkan tekstur kain apabila disentuh.",
    explanation: "\"Lembut\" ialah kata adjektif pancaindera bagi deria sentuhan (kulit) untuk kain yang licin dan gebu.",
    checkpointTitle: "Halangan 1: Pintu Gerbang Kayu Purba",
    obstacleName: "Pintu Kayu Berkunci Rapat",
    obstacleType: "gate",
    mapCoord: { x: 35, y: 85 }
  },
  {
    id: 2,
    question: "Pokok kelapa di tepi pantai itu sangat ______.",
    options: [
      { key: "A", text: "tinggi" },
      { key: "B", text: "harum" },
      { key: "C", text: "masam" },
      { key: "D", text: "merdu" }
    ],
    correctAnswer: "A",
    correctWord: "tinggi",
    category: "Kata adjektif ukuran",
    categoryType: "ukuran",
    hint: "Ukuran dari bawah hingga ke atas.",
    explanation: "\"Tinggi\" ialah kata adjektif ukuran yang menerangkan jarak tegak dari bawah ke atas.",
    checkpointTitle: "Halangan 2: Laluan Cerun Berbatu",
    obstacleName: "Batu Besar Menghalang Laluan",
    obstacleType: "rock",
    mapCoord: { x: 41, y: 78 }
  },
  {
    id: 3,
    question: "Bunga melur di taman itu sangat ______.",
    options: [
      { key: "A", text: "tebal" },
      { key: "B", text: "panjang" },
      { key: "C", text: "harum" },
      { key: "D", text: "rendah" }
    ],
    correctAnswer: "C",
    correctWord: "harum",
    category: "Kata adjektif pancaindera (bau)",
    categoryType: "pancaindera",
    senseSubtype: "bau",
    hint: "Gunakan deria hidung.",
    explanation: "\"Harum\" ialah kata adjektif pancaindera bagi deria bau (hidung) untuk aroma wangi bunga.",
    checkpointTitle: "Halangan 3: Taman Bunga Melur Rahsia",
    obstacleName: "Pintu Rahsia Berlumut",
    obstacleType: "secret_door",
    mapCoord: { x: 47, y: 71 }
  },
  {
    id: 4,
    question: "Jambatan kayu itu sangat ______ sehingga menghubungkan kedua-dua tebing sungai.",
    options: [
      { key: "A", text: "pendek" },
      { key: "B", text: "panjang" },
      { key: "C", text: "manis" },
      { key: "D", text: "lembut" }
    ],
    correctAnswer: "B",
    correctWord: "panjang",
    category: "Kata adjektif ukuran",
    categoryType: "ukuran",
    hint: "Jarak dari satu hujung ke hujung yang lain.",
    explanation: "\"Panjang\" ialah kata adjektif ukuran bagi jarak melintang dari satu hujung tebing ke satu hujung tebing lagi.",
    checkpointTitle: "Halangan 4: Jambatan Kayu Lembah",
    obstacleName: "Jambatan Kayu Terputus Rantai",
    obstacleType: "bridge",
    mapCoord: { x: 54, y: 65 }
  },
  {
    id: 5,
    question: "Air perahan limau itu sangat ______ apabila diminum.",
    options: [
      { key: "A", text: "tinggi" },
      { key: "B", text: "lebar" },
      { key: "C", text: "masam" },
      { key: "D", text: "nyaring" }
    ],
    correctAnswer: "C",
    correctWord: "masam",
    category: "Kata adjektif pancaindera (rasa)",
    categoryType: "pancaindera",
    senseSubtype: "rasa",
    hint: "Gunakan deria lidah.",
    explanation: "\"Masam\" ialah kata adjektif pancaindera bagi deria rasa (lidah) untuk buah sitrus atau limau.",
    checkpointTitle: "Halangan 5: Telaga Kristal Asid",
    obstacleName: "Jeriji Besi Menara Berkunci",
    obstacleType: "gate",
    mapCoord: { x: 53, y: 58 }
  },
  {
    id: 6,
    question: "Buku cerita itu mempunyai banyak halaman dan sangat ______.",
    options: [
      { key: "A", text: "nipis" },
      { key: "B", text: "tebal" },
      { key: "C", text: "harum" },
      { key: "D", text: "merdu" }
    ],
    correctAnswer: "B",
    correctWord: "tebal",
    category: "Kata adjektif ukuran",
    categoryType: "ukuran",
    hint: "Fikirkan ketebalan buku.",
    explanation: "\"Tebal\" ialah kata adjektif ukuran bagi ketebalan atau bilangan helaian muka surat yang banyak.",
    checkpointTitle: "Halangan 6: Perpustakaan Purba",
    obstacleName: "Tangga Batu Purba Terkunci",
    obstacleType: "stairs",
    mapCoord: { x: 48, y: 52 }
  },
  {
    id: 7,
    question: "Suara penyanyi itu sangat ______ sehingga sedap didengar.",
    options: [
      { key: "A", text: "merdu" },
      { key: "B", text: "masam" },
      { key: "C", text: "pendek" },
      { key: "D", text: "lebar" }
    ],
    correctAnswer: "A",
    correctWord: "merdu",
    category: "Kata adjektif pancaindera (pendengaran)",
    categoryType: "pancaindera",
    senseSubtype: "pendengaran",
    hint: "Gunakan deria telinga.",
    explanation: "\"Merdu\" ialah kata adjektif pancaindera bagi deria pendengaran (telinga) untuk suara atau lagu yang lunak.",
    checkpointTitle: "Halangan 7: Menara Nada Angin",
    obstacleName: "Tirai Kabus Berbunyi Nyaring",
    obstacleType: "mist",
    mapCoord: { x: 51, y: 47 }
  },
  {
    id: 8,
    question: "Padang bola sepak sekolah itu sangat ______.",
    options: [
      { key: "A", text: "harum" },
      { key: "B", text: "kecil" },
      { key: "C", text: "luas" },
      { key: "D", text: "manis" }
    ],
    correctAnswer: "C",
    correctWord: "luas",
    category: "Kata adjektif ukuran",
    categoryType: "ukuran",
    hint: "Kawasan yang mempunyai ruang besar.",
    explanation: "\"Luas\" ialah kata adjektif ukuran bagi keluasan saiz kawasan tanah lapang.",
    checkpointTitle: "Halangan 8: Dataran Pahlawan Istana",
    obstacleName: "Gerbang Emas Berantai Berat",
    obstacleType: "chains",
    mapCoord: { x: 54, y: 42 }
  },
  {
    id: 9,
    question: "Lukisan pemandangan di dinding itu sangat ______.",
    options: [
      { key: "A", text: "cantik" },
      { key: "B", text: "tebal" },
      { key: "C", text: "masam" },
      { key: "D", text: "panjang" }
    ],
    correctAnswer: "A",
    correctWord: "cantik",
    category: "Kata adjektif pancaindera (penglihatan)",
    categoryType: "pancaindera",
    senseSubtype: "penglihatan",
    hint: "Sesuatu yang indah dipandang.",
    explanation: "\"Cantik\" ialah kata adjektif pancaindera bagi deria penglihatan (mata) untuk rupa lukisan yang mempesonakan.",
    checkpointTitle: "Halangan 9: Galeri Lukisan Dinding Istana",
    obstacleName: "Pintu Kristal Pelangi Berkilau",
    obstacleType: "crystal",
    mapCoord: { x: 56, y: 38 }
  },
  {
    id: 10,
    question: "Anak arnab itu lebih ______ berbanding arnab dewasa.",
    options: [
      { key: "A", text: "harum" },
      { key: "B", text: "kecil" },
      { key: "C", text: "merdu" },
      { key: "D", text: "masam" }
    ],
    correctAnswer: "B",
    correctWord: "kecil",
    category: "Kata adjektif ukuran",
    categoryType: "ukuran",
    hint: "Fikirkan saiz badan anak arnab.",
    explanation: "\"Kecil\" ialah kata adjektif ukuran bagi saiz atau bentuk fizikal yang tidak besar.",
    checkpointTitle: "Halangan 10: Pintu Gerbang Terakhir Istana",
    obstacleName: "Pintu Istana Cabaran Tertinggi",
    obstacleType: "gate",
    mapCoord: { x: 58, y: 34 }
  }
];

export const START_COORD = { x: 39, y: 93 };
export const FINISH_COORD = { x: 58, y: 28 };
