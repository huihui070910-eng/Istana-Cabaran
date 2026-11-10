import React, { useEffect } from 'react';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  Star, 
  Award, 
  CheckCircle2, 
  Sparkles,
  Castle,
  KeyRound
} from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { IMAGES } from '../assets/images';

interface VictoryModalProps {
  score: number;
  totalQuestions: number;
  playerName?: string;
  playerAvatar?: string;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  score,
  totalQuestions,
  playerName,
  playerAvatar,
  onPlayAgain,
  onBackToMenu,
}) => {
  useEffect(() => {
    sound.playVictory();
  }, []);

  const masteredWords = [
    { word: 'lembut', cat: 'Pancaindera (Sentuhan)' },
    { word: 'tinggi', cat: 'Ukuran (Tinggi)' },
    { word: 'harum', cat: 'Pancaindera (Bau)' },
    { word: 'panjang', cat: 'Ukuran (Panjang)' },
    { word: 'masam', cat: 'Pancaindera (Rasa)' },
    { word: 'tebal', cat: 'Ukuran (Ketebalan)' },
    { word: 'merdu', cat: 'Pancaindera (Pendengaran)' },
    { word: 'luas', cat: 'Ukuran (Keluasan)' },
    { word: 'cantik', cat: 'Pancaindera (Penglihatan)' },
    { word: 'kecil', cat: 'Ukuran (Saiz)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-400 rounded-3xl shadow-2xl shadow-amber-500/20 p-5 sm:p-8 my-auto max-h-[92vh] overflow-y-auto text-center text-slate-100">
        
        {/* Cute Cartoon Victory Castle Banner */}
        <div className="relative w-full h-48 sm:h-60 rounded-2xl overflow-hidden mb-5 border-2 border-amber-400/80 shadow-xl">
          <img
            src={IMAGES.castleGate}
            alt="Pintu Istana Cabaran Terbuka Kartun Comel"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs shadow-md">
              <Castle className="w-3.5 h-3.5 text-slate-950" />
              <span>Pintu Istana Berjaya Dibuka!</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/80 border border-amber-400/60 text-amber-300 text-xs font-bold">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>10/10 Kunci Emas</span>
            </span>
          </div>
        </div>

        {/* Character Portrait & Stars */}
        <div className="flex items-center justify-center gap-3 mb-2">
          {playerAvatar && (
            <div className="w-12 h-12 rounded-full border-2 border-amber-400 overflow-hidden shadow-lg bg-purple-950">
              <img
                src={playerAvatar}
                alt={playerName || "Wira"}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top scale-110"
              />
            </div>
          )}
          <div className="inline-flex items-center gap-1">
            <Star className="w-6 h-6 text-amber-400 fill-amber-400 animate-bounce" />
            <Star className="w-8 h-8 text-amber-300 fill-amber-300 animate-bounce delay-100" />
            <Star className="w-6 h-6 text-amber-400 fill-amber-400 animate-bounce delay-200" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 font-fun tracking-wide mb-1.5">
          TAHNIAH{playerName ? `, ${playerName.toUpperCase()}` : ''}!
        </h1>
        <p className="text-base sm:text-lg font-bold text-amber-300 font-fun mb-2">
          ANDA BERJAYA MENAMATKAN MISI 3!
        </p>

        <p className="text-xs sm:text-sm text-purple-200 mb-5 max-w-lg mx-auto">
          Watak pengembara telah melepasi semua 10 halangan dan berjaya memasuki Istana Cabaran dengan cemerlang!
        </p>

        {/* Score & Achievements Metrics Box */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          
          <div className="bg-purple-950/70 border border-purple-800/80 rounded-2xl p-3.5 flex flex-col items-center">
            <Award className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="text-[11px] font-semibold text-purple-300 uppercase">Jumlah Markah</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono tabular-nums">
              {score}/100
            </span>
          </div>

          <div className="bg-purple-950/70 border border-purple-800/80 rounded-2xl p-3.5 flex flex-col items-center">
            <CheckCircle2 className="w-6 h-6 text-amber-400 mb-1" />
            <span className="text-[11px] font-semibold text-purple-300 uppercase">Soalan Dijawab</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tabular-nums">
              {totalQuestions}/10
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-purple-950/70 border border-purple-800/80 rounded-2xl p-3.5 flex flex-col items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-300 mb-1" />
            <span className="text-[11px] font-semibold text-purple-300 uppercase">Tahap Penguasaan</span>
            <span className="text-sm sm:text-base font-bold text-yellow-300 font-fun">
              Cemerlang ⭐⭐⭐
            </span>
          </div>

        </div>

        {/* Summary of Kata Adjektif Mastered */}
        <div className="bg-purple-950/40 border border-purple-800/50 rounded-2xl p-3.5 sm:p-4 mb-6 text-left">
          <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Kata Adjektif Yang Telah Anda Kuasai:</span>
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {masteredWords.map((item, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-800/90 border border-purple-700/60 rounded-lg px-2.5 py-1 text-slate-200 flex items-center gap-1.5"
              >
                <strong className="text-amber-300">{item.word}</strong>
                <span className="text-purple-300/60 text-[10px]">({item.cat})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Prominent Action Buttons: MAIN SEMULA & KEMBALI KE MENU UTAMA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1">
          
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black font-fun text-base sm:text-lg flex items-center justify-center gap-2 shadow-2xl shadow-amber-500/40 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer ring-4 ring-amber-400/30"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            <span>MAIN SEMULA</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onBackToMenu();
            }}
            className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-purple-900/80 hover:bg-purple-800 border-2 border-purple-600/80 text-purple-200 font-bold font-fun text-base flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-95 cursor-pointer shadow-lg"
          >
            <Home className="w-5 h-5 text-amber-400" />
            <span>KEMBALI KE MENU UTAMA</span>
          </button>

        </div>

      </div>
    </div>
  );
};
