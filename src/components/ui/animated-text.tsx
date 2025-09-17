"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
}

export function AnimatedText({
  text,
  className = "",
  once = true,
  delay = 0,
  duration = 0.05,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-1 inline-block"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
