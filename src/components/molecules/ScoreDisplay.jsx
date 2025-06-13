import { motion } from 'framer-motion'

function ScoreDisplay({ score, highScore }) {
  return (
    <div className="text-left">
      <motion.div
        key={score}
        className="text-3xl md:text-4xl font-display font-bold text-primary neon-glow"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.2 }}
      >
        {score.toLocaleString()}
      </motion.div>
      
      <div className="text-sm text-accent/70 font-mono">
        Best: {highScore.toLocaleString()}
      </div>
    </div>
  )
}

export default ScoreDisplay