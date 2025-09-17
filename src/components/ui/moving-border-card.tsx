"use client";
import React, { useRef, useCallback } from "react";
import {
  motion,
  useSpring,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const MovingBorderCard: React.FC<{
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  color?: string;
  width?: string;
  height?: string;
  opacity?: number;
  className?: string;
}> = ({
  children,
  duration = 3000,
  rx = "0.75rem",
  ry = "0.75rem",
  color = "#3b82f6",
  width = "4rem",
  height = "4rem",
  opacity = 0.6,
  className,
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const gradientId = useRef(`border-gradient-${Math.random().toString(36).substr(2, 9)}`);

  const time = useSpring(0, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  const animate = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const speed = 1000 / duration;
    time.set(elapsed * speed);
    animationRef.current = requestAnimationFrame(animate);
  }, [time, duration]);

  React.useLayoutEffect(() => {
    startTimeRef.current = Date.now();
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const progress = useTransform(time, (val) => {
    if (!pathRef.current) return 0;
    const length = pathRef.current.getTotalLength();
    return val % length;
  });

  const x = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    return pathRef.current.getPointAtLength(val).x;
  });

  const y = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    return pathRef.current.getPointAtLength(val).y;
  });

  const angle = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    const length = pathRef.current.getTotalLength();
    const p1 = pathRef.current.getPointAtLength(val);
    const p2 = pathRef.current.getPointAtLength((val + 1) % length);
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
  });

  const transform = useMotionTemplate`
    translateX(${x}px) 
    translateY(${y}px) 
    translateX(-50%) 
    translateY(-50%) 
    rotate(${angle}deg)
  `;

  const getBackgroundStyle = (color: string) => {
    if (
      color.includes("gradient") ||
      color.includes("linear-gradient") ||
      color.includes("radial-gradient") ||
      color.includes("conic-gradient")
    ) {
      return color;
    }
    return `radial-gradient(${color} 40%, transparent 60%)`;
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div className="absolute inset-0 p-[2px] rounded-lg">
        <div className="absolute inset-0 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="absolute h-full w-full pointer-events-none"
            style={{ willChange: "auto" }}
          >
            <defs>
              <linearGradient id={gradientId.current} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.1" />
                <stop offset="50%" stopColor={color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={color} stopOpacity="0.1" />
              </linearGradient>
              <radialGradient id={`${gradientId.current}-glow`}>
                <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                <stop offset="50%" stopColor={color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect
              fill="none"
              stroke={`url(#${gradientId.current})`}
              strokeWidth="1"
              width="100%"
              height="100%"
              rx={rx}
              ry={ry}
              ref={pathRef}
              style={{ willChange: "auto" }}
            />
          </svg>
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              transform,
              willChange: "transform",
            }}
          >
            <div
              className="rounded-full"
              style={{
                height,
                width,
                opacity,
                background: `radial-gradient(circle, ${color} 0%, ${color}80 40%, transparent 70%)`,
                borderRadius: "50%",
                boxShadow: `0 0 20px ${color}40, 0 0 40px ${color}20`,
              }}
            />
          </motion.div>
        </div>
        <div className="relative w-full h-full rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export { MovingBorderCard };