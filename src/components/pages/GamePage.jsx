import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameCanvas from '@/components/organisms/GameCanvas'
import GameHUD from '@/components/organisms/GameHUD'
import GameOverModal from '@/components/organisms/GameOverModal'
import StartScreen from '@/components/organisms/StartScreen'
import VirtualKeyboard from '@/components/organisms/VirtualKeyboard'
import { gameStateService, soundService } from '@/services'

function GamePage() {
  const [gameState, setGameState] = useState({
    score: 0,
    combo: 0,
    speed: 1,
    isPlaying: false,
    hits: 0,
    misses: 0,
    highScore: 0
  })
  const [gameOver, setGameOver] = useState(false)
  const [showStart, setShowStart] = useState(true)
  const [fallingLetters, setFallingLetters] = useState([])
const [particles, setParticles] = useState([])
  const [screenShake, setScreenShake] = useState(false)
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const gameLoopRef = useRef()
  const letterSpawnRef = useRef()
  const canvasRef = useRef()

// Initialize game state and detect mobile
  useEffect(() => {
    const initializeGame = async () => {
      const state = await gameStateService.getGameState()
      setGameState(state)
    }
    
    // Mobile detection
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.innerWidth <= 768 && 'ontouchstart' in window)
      setIsMobile(isMobileDevice)
    }
    
    initializeGame()
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Game loop for updating falling letters and particles
  useEffect(() => {
    if (!gameState.isPlaying) return

    const gameLoop = () => {
      setFallingLetters(prev => prev.map(letter => ({
        ...letter,
        y: letter.y + letter.speed * gameState.speed
      })).filter(letter => letter.y < window.innerHeight + 50))

      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.velocityX,
        y: particle.y + particle.velocityY,
        lifetime: particle.lifetime - 1
      })).filter(particle => particle.lifetime > 0))

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.speed])

  // Letter spawning
  useEffect(() => {
    if (!gameState.isPlaying) return

    const spawnLetter = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF88', '#FF8800', '#00AAFF']
      
const newLetter = {
        id: Date.now(),
        letter: letters[Math.floor(Math.random() * letters.length)],
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: -100 - Math.random() * 200, // Random spawn distance from -100 to -300
        speed: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      }

      setFallingLetters(prev => [...prev, newLetter])
    }

    const spawnInterval = Math.max(500, 2000 - (gameState.score * 20))
    letterSpawnRef.current = setInterval(spawnLetter, spawnInterval)

    return () => {
      if (letterSpawnRef.current) {
        clearInterval(letterSpawnRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.score])

  // Check for letters that hit the bottom
  useEffect(() => {
    const bottomLetters = fallingLetters.filter(letter => letter.y > window.innerHeight - 100)
    
    if (bottomLetters.length > 0) {
      bottomLetters.forEach(() => handleMiss())
      setFallingLetters(prev => prev.filter(letter => letter.y <= window.innerHeight - 100))
    }
  }, [fallingLetters])

// Keyboard input handling
  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (!gameState.isPlaying) return

      const pressedKey = event.key.toUpperCase()
      await processKeyInput(pressedKey)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState.isPlaying, fallingLetters])

  // Process key input (both physical and virtual)
  const processKeyInput = async (pressedKey) => {
    const matchingLetter = fallingLetters.find(letter => letter.letter === pressedKey)

    if (matchingLetter) {
      // Hit!
      await handleHit(matchingLetter)
      setFallingLetters(prev => prev.filter(letter => letter.id !== matchingLetter.id))
    }
  }

  const handleHit = async (letter) => {
    const newState = await gameStateService.incrementScore(1 + gameState.combo)
    setGameState(newState)
    
    // Sound feedback
    await soundService.playHit(newState.combo)
    
    // Particle effect
    createParticles(letter.x, letter.y, letter.color, 10)
  }

  const handleMiss = async () => {
    const newState = await gameStateService.recordMiss()
    setGameState(newState)
    
    // Sound and visual feedback
    await soundService.playMiss()
    triggerScreenShake()
    
    // Check for game over (3 misses)
    if (newState.misses >= 3) {
      handleGameOver()
    }
  }

  const createParticles = (x, y, color, count) => {
    const newParticles = Array.from({ length: count }, () => ({
      x,
      y,
      velocityX: (Math.random() - 0.5) * 10,
      velocityY: (Math.random() - 0.5) * 10 - 5,
      color,
      lifetime: 30
    }))
    
    setParticles(prev => [...prev, ...newParticles])
  }

  const triggerScreenShake = () => {
    setScreenShake(true)
    setTimeout(() => setScreenShake(false), 500)
  }

  const handleGameOver = async () => {
    await gameStateService.updateGameState({ isPlaying: false })
    setGameState(prev => ({ ...prev, isPlaying: false }))
    setGameOver(true)
  }

  const startGame = async () => {
    await gameStateService.resetGame()
    const newState = await gameStateService.updateGameState({ isPlaying: true })
    setGameState(newState)
    setFallingLetters([])
    setParticles([])
    setGameOver(false)
    setShowStart(false)
  }
const restartGame = async () => {
    setGameOver(false)
    await startGame()
  }

  const toggleVirtualKeyboard = () => {
    setShowVirtualKeyboard(prev => !prev)
  }

return (
    <div className={`h-screen bg-background relative overflow-hidden ${screenShake ? 'animate-screen-shake' : ''}`}>
      {/* Game HUD */}
      <GameHUD 
        gameState={gameState} 
        onToggleKeyboard={isMobile ? toggleVirtualKeyboard : null}
        showKeyboard={showVirtualKeyboard}
      />
      
      {/* Game Canvas */}
      <GameCanvas
        ref={canvasRef}
        fallingLetters={fallingLetters}
        particles={particles}
        gameState={gameState}
      />
      
      {/* Start Screen */}
      <AnimatePresence>
        {showStart && (
          <StartScreen onStart={startGame} highScore={gameState.highScore} />
        )}
      </AnimatePresence>
      
      {/* Game Over Modal */}
      <AnimatePresence>
        {gameOver && (
          <GameOverModal
            gameState={gameState}
            onRestart={restartGame}
          />
)}
      </AnimatePresence>
      
      {/* Virtual Keyboard */}
      {isMobile && (
        <VirtualKeyboard
          isVisible={showVirtualKeyboard}
          onKeyPress={processKeyInput}
          onClose={() => setShowVirtualKeyboard(false)}
        />
      )}
    </div>
  )
}

export default GamePage