import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

function StartScreen({ onStart, highScore }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center max-w-lg w-full"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div
          className="mb-8"
          animate={{ 
            textShadow: [
              '0 0 10px #00FFFF',
              '0 0 30px #00FFFF',
              '0 0 10px #00FFFF'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-black text-primary mb-4 tracking-wider">
            KEY
          </h1>
          <h1 className="text-6xl md:text-8xl font-display font-black text-secondary -mt-4 tracking-wider">
            RUSH
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-primary/70 font-mono mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Press the falling letters before they hit the bottom!
        </motion.p>

        {/* High Score */}
        {highScore > 0 && (
          <motion.div
            className="mb-8 p-4 bg-surface/50 rounded-lg border border-accent/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-accent/70 font-mono text-sm mb-1">High Score</div>
            <div className="text-accent font-display font-bold text-2xl">
              {highScore.toLocaleString()}
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          className="mb-8 space-y-3 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center text-primary/70 font-mono">
            <ApperIcon name="Keyboard" className="w-5 h-5 mr-3 text-primary" />
            Type the letters as they fall
          </div>
          <div className="flex items-center text-primary/70 font-mono">
            <ApperIcon name="Zap" className="w-5 h-5 mr-3 text-accent" />
            Build combos for bonus points
          </div>
          <div className="flex items-center text-primary/70 font-mono">
            <ApperIcon name="AlertTriangle" className="w-5 h-5 mr-3 text-error" />
            Don't let 3 letters hit the bottom
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: "spring" }}
        >
          <Button
            onClick={onStart}
            variant="primary"
            size="xl"
            className="w-full md:w-auto px-12 py-4 text-xl font-display font-bold animate-glow-pulse"
          >
            <ApperIcon name="Play" className="w-6 h-6 mr-3" />
            START GAME
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default StartScreen