import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

function GameOverModal({ gameState, onRestart }) {
  const accuracy = gameState.hits + gameState.misses > 0 
    ? Math.round((gameState.hits / (gameState.hits + gameState.misses)) * 100)
    : 0

  const isNewHighScore = gameState.score === gameState.highScore && gameState.score > 0

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      {/* Modal */}
      <motion.div
        className="relative bg-surface border border-primary/30 rounded-lg p-6 md:p-8 max-w-md w-full neon-border"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-error/20 rounded-full mb-4"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ApperIcon name="Gamepad2" className="w-8 h-8 text-error" />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-display font-bold text-error mb-2">
            Game Over
          </h2>
          
          {isNewHighScore && (
            <motion.div
              className="text-accent font-bold text-lg animate-glow-pulse"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              🎉 New High Score! 🎉
            </motion.div>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-primary/70 font-mono">Final Score:</span>
            <span className="text-primary font-display font-bold text-xl">
              {gameState.score.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-primary/70 font-mono">High Score:</span>
            <span className="text-accent font-display font-bold">
              {gameState.highScore.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-primary/70 font-mono">Accuracy:</span>
            <span className={`font-display font-bold ${
              accuracy >= 90 ? 'text-success' : 
              accuracy >= 75 ? 'text-accent' : 'text-warning'
            }`}>
              {accuracy}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-primary/70 font-mono">Letters Hit:</span>
            <span className="text-success font-display font-bold">
              {gameState.hits}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-primary/70 font-mono">Letters Missed:</span>
            <span className="text-error font-display font-bold">
              {gameState.misses}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-3">
          <Button
            onClick={onRestart}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <ApperIcon name="RotateCcw" className="w-5 h-5 mr-2" />
            Play Again
          </Button>
          
          <Button
            onClick={() => window.location.reload()}
            variant="secondary"
            className="w-full"
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Main Menu
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GameOverModal