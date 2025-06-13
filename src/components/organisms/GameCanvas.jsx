import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import FallingLetter from '@/components/molecules/FallingLetter'
import Particle from '@/components/atoms/Particle'

const GameCanvas = forwardRef(({ fallingLetters, particles, gameState }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Falling Letters */}
      {fallingLetters.map(letter => (
        <FallingLetter
          key={letter.id}
          letter={letter}
          speed={gameState.speed}
        />
      ))}
      
      {/* Particles */}
      {particles.map((particle, index) => (
        <Particle
          key={`${particle.x}-${particle.y}-${index}`}
          particle={particle}
        />
      ))}
      
      {/* Game area indicator */}
      {gameState.isPlaying && (
        <motion.div
          className="absolute bottom-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-error to-transparent opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  )
})

GameCanvas.displayName = 'GameCanvas'

export default GameCanvas