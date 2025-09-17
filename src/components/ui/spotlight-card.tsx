"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function SpotlightCard({
  spotlightColor = "14, 165, 233",
  children,
  className = "",
  containerClassName = "",
  ...props
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  
  const backgroundImage = useMotionTemplate`radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, rgba(${spotlightColor}, 0.15), transparent)`;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(x);
    spotlightY.set(y);
  };
  
  return (
    <div 
      className={`group relative overflow-hidden rounded-xl ${containerClassName}`}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ backgroundImage }}
      />
      <div className={`relative z-10 ${className}`}>
        {children}
      </div>
    </div>
  );
}
