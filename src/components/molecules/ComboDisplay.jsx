import { motion } from 'framer-motion'

function ComboDisplay({ combo }) {
  return (
    <motion.div
      className="inline-flex items-center px-3 py-1 bg-secondary/20 border border-secondary/50 rounded-full"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.span
        className="text-secondary font-display font-bold text-lg mr-1"
        animate={{ 
          textShadow: [
            '0 0 5px #FF00FF',
            '0 0 15px #FF00FF',
            '0 0 5px #FF00FF'
          ]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {combo}x
      </motion.span>
      <span className="text-secondary/70 font-mono text-sm">COMBO</span>
    </motion.div>
  )
}

export default ComboDisplay