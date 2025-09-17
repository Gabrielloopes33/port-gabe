"use client";

import React from "react";

type GlowingBorderCardProps = {
  children: React.ReactNode;
  fromColor: string;
  toColor: string;
  className?: string;
  innerClassName?: string;
};

export default function GlowingBorderCard({
  children,
  fromColor,
  toColor,
  className = "",
  innerClassName = "",
}: GlowingBorderCardProps) {
  return (
    <div className={`relative group ${className}`}>
      <div
        className={`absolute -inset-0.5 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 bg-gradient-to-r ${fromColor} ${toColor}`}
      />
      <div className={`relative flex items-center justify-center h-full bg-card dark:bg-card rounded-lg ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
