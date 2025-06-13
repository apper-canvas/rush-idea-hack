import { motion } from 'framer-motion'
import ScoreDisplay from '@/components/molecules/ScoreDisplay'
import SpeedMeter from '@/components/molecules/SpeedMeter'
import ComboDisplay from '@/components/molecules/ComboDisplay'

function GameHUD({ gameState }) {
  const accuracy = gameState.hits + gameState.misses > 0 
    ? Math.round((gameState.hits / (gameState.hits + gameState.misses)) * 100)
    : 100

  return (
    <motion.div
      className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start max-w-full">
        {/* Left side - Score and Combo */}
        <div className="flex flex-col space-y-2">
          <ScoreDisplay 
            score={gameState.score}
            highScore={gameState.highScore}
          />
          {gameState.combo > 1 && (
            <ComboDisplay combo={gameState.combo} />
          )}
        </div>
        
        {/* Right side - Speed and Stats */}
        <div className="flex flex-col items-end space-y-2">
          <SpeedMeter speed={gameState.speed} />
          {gameState.isPlaying && (
            <div className="text-right">
              <div className="text-sm text-primary/70 font-mono">
                Accuracy: {accuracy}%
              </div>
              <div className="text-xs text-error/70 font-mono">
                Misses: {gameState.misses}/3
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default GameHUD