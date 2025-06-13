import { motion } from 'framer-motion'
import ScoreDisplay from '@/components/molecules/ScoreDisplay'
import SpeedMeter from '@/components/molecules/SpeedMeter'
import ComboDisplay from '@/components/molecules/ComboDisplay'
import Button from '@/components/atoms/Button'

function GameHUD({ gameState, onToggleKeyboard, showKeyboard }) {
  const accuracy = gameState.hits + gameState.misses > 0 
    ? Math.round((gameState.hits / (gameState.hits + gameState.misses)) * 100)
    : 100
return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute top-0 left-0 right-0 z-40 p-4"
    >
      <div className="flex justify-between items-start">
        {/* Left side - Score and combo */}
        <div className="flex flex-col gap-2">
          <ScoreDisplay score={gameState.score} highScore={gameState.highScore} />
          <ComboDisplay combo={gameState.combo} />
        </div>

        {/* Right side - Stats and controls */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <SpeedMeter speed={gameState.speed} />
            <div className="text-right text-sm">
              <div className="text-accent font-display font-bold">
                Accuracy: {accuracy}%
              </div>
              <div className="text-text/60">
                Hits: {gameState.hits} | Misses: {gameState.misses}
              </div>
            </div>
          </div>
          
          {/* Virtual Keyboard Toggle */}
          {onToggleKeyboard && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onToggleKeyboard}
              className="text-xs"
            >
              {showKeyboard ? '⌨️ Hide' : '⌨️ Show'} Keyboard
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
        </div>
      </div>
    </motion.div>
  )
}

export default GameHUD