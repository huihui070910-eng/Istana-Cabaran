import { Volume2, VolumeX, BookOpen, KeyRound, Award, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface NavbarProps {
  currentCheckpoint: number; // 0 to 10
  score: number;
  keysCollected: number;
  isMuted: boolean;
  playerName?: string;
  playerAvatar?: string;
  onToggleMute: () => void;
  onOpenNotes: () => void;
  onResetToMenu?: () => void;
}

export function Navbar({
  currentCheckpoint,
  score,
  keysCollected,
  isMuted,
  playerName,
  playerAvatar,
  onToggleMute,
  onOpenNotes,
  onResetToMenu
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-purple-900/40 px-3 sm:px-6 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        
        {/* Zone 1: Single Brand Wordmark & Player Identity */}
        <button 
          onClick={onResetToMenu}
          className="flex items-center gap-2 text-left group cursor-pointer transition-transform hover:scale-102 shrink-0"
          title="Kembali ke Menu Utama"
        >
          {playerAvatar ? (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-purple-950 shrink-0 shadow-md">
              <img
                src={playerAvatar}
                alt={playerName || "Pengembara"}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top scale-110"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 shrink-0">
              <span className="font-fun text-lg">M3</span>
            </div>
          )}
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-amber-300 font-fun leading-tight truncate">
              {playerName ? playerName : 'Istana Cabaran'}
            </h1>
            <p className="text-[10px] text-purple-300/80 font-medium hidden sm:block truncate">
              Misi 3: Istana Cabaran
            </p>
          </div>
        </button>

        {/* Zone 2: Informational Progression / Stats */}
        <div className="flex items-center gap-1.5 sm:gap-4 md:gap-6 text-xs md:text-sm">
          {/* Halangan */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-purple-950/70 border border-purple-800/50 rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 text-purple-200">
            <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="text-purple-300/80 text-[11px] hidden sm:inline">Halangan:</span>
            <span className="font-bold text-amber-300 font-mono tabular-nums">
              {Math.min(currentCheckpoint, 10)}/10
            </span>
          </div>

          {/* Markah */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-purple-950/70 border border-purple-800/50 rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 text-purple-200">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span className="text-purple-300/80 text-[11px] hidden sm:inline">Markah:</span>
            <span className="font-bold text-emerald-300 font-mono tabular-nums">
              {score}/100
            </span>
          </div>

          {/* Kunci */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-purple-950/70 border border-purple-800/50 rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 text-purple-200">
            <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="text-purple-300/80 text-[11px] hidden md:inline">Kunci:</span>
            <span className="font-bold text-amber-400 font-mono tabular-nums">
              {keysCollected}
            </span>
          </div>
        </div>

        {/* Zone 3: Functional Interactive Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onOpenNotes();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-purple-200 bg-purple-900/60 hover:bg-purple-800/80 border border-purple-700/60 rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
            title="Buka Nota Ringkas Kata Adjektif"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Nota Rujukan</span>
          </button>

          <button
            onClick={() => {
              onToggleMute();
            }}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 transition-colors active:scale-95 cursor-pointer"
            title={isMuted ? "Aktifkan Bunyi" : "Bisu Bunyi"}
            aria-label={isMuted ? "Aktifkan Bunyi" : "Bisu Bunyi"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
