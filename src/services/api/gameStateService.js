const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let gameState = {
  score: 0,
  combo: 0,
  speed: 1,
  isPlaying: false,
  hits: 0,
  misses: 0,
  highScore: parseInt(localStorage.getItem('keyRushHighScore') || '0', 10)
}

const gameStateService = {
  async getGameState() {
    await delay(50)
    return { ...gameState }
  },

  async updateGameState(updates) {
    await delay(50)
    gameState = { ...gameState, ...updates }
    
    // Update high score if current score is higher
    if (gameState.score > gameState.highScore) {
      gameState.highScore = gameState.score
      localStorage.setItem('keyRushHighScore', gameState.score.toString())
    }
    
    return { ...gameState }
  },

  async resetGame() {
    await delay(50)
    gameState = {
      ...gameState,
      score: 0,
      combo: 0,
      speed: 1,
      isPlaying: false,
      hits: 0,
      misses: 0
    }
    return { ...gameState }
  },

  async incrementScore(points = 1) {
    await delay(50)
    gameState.score += points
    gameState.hits += 1
    gameState.combo = Math.min(gameState.combo + 1, 10)
    
    // Increase speed every 10 points
    if (gameState.score % 10 === 0) {
      gameState.speed = Math.min(gameState.speed * 1.15, 3)
    }
    
    // Update high score
    if (gameState.score > gameState.highScore) {
      gameState.highScore = gameState.score
      localStorage.setItem('keyRushHighScore', gameState.score.toString())
    }
    
    return { ...gameState }
  },

  async recordMiss() {
    await delay(50)
    gameState.misses += 1
    gameState.combo = 0
    return { ...gameState }
  }
}

export default gameStateService