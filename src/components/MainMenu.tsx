import React, { useState } from 'react';
import { Play, BookOpen, Sparkles, Shield, KeyRound, Award, Compass, User, Check } from 'lucide-react';
import { sound } from '../utils/soundEffects';
import { IMAGES } from '../assets/images';

interface MainMenuProps {
  onStartGame: (playerName: string, playerGender: 'lelaki' | 'perempuan') => void;
  onOpenNotes: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onOpenNotes }) => {
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<'lelaki' | 'perempuan'>('lelaki');

  const boyAvatar = IMAGES.boyAvatar;
  const girlAvatar = IMAGES.girlAvatar;

  const handleGenderSelect = (selected: 'lelaki' | 'perempuan') => {
    sound.playClick();
    setGender(selected);
  };

  const handleStart = () => {
    sound.playClick();
    const finalName = name.trim() || (gender === 'lelaki' ? 'Pengembara Adam' : 'Pengembara Sara');
    onStartGame(finalName, gender);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-purple-800/70 bg-slate-900/95 shadow-2xl shadow-purple-950/80 p-5 sm:p-8 md:p-10 my-3 text-center">
      
      {/* Background Castle Vignette */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src={IMAGES.castleBackdrop}
          alt="Istana Fantasi"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter blur-sm"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Game Title & Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/90 border border-purple-600/70 text-amber-300 text-xs sm:text-sm font-bold mb-3 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Bahasa Melayu · Sekolah Rendah</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 font-fun tracking-wide mb-2 drop-shadow-md">
          MISI 3 – ISTANA CABARAN
        </h1>

        <p className="max-w-2xl text-purple-200 text-xs sm:text-sm md:text-base leading-relaxed mb-6">
          Selamat datang ke Istana Cabaran! Selesaikan teka-teki <strong className="text-amber-300">Kata Adjektif Ukuran</strong> & <strong className="text-amber-300">Kata Adjektif Pancaindera</strong> untuk membuka 10 halangan dan membuka pintu Istana Cabaran!
        </p>

        {/* Character Creation & Setup Card (Nama & Pilihan Lelaki / Perempuan) */}
        <div className="w-full max-w-xl bg-purple-950/70 border-2 border-amber-400/60 rounded-3xl p-5 sm:p-6 mb-7 shadow-xl shadow-purple-950/60 text-left">
          
          <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-purple-800/60">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-amber-300 font-fun">
                Profil Pengembara Anda
              </h2>
              <p className="text-[11px] text-purple-300/80">
                Pilih watak dan masukkan nama anda sebelum memulakan cabaran.
              </p>
            </div>
          </div>

          {/* 1. Pilih Watak: Lelaki atau Perempuan */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-2.5">
              1. Pilih Jantina Watak:
            </label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              
              {/* Option: Lelaki */}
              <button
                type="button"
                onClick={() => handleGenderSelect('lelaki')}
                className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                  gender === 'lelaki'
                    ? 'bg-purple-800/90 border-amber-400 ring-4 ring-amber-400/30 scale-[1.02] shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/80 border-purple-900/80 hover:border-purple-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-400 bg-purple-950 shrink-0">
                  <img
                    src={boyAvatar}
                    alt="Pengembara Lelaki"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  {gender === 'lelaki' && (
                    <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 p-0.5 rounded-full shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white font-fun">Lelaki</p>
                  <p className="text-[11px] text-amber-300 font-medium">Pengembara Berani</p>
                </div>
              </button>

              {/* Option: Perempuan */}
              <button
                type="button"
                onClick={() => handleGenderSelect('perempuan')}
                className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                  gender === 'perempuan'
                    ? 'bg-purple-800/90 border-amber-400 ring-4 ring-amber-400/30 scale-[1.02] shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/80 border-purple-900/80 hover:border-purple-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-400 bg-purple-950 shrink-0">
                  <img
                    src={girlAvatar}
                    alt="Pengembara Perempuan"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  {gender === 'perempuan' && (
                    <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 p-0.5 rounded-full shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white font-fun">Perempuan</p>
                  <p className="text-[11px] text-amber-300 font-medium">Pengembara Pintar</p>
                </div>
              </button>

            </div>
          </div>

          {/* 2. Masukkan Nama Pengembara */}
          <div>
            <label htmlFor="student-name" className="block text-xs font-bold text-purple-200 uppercase tracking-wider mb-1.5">
              2. Masukkan Nama Anda:
            </label>
            <div className="relative">
              <input
                id="student-name"
                type="text"
                maxLength={25}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Amir, Sarah, Harith, Alya..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border-2 border-purple-700 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 text-white placeholder-slate-400 font-medium text-sm sm:text-base outline-none transition-all shadow-inner"
              />
            </div>
            <p className="text-[11px] text-amber-300/80 mt-1.5 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Nama ini akan dipaparkan sepanjang pengembaraan di Istana Cabaran!
              </span>
            </p>
          </div>

        </div>

        {/* 3 Quick Game Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl w-full mb-6 text-left">
          <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-800/60 flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-300">10 Halangan Magis</p>
              <p className="text-[11px] text-purple-200/80">Laluan berperingkat</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-800/60 flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-300">10 Kunci Emas</p>
              <p className="text-[11px] text-purple-200/80">Jawab tepat untuk buka</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-purple-950/60 border border-purple-800/60 flex items-center gap-2.5">
            <Award className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-300">100 Markah Penuh</p>
              <p className="text-[11px] text-purple-200/80">Tiada tolak mata</p>
            </div>
          </div>
        </div>

        {/* Prominent Visible Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-xl">
          
          {/* MULA PENGEMBARAAN BUTTON */}
          <button
            type="button"
            onClick={handleStart}
            className="w-full sm:flex-1 py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black font-fun text-lg sm:text-xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/50 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer ring-4 ring-amber-400/30"
          >
            <Play className="w-6 h-6 fill-slate-950 stroke-none" />
            <span>MULA PENGEMBARAAN</span>
          </button>

          {/* NOTA RINGKAS BUTTON */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenNotes();
            }}
            className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-purple-900/80 hover:bg-purple-800 border-2 border-purple-600 text-purple-100 font-bold font-fun text-sm sm:text-base flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-95 cursor-pointer shadow-lg"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>Nota Rujukan</span>
          </button>

        </div>

      </div>
    </div>
  );
};
