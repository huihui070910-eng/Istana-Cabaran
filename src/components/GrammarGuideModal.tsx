import React from 'react';
import { X, BookOpen, Sparkles, Ruler } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface GrammarGuideModalProps {
  onClose: () => void;
}

export const GrammarGuideModal: React.FC<GrammarGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-purple-700/80 rounded-3xl shadow-2xl p-5 sm:p-7 text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Tutup Nota"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-purple-800/60 pb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow">
            <BookOpen className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-amber-300 font-fun">
              Nota Ringkas: Kata Adjektif
            </h2>
            <p className="text-xs text-purple-300">
              Panduan tatabahasa untuk melepasi halangan Istana Cabaran.
            </p>
          </div>
        </div>

        {/* Section 1: Kata Adjektif Ukuran */}
        <div className="mb-6 bg-purple-950/40 border border-purple-800/50 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-300 font-fun text-base">
              1. Kata Adjektif Ukuran
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-purple-200 mb-3 leading-relaxed">
            Perkataan yang membawa pengertian sifat atau keadaan ukuran saiz, panjang, jarak, atau isi padu sesuatu benda.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { word: 'Tinggi', desc: 'Jarak bawah ke atas (cth: pokok kelapa)' },
              { word: 'Panjang', desc: 'Jarak melintang (cth: jambatan kayu)' },
              { word: 'Tebal', desc: 'Ketebalan muka surat (cth: buku cerita)' },
              { word: 'Luas', desc: 'Ruang kawasan besar (cth: padang bola)' },
              { word: 'Kecil', desc: 'Saiz tidak besar (cth: anak arnab)' },
              { word: 'Pendek / Nipis', desc: 'Ukuran lawan bagi panjang/tebal' },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-purple-800/60 rounded-xl p-2.5">
                <p className="text-xs font-bold text-amber-300">{item.word}</p>
                <p className="text-[11px] text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Kata Adjektif Pancaindera */}
        <div className="mb-6 bg-purple-950/40 border border-purple-800/50 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-300 font-fun text-base">
              2. Kata Adjektif Pancaindera (5 Deria)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-purple-200 mb-3 leading-relaxed">
            Perkataan yang membawa pengertian konsep rasa, sentuh, dengar, pandang, atau bau yang dikesan oleh anggota deria.
          </p>
          
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="bg-slate-900/90 border border-purple-800/60 rounded-xl p-3 flex items-start gap-2.5">
              <span className="text-base">🖐️</span>
              <div>
                <strong className="text-amber-300">Deria Sentuhan (Kulit): </strong>
                <span className="text-slate-200">lembut (kain satin), kasar, licin, halus, kesat.</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-purple-800/60 rounded-xl p-3 flex items-start gap-2.5">
              <span className="text-base">👃</span>
              <div>
                <strong className="text-amber-300">Deria Bau (Hidung): </strong>
                <span className="text-slate-200">harum (bunga melur), wangi, busuk, hanyir, tengik.</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-purple-800/60 rounded-xl p-3 flex items-start gap-2.5">
              <span className="text-base">👅</span>
              <div>
                <strong className="text-amber-300">Deria Rasa (Lidah): </strong>
                <span className="text-slate-200">masam (perahan limau), manis, pahit, masin, pedas.</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-purple-800/60 rounded-xl p-3 flex items-start gap-2.5">
              <span className="text-base">👂</span>
              <div>
                <strong className="text-amber-300">Deria Pendengaran (Telinga): </strong>
                <span className="text-slate-200">merdu (suara penyanyi), bising, nyaring, garau, lunak.</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-purple-800/60 rounded-xl p-3 flex items-start gap-2.5">
              <span className="text-base">👁️</span>
              <div>
                <strong className="text-amber-300">Deria Penglihatan (Mata): </strong>
                <span className="text-slate-200">cantik (lukisan pemandangan), comel, molek, hodoh, tampan.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-fun text-base shadow-lg transition-transform hover:scale-[1.01] active:scale-95 cursor-pointer"
        >
          Faham, Teruskan Pengembaraan!
        </button>

      </div>
    </div>
  );
};
