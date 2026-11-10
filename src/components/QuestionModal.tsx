import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { QuestionItem } from '../data/questionsData';
import { sound } from '../utils/soundEffects';

interface QuestionModalProps {
  question: QuestionItem;
  checkpointNumber: number; // 1 to 10
  onAnswerCorrect: () => void;
  onContinue: () => void;
  playerName?: string;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  checkpointNumber,
  onAnswerCorrect,
  onContinue,
  playerName
}) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [wrongKey, setWrongKey] = useState<string | null>(null);
  const [shake, setShake] = useState<boolean>(false);

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isCorrect) return; // already solved

    setSelectedKey(key);
    sound.playClick();

    if (key === question.correctAnswer) {
      setIsCorrect(true);
      setWrongKey(null);
      sound.playCorrect();
      onAnswerCorrect();
    } else {
      setWrongKey(key);
      setShake(true);
      sound.playWrong();
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleContinueClick = () => {
    sound.playUnlock();
    onContinue();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-xl my-auto bg-slate-900 border-2 ${
          isCorrect ? 'border-emerald-400 shadow-emerald-500/40 ring-4 ring-emerald-500/20' : 'border-amber-400/80 shadow-amber-500/25'
        } rounded-3xl shadow-2xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto text-slate-100 ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Decorative background glows */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header: Direct Number 1 - 10 & Obstacle Name */}
        <div className="flex items-center justify-between border-b border-purple-800/60 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black font-fun flex items-center justify-center text-base shadow-md">
              {checkpointNumber}
            </span>
            <div>
              <p className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                Halangan {checkpointNumber} / 10
              </p>
              <h2 className="text-sm sm:text-base font-bold text-amber-300 font-fun">
                {question.obstacleName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/90 border border-purple-700 text-xs text-amber-300 font-bold shadow">
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>+10 Mata</span>
          </div>
        </div>

        {/* Question Statement Card */}
        <div className="mb-4 bg-purple-950/50 border border-purple-800/60 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Selesaikan Ayat di Bawah:</span>
          </p>
          <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
            {question.question}
          </p>
        </div>

        {/* 4 Answer Options (A, B, C, D) - Clearly visible, large buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-4">
          {question.options.map(option => {
            const isThisSelected = selectedKey === option.key;
            const isThisCorrect = isCorrect && option.key === question.correctAnswer;
            const isThisWrong = wrongKey === option.key;

            return (
              <button
                key={option.key}
                type="button"
                disabled={isCorrect}
                onClick={() => handleSelectOption(option.key)}
                className={`relative flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border-2 text-left font-semibold transition-all duration-150 cursor-pointer text-sm sm:text-base ${
                  isThisCorrect
                    ? 'bg-emerald-600 border-emerald-300 text-white shadow-lg shadow-emerald-600/50 scale-[1.02] ring-2 ring-emerald-200'
                    : isThisWrong
                    ? 'bg-rose-950/90 border-rose-500 text-rose-200 shadow-md'
                    : isThisSelected
                    ? 'bg-purple-800 border-amber-400 text-white'
                    : 'bg-slate-800/90 hover:bg-purple-900/70 border-slate-700 hover:border-amber-400/70 text-slate-100 hover:scale-[1.01]'
                } ${isCorrect && !isThisCorrect ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 font-fun ${
                    isThisCorrect
                      ? 'bg-emerald-200 text-emerald-950'
                      : isThisWrong
                      ? 'bg-rose-500 text-white'
                      : 'bg-purple-950 border border-purple-700 text-amber-300'
                  }`}
                >
                  {isThisCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-700" /> : option.key}
                </span>

                <span className="truncate capitalize font-semibold text-white">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* If WRONG: Show encouraging message and hint */}
        {!isCorrect && wrongKey && (
          <div className="mb-4 bg-rose-950/70 border-2 border-rose-500/80 rounded-2xl p-4 text-rose-100 animate-in fade-in slide-in-from-bottom-2 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-600/30 text-rose-300 shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5 text-amber-300" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-amber-300 text-sm sm:text-base font-fun">
                  CUBA LAGI! Jangan putus asa!
                </p>
                <p className="text-xs sm:text-sm text-rose-200">
                  <span className="font-bold text-amber-200">Petunjuk: </span>
                  {question.hint}
                </p>
                <p className="text-[11px] text-purple-200/90 pt-1">
                  Pilih jawapan yang paling tepat di atas untuk membuka halangan ini.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* If CORRECT: Show celebration, explanation, and big TERUSKAN button */}
        {isCorrect && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200 pt-1">
            <div className="bg-emerald-950/80 border-2 border-emerald-400/80 rounded-2xl p-4 text-emerald-100 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/30 text-emerald-300 shrink-0">
                  <Sparkles className="w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="font-black text-emerald-300 text-base sm:text-lg font-fun">
                      TAHNIAH{playerName ? `, ${playerName.toUpperCase()}` : ''}! Jawapan Anda Tepat!
                    </p>
                    <span className="text-xs bg-emerald-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full shadow">
                      +10 MATA
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                    {question.explanation}
                  </p>
                  <p className="text-[11px] font-bold text-amber-300 pt-0.5">
                    Kategori: {question.category}
                  </p>
                </div>
              </div>
            </div>

            {/* MANDATORY HIGH-VISIBILITY TERUSKAN BUTTON */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleContinueClick}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black font-fun text-lg sm:text-xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer ring-4 ring-amber-400/40"
              >
                <span>TERUSKAN PENGEMBARAAN</span>
                <ArrowRight className="w-6 h-6 text-slate-950 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
