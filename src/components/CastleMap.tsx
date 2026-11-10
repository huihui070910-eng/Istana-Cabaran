import React, { useState, useEffect, useRef } from 'react';
import { 
  KeyRound, 
  Check, 
  Lock, 
  DoorClosed, 
  Mountain, 
  Sparkles, 
  Flame, 
  Layers, 
  Castle, 
  Footprints,
  Compass
} from 'lucide-react';
import { QUESTIONS_DATA, START_COORD, FINISH_COORD, QuestionItem } from '../data/questionsData';
import { sound } from '../utils/soundEffects';
import { IMAGES } from '../assets/images';

interface CastleMapProps {
  currentCheckpointIndex: number; // 0 to 9, or 10 for finish
  isMoving: boolean;
  solvedCheckpoints: number[];
  onCharacterArrived: () => void;
  activeObstacle?: QuestionItem | null;
  characterAvatar: string;
  playerName: string;
}

export const CastleMap: React.FC<CastleMapProps> = ({
  currentCheckpointIndex,
  isMoving,
  solvedCheckpoints,
  onCharacterArrived,
  activeObstacle,
  characterAvatar,
  playerName
}) => {
  // All points from start, 10 checkpoints, to finish inside castle
  const allCoords = [START_COORD, ...QUESTIONS_DATA.map(q => q.mapCoord), FINISH_COORD];

  // Character position state for smooth 60fps frame interpolation along path
  const [charPos, setCharPos] = useState<{ x: number; y: number }>(allCoords[0]);
  const [facingLeft, setFacingLeft] = useState<boolean>(false);
  const [stepBob, setStepBob] = useState<number>(0);

  const prevIndexRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const footstepIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Bezier curve point calculation matching SVG Q cx cy x1 y1
  const getBezierPoint = (
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    t: number
  ) => {
    const inv = 1 - t;
    return {
      x: inv * inv * p0.x + 2 * inv * t * p1.x + t * t * p2.x,
      y: inv * inv * p0.y + 2 * inv * t * p1.y + t * t * p2.y,
    };
  };

  // Animate character along the actual path segment when isMoving becomes true
  useEffect(() => {
    if (!isMoving) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (footstepIntervalRef.current) clearInterval(footstepIntervalRef.current);
      return;
    }

    const fromIdx = prevIndexRef.current;
    const toIdx = currentCheckpointIndex < 10 ? currentCheckpointIndex + 1 : 11; // 1-indexed in allCoords

    const fromCoord = allCoords[fromIdx] || allCoords[0];
    const toCoord = allCoords[toIdx] || allCoords[allCoords.length - 1];

    const cx = (fromCoord.x + toCoord.x) / 2;
    const cy = (fromCoord.y + toCoord.y) / 2;
    const ctrlCoord = { x: cx, y: cy };

    // Set facing direction
    setFacingLeft(toCoord.x < fromCoord.x);

    // Audio footsteps loop
    sound.playStep();
    footstepIntervalRef.current = setInterval(() => {
      sound.playStep();
    }, 280);

    const duration = 1800; // 1.8 seconds smooth walking along the line
    const startTime = performance.now();

    const animateWalk = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth step
      const point = getBezierPoint(fromCoord, ctrlCoord, toCoord, progress);
      setCharPos(point);
      setStepBob(Math.sin(progress * Math.PI * 12) * 5); // walking bounce

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animateWalk);
      } else {
        // Arrived at destination
        setCharPos(toCoord);
        setStepBob(0);
        prevIndexRef.current = toIdx;
        if (footstepIntervalRef.current) clearInterval(footstepIntervalRef.current);
        onCharacterArrived();
      }
    };

    animFrameRef.current = requestAnimationFrame(animateWalk);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (footstepIntervalRef.current) clearInterval(footstepIntervalRef.current);
    };
  }, [isMoving, currentCheckpointIndex]);

  // Reset character to start if currentCheckpointIndex resets to 0 and not moving
  useEffect(() => {
    if (currentCheckpointIndex === 0 && !isMoving && solvedCheckpoints.length === 0) {
      prevIndexRef.current = 0;
      setCharPos(allCoords[0]);
    }
  }, [currentCheckpointIndex, isMoving, solvedCheckpoints.length]);

  // Map obstacle type to icon
  const getObstacleIcon = (type: string, isSolved: boolean) => {
    if (isSolved) {
      return <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />;
    }
    switch (type) {
      case 'gate':
        return <DoorClosed className="w-4 h-4 text-amber-300" />;
      case 'rock':
        return <Mountain className="w-4 h-4 text-amber-200" />;
      case 'secret_door':
        return <Sparkles className="w-4 h-4 text-purple-300" />;
      case 'bridge':
        return <Layers className="w-4 h-4 text-amber-400" />;
      case 'stairs':
        return <Layers className="w-4 h-4 text-indigo-300" />;
      case 'mist':
        return <Flame className="w-4 h-4 text-cyan-300" />;
      case 'chains':
        return <Lock className="w-4 h-4 text-rose-300" />;
      case 'crystal':
        return <Sparkles className="w-4 h-4 text-yellow-300" />;
      default:
        return <Lock className="w-4 h-4 text-amber-300" />;
    }
  };

  // Build SVG path coordinate string - smooth quadratic curves between all points
  const pathD = allCoords.reduce((acc, coord, idx) => {
    if (idx === 0) return `M ${coord.x} ${coord.y}`;
    const prev = allCoords[idx - 1];
    const cx = (prev.x + coord.x) / 2;
    const cy = (prev.y + coord.y) / 2;
    return `${acc} Q ${cx} ${cy} ${coord.x} ${coord.y}`;
  }, '');

  return (
    <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] md:min-h-[520px] max-h-[75vh] rounded-3xl overflow-hidden border-2 border-purple-800/70 shadow-2xl shadow-purple-950/60 bg-slate-950 select-none">
      
      {/* Background Image: Fantasy Castle */}
      <img
        src={IMAGES.castleBackdrop}
        alt="Latar Belakang Istana Fantasi"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95 contrast-105"
      />

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

      {/* SVG Path Layer (The Glowing Castle Road) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="trailGlow" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Trail Base Cobblestone Guideline */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="1.8"
          strokeDasharray="2, 2"
        />

        {/* Glowing active animated path */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#trailGlow)"
          strokeWidth="2.2"
          filter="url(#glow)"
          strokeDasharray="3, 2"
          className="animate-pulse"
        />
      </svg>

      {/* Checkpoints Markers (1 to 10) */}
      {QUESTIONS_DATA.map((q, idx) => {
        const isSolved = solvedCheckpoints.includes(idx);
        const isCurrent = idx === currentCheckpointIndex;

        return (
          <div
            key={q.id}
            style={{
              left: `${q.mapCoord.x}%`,
              top: `${q.mapCoord.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute z-20 flex flex-col items-center group cursor-default"
          >
            {/* Visual Marker Ring */}
            <div
              className={`relative flex items-center justify-center transition-all duration-300 ${
                isSolved
                  ? 'w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-lg shadow-emerald-500/50 border-2 border-emerald-200'
                  : isCurrent
                  ? 'w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 text-slate-950 shadow-xl shadow-amber-500/80 border-2 border-white ring-4 ring-amber-400/50 animate-bounce'
                  : 'w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-900/90 text-slate-400 border border-slate-700/80 shadow-md'
              }`}
            >
              {isSolved ? (
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[3]" />
              ) : isCurrent ? (
                getObstacleIcon(q.obstacleType, false)
              ) : (
                <span className="text-[10px] sm:text-xs font-bold font-mono text-slate-400">
                  {idx + 1}
                </span>
              )}

              {/* Pulsing beacon ring for current obstacle */}
              {isCurrent && (
                <span className="absolute -inset-1 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
              )}
            </div>

            {/* Checkpoint Direct Number 1 to 10 */}
            <div
              className={`mt-1 px-2 py-0.5 rounded-full text-[11px] sm:text-xs font-bold font-fun tracking-tight whitespace-nowrap backdrop-blur-md transition-all pointer-events-none shadow-md ${
                isCurrent
                  ? 'bg-amber-400 text-slate-950 shadow-amber-400/50 scale-110 ring-2 ring-white'
                  : isSolved
                  ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/60'
                  : 'bg-slate-950/90 text-slate-300 border border-slate-700/80'
              }`}
            >
              {idx + 1}
            </div>
          </div>
        );
      })}

      {/* Start Marker */}
      <div
        style={{ left: `${START_COORD.x}%`, top: `${START_COORD.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600/90 border border-indigo-400 text-white flex items-center justify-center shadow-lg">
          <Compass className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
        </div>
        <span className="text-[9px] sm:text-[10px] font-bold text-indigo-200 bg-slate-950/80 px-1.5 rounded mt-0.5 shadow">
          Mula
        </span>
      </div>

      {/* Castle Finish Peak Marker */}
      <div
        style={{ left: `${FINISH_COORD.x}%`, top: `${FINISH_COORD.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 border-2 border-white flex items-center justify-center shadow-xl shadow-amber-400/40 animate-pulse">
          <Castle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-950" />
        </div>
        <span className="text-[9px] sm:text-[11px] font-bold text-amber-300 font-fun bg-slate-950/90 px-2 py-0.5 rounded-full border border-amber-500/40 mt-1 shadow-lg">
          Istana Cabaran
        </span>
      </div>

      {/* Animated Adventurer Character Walking Step-by-Step ON THE LINE */}
      <div
        style={{
          left: `${charPos.x}%`,
          top: `${charPos.y}%`,
          transform: `translate(-50%, -85%) translateY(${stepBob}px)`,
        }}
        className="absolute z-30 flex flex-col items-center pointer-events-none transition-none"
      >
        {/* Character speech bubble / action indicator (kept upright, no flip) */}
        <div className="mb-1 flex flex-col items-center">
          <span className="text-[10px] font-extrabold text-white bg-purple-950/90 border border-purple-500/80 px-2.5 py-0.5 rounded-full shadow-md font-fun max-w-[130px] truncate">
            {playerName || 'Pengembara'}
          </span>
          {isMoving ? (
            <div className="mt-0.5 bg-amber-400 text-slate-950 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
              <Footprints className="w-3 h-3 text-slate-900" />
              <span>Menuju Halangan {currentCheckpointIndex < 10 ? currentCheckpointIndex + 1 : 'Akhir'}...</span>
            </div>
          ) : activeObstacle ? (
            <div className="mt-0.5 bg-purple-900/90 border border-amber-400 text-amber-300 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-xl flex items-center gap-1 animate-pulse">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Halangan Tiba!</span>
            </div>
          ) : null}
        </div>

        {/* Character Avatar Sprite (Flips horizontally when walking left) */}
        <div 
          className="relative transition-transform duration-200"
          style={{ transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)' }}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-amber-400 shadow-xl overflow-hidden bg-purple-950 ring-4 ring-purple-600/40">
            <img
              src={characterAvatar}
              alt={playerName || "Watak Pengembara"}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top scale-110"
            />
          </div>
          {/* Shadow beneath character feet */}
          <div className="w-10 h-2 bg-slate-950/70 rounded-full blur-[2px] mx-auto mt-1" />
        </div>
      </div>

      {/* Floating Lower HUD Strip inside Map: Current Objective Info */}
      <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 z-20 flex items-center justify-between gap-2 p-2.5 sm:p-3 bg-slate-900/95 backdrop-blur-md border border-purple-800/60 rounded-xl text-slate-200 shadow-xl">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-purple-900/80 border border-purple-700/60 flex items-center justify-center text-amber-300 shrink-0">
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          <div className="truncate">
            <p className="text-[10px] text-purple-300 font-semibold uppercase tracking-wider">
              {currentCheckpointIndex < 10
                ? `Laluan Menuju Halangan ${currentCheckpointIndex + 1}`
                : "Semua Halangan Selesai!"}
            </p>
            <p className="text-xs sm:text-sm font-bold text-amber-300 truncate font-fun">
              {currentCheckpointIndex < 10
                ? QUESTIONS_DATA[currentCheckpointIndex]?.checkpointTitle
                : "Pintu Istana Cabaran Terbuka Luas!"}
            </p>
          </div>
        </div>

        {/* Progress Bar Mini */}
        <div className="shrink-0 flex items-center gap-2">
          <div className="w-20 sm:w-32 bg-slate-950 rounded-full h-2.5 overflow-hidden border border-purple-900">
            <div
              className="bg-gradient-to-r from-amber-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(solvedCheckpoints.length / 10) * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-purple-200 font-mono">
            {solvedCheckpoints.length}/10
          </span>
        </div>
      </div>

    </div>
  );
};
