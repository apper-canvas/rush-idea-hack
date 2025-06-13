const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class SoundService {
  constructor() {
    this.audioContext = null
    this.sounds = {}
    this.isInitialized = false
  }

  async initialize() {
    await delay(100)
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      await this.createSounds()
      this.isInitialized = true
    } catch (error) {
      console.warn('Audio not supported:', error)
    }
  }

  async createSounds() {
    // Create hit sound (success chime)
    this.sounds.hit = this.createTone(880, 0.1, 'sine') // A5 note
    
    // Create miss sound (error buzz)
    this.sounds.miss = this.createTone(220, 0.3, 'sawtooth') // A3 note
    
    // Create combo sound
    this.sounds.combo = this.createTone(1320, 0.15, 'triangle') // E6 note
  }

  createTone(frequency, duration, type = 'sine') {
    if (!this.audioContext) return null
    
    return () => {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
      oscillator.type = type
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    }
  }

  async playHit(combo = 0) {
    if (!this.isInitialized) await this.initialize()
    
    if (this.sounds.hit) {
      this.sounds.hit()
      
      // Play combo sound for combos > 5
      if (combo > 5 && this.sounds.combo) {
        setTimeout(() => this.sounds.combo(), 50)
      }
    }
  }

  async playMiss() {
    if (!this.isInitialized) await this.initialize()
    
    if (this.sounds.miss) {
      this.sounds.miss()
    }
  }
}

const soundService = new SoundService()
export default soundService