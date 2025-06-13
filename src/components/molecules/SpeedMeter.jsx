import { motion } from 'framer-motion'

function SpeedMeter({ speed }) {
  const normalizedSpeed = Math.min((speed - 1) / 2, 1) // Normalize to 0-1
  const color = normalizedSpeed < 0.5 ? '#00FF88' : normalizedSpeed < 0.8 ? '#FFFF00' : '#FF0044'
  
  return (
    <div className="text-right">
      <div className="text-sm text-primary/70 font-mono mb-1">Speed</div>
      
      <div className="w-24 h-2 bg-surface border border-primary/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${normalizedSpeed * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <div className="text-xs font-mono mt-1" style={{ color }}>
        {speed.toFixed(1)}x
      </div>
    </div>
  )
}

export default SpeedMeter