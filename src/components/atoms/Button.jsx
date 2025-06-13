import { motion } from 'framer-motion'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) {
  const baseClasses = "inline-flex items-center justify-center font-display font-bold rounded-full border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-primary/10 border-primary text-primary hover:bg-primary/20 hover:shadow-[0_0_20px_theme(colors.primary)] active:bg-primary/30",
    secondary: "bg-secondary/10 border-secondary text-secondary hover:bg-secondary/20 hover:shadow-[0_0_20px_theme(colors.secondary)] active:bg-secondary/30",
    accent: "bg-accent/10 border-accent text-accent hover:bg-accent/20 hover:shadow-[0_0_20px_theme(colors.accent)] active:bg-accent/30"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  }
  
  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button