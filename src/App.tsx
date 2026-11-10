import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MainMenu } from './components/MainMenu';
import { CastleMap } from './components/CastleMap';
import { QuestionModal } from './components/QuestionModal';
import { VictoryModal } from './components/VictoryModal';
import { GrammarGuideModal } from './components/GrammarGuideModal';
import { QUESTIONS_DATA } from './data/questionsData';
import { sound } from './utils/soundEffects';
import { Footprints, BookOpen } from 'lucide-react';

import { IMAGES } from './assets/images';

export default function App() {
  const [gameState, setGameState] = useState<'MENU' | 'PLAYING' | 'VICTORY'>('MENU');
  const [playerName, setPlayerName] = useState<string>('Pengembara');
  const [playerGender, setPlayerGender] = useState<'lelaki' | 'perempuan'>('lelaki');

  const [currentCheckpointIndex, setCurrentCheckpointIndex] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [solvedCheckpoints, setSolvedCheckpoints] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const boyAvatar = IMAGES.boyAvatar;
  const girlAvatar = IMAGES.girlAvatar;
  const currentAvatar = playerGender === 'lelaki' ? boyAvatar : girlAvatar;

  // Start the adventure from Main Menu with configured name & gender
  const handleStartGame = (name: string, gender: 'lelaki' | 'perempuan') => {
    setPlayerName(name);
    setPlayerGender(gender);
    setScore(0);
    setSolvedCheckpoints([]);
    setCurrentCheckpointIndex(0);
    setShowQuestion(false);
    setGameState('PLAYING');

    // Move character smoothly along the path line to Checkpoint 1
    triggerMoveTo(0);
  };

  // Move character along path to specific checkpoint index (0-9) or finish (10)
  const triggerMoveTo = (targetIdx: number) => {
    setCurrentCheckpointIndex(targetIdx);
    setIsMoving(true);
    setShowQuestion(false);
  };

  // Called by CastleMap when character finishes walking on the line
  const handleCharacterArrived = () => {
    setIsMoving(false);
    if (currentCheckpointIndex < QUESTIONS_DATA.length) {
      sound.playClick();
      setShowQuestion(true);
    } else {
      setGameState('VICTORY');
    }
  };

  // Called when student selects the correct answer in the QuestionModal
  const handleAnswerCorrect = () => {
    if (!solvedCheckpoints.includes(currentCheckpointIndex)) {
      setScore(prev => Math.min(100, prev + 10));
      setSolvedCheckpoints(prev => [...prev, currentCheckpointIndex]);
    }
  };

  // Called when student clicks "TERUSKAN" in the QuestionModal
  const handleContinueJourney = () => {
    setShowQuestion(false);
    const nextIdx = currentCheckpointIndex + 1;
    triggerMoveTo(nextIdx);
  };

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMuted();
    setIsMuted(nextMuted);
  };

  const handlePlayAgain = () => {
    handleStartGame(playerName, playerGender);
  };

  const handleBackToMenu = () => {
    setGameState('MENU');
    setShowQuestion(false);
    setIsMoving(false);
    setCurrentCheckpointIndex(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Bar HUD */}
      <Navbar
        currentCheckpoint={solvedCheckpoints.length}
        score={score}
        keysCollected={solvedCheckpoints.length}
        isMuted={isMuted}
        playerName={gameState !== 'MENU' ? playerName : undefined}
        playerAvatar={gameState !== 'MENU' ? currentAvatar : undefined}
        onToggleMute={handleToggleMute}
        onOpenNotes={() => setShowNotes(true)}
        onResetToMenu={handleBackToMenu}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 md:p-6 flex flex-col justify-center">
        
        {/* State: Title / Main Menu */}
        {gameState === 'MENU' && (
          <MainMenu
            onStartGame={handleStartGame}
            onOpenNotes={() => setShowNotes(true)}
          />
        )}

        {/* State: Active Game Playing */}
        {gameState === 'PLAYING' && (
          <div className="w-full space-y-4">
            
            {/* Castle Adventure Interactive Map with 60fps Walking on Trail */}
            <CastleMap
              currentCheckpointIndex={currentCheckpointIndex}
              isMoving={isMoving}
              solvedCheckpoints={solvedCheckpoints}
              onCharacterArrived={handleCharacterArrived}
              activeObstacle={
                !isMoving && currentCheckpointIndex < QUESTIONS_DATA.length
                  ? QUESTIONS_DATA[currentCheckpointIndex]
                  : null
              }
              characterAvatar={currentAvatar}
              playerName={playerName}
            />

            {/* Quick Status and Actions Footer - Large, accessible buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-purple-800/60 shadow-lg text-xs sm:text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                <span className="text-purple-200 truncate">
                  {isMoving ? (
                    <span className="text-amber-300 font-bold flex items-center gap-1.5">
                      <Footprints className="w-4 h-4 text-amber-400" />
                      {playerName} sedang berjalan di atas laluan istana...
                    </span>
                  ) : currentCheckpointIndex < QUESTIONS_DATA.length ? (
                    <span>
                      Berhenti di <strong className="text-amber-300">Halangan {currentCheckpointIndex + 1}: {QUESTIONS_DATA[currentCheckpointIndex].obstacleName}</strong>.
                    </span>
                  ) : (
                    <span className="text-emerald-300 font-bold">
                      Semua halangan selesai! Pintu Istana Cabaran terbuka!
                    </span>
                  )}
                </span>
              </div>

              {/* Action buttons in footer bar - Always clearly visible */}
              <div className="flex items-center gap-2 shrink-0">
                {!showQuestion && !isMoving && currentCheckpointIndex < QUESTIONS_DATA.length && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setShowQuestion(true);
                    }}
                    className="py-2 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black font-fun shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-amber-400/50"
                  >
                    Buka Soalan Halangan
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setShowNotes(true);
                  }}
                  className="py-2 px-4 rounded-xl bg-purple-900/70 hover:bg-purple-800 text-purple-200 border border-purple-700/80 font-bold font-fun text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nota Ringkas</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* State: Victory Final Screen */}
        {gameState === 'VICTORY' && (
          <VictoryModal
            score={score}
            totalQuestions={QUESTIONS_DATA.length}
            playerName={playerName}
            playerAvatar={currentAvatar}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
          />
        )}

      </main>

      {/* POP-UP QUESTION MODAL (Visible when character arrives at checkpoint) */}
      {showQuestion && currentCheckpointIndex < QUESTIONS_DATA.length && (
        <QuestionModal
          question={QUESTIONS_DATA[currentCheckpointIndex]}
          checkpointNumber={currentCheckpointIndex + 1}
          playerName={playerName}
          onAnswerCorrect={handleAnswerCorrect}
          onContinue={handleContinueJourney}
        />
      )}

      {/* GRAMMAR REFERENCE MODAL */}
      {showNotes && (
        <GrammarGuideModal onClose={() => setShowNotes(false)} />
      )}

      {/* Educational footer */}
      <footer className="py-2.5 px-4 border-t border-purple-950/80 text-center text-xs text-purple-400/60">
        Misi 3: Istana Cabaran · Bahasa Melayu Sekolah Rendah · Kata Adjektif Ukuran & Pancaindera
      </footer>

    </div>
  );
}
