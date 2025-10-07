'use client';

import { motion } from 'framer-motion';

export function CheckIcon() {
  return (
    <motion.div 
      className="relative flex-shrink-0 w-6 h-6 rounded-full overflow-hidden bg-[#FE5F01] group"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.1
      }}
    >
      {/* Check SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 scale-75"
      >
        <motion.path
          d="M6 12l4 4 8-8"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5,
            delay: 0.3,
            ease: "easeOut"
          }}
        />
      </svg>
    </motion.div>
  );
}

