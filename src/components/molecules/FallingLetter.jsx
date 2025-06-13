import { motion } from 'framer-motion'

function FallingLetter({ letter }) {
  const intensity = Math.max(0.5, 1 - (letter.y / window.innerHeight))
  
  return (
    <motion.div
      className="absolute font-display font-black text-6xl md:text-8xl pointer-events-none select-none"
      style={{
        left: letter.x,
        top: letter.y,
        color: letter.color,
        textShadow: `0 0 ${10 + intensity * 20}px ${letter.color}`,
        filter: `drop-shadow(0 0 ${5 + intensity * 15}px ${letter.color})`
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: intensity,
        rotate: [0, -2, 2, 0]
      }}
      transition={{ 
        scale: { duration: 0.3 },
        rotate: { duration: 2, repeat: Infinity }
      }}
    >
      {letter.letter}
    </motion.div>
  )
}

export default FallingLetter