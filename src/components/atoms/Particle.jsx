import { motion } from 'framer-motion'

function Particle({ particle }) {
  const opacity = particle.lifetime / 30 // Fade out over lifetime
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        left: particle.x,
        top: particle.y,
        backgroundColor: particle.color,
        opacity: opacity,
        boxShadow: `0 0 ${opacity * 10}px ${particle.color}`
      }}
      initial={{ scale: 1 }}
      animate={{ 
        scale: [1, 0.5, 0],
        opacity: [opacity, opacity * 0.5, 0]
      }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  )
}

export default Particle