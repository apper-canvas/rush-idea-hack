import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGesture } from 'react-use-gesture'
import Button from '@/components/atoms/Button'

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

function VirtualKeyboard({ isVisible, onKeyPress, onClose }) {
  const [pressedKey, setPressedKey] = useState(null)

  const handleKeyPress = (key) => {
    setPressedKey(key)
    onKeyPress(key)
    setTimeout(() => setPressedKey(null), 150)
  }

  const bind = useGesture({
    onTap: ({ event }) => {
      event.preventDefault()
      const key = event.target.getAttribute('data-key')
      if (key) {
        handleKeyPress(key)
      }
    }
  })

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t-2 border-primary/20 p-4 z-50"
        {...bind()}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            ✕ Close
          </Button>
        </div>

        {/* Keyboard Layout */}
        <div className="space-y-2">
          {KEYBOARD_LAYOUT.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-1"
              style={{
                paddingLeft: rowIndex === 1 ? '1rem' : rowIndex === 2 ? '2rem' : '0'
              }}
            >
              {row.map((key) => (
                <motion.button
                  key={key}
                  data-key={key}
                  className={`
                    min-w-[2.5rem] h-12 rounded-lg border-2 font-display font-bold text-sm
                    transition-all duration-150 touch-manipulation
                    ${pressedKey === key
                      ? 'bg-primary/30 border-primary scale-95 shadow-lg'
                      : 'bg-secondary/10 border-secondary/30 hover:bg-secondary/20 active:scale-95'
                    }
                    text-white shadow-md
                  `}
                  whileTap={{ scale: 0.9 }}
                  animate={pressedKey === key ? { scale: 0.95 } : { scale: 1 }}
                  onTouchStart={(e) => e.preventDefault()}
                >
                  {key}
                </motion.button>
              ))}
            </div>
          ))}
        </div>

        {/* Visual Feedback */}
        <div className="text-center mt-3 text-sm text-text/60">
          Tap letters to play • Physical keyboard also works
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default VirtualKeyboard