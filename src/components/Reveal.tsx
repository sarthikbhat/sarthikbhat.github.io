import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

type RevealProps = HTMLMotionProps<'div'> & {
  rot?: number
  delay?: number
  hover?: boolean
}

export function Reveal({
  rot = 0,
  delay = 0,
  hover = false,
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <motion.div style={{ rotate: rot }} {...rest}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.34, 1.25, 0.64, 1] }}
      whileHover={
        hover ? { y: -8, rotate: 0, transition: { duration: 0.3 } } : undefined
      }
      {...rest}
    >
      {children}
    </motion.div>
  )
}
