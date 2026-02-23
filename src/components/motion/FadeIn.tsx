"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useReducedMotion, useIsMobile } from "@/hooks/useReducedMotion";

const PREMIUM_EASING = [0.22, 1, 0.36, 1] as const;

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  blur?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.9,
  className,
  direction = "up",
  distance = 30,
  once = true,
  blur = 6,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once, margin: isMobile ? "0px" : "-60px" });

  // On mobile: skip all animations, render immediately visible
  if (isMobile || prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const getInitial = () => {
    const base = { opacity: 0, filter: `blur(${blur}px)` };
    switch (direction) {
      case "up": return { ...base, y: distance };
      case "down": return { ...base, y: -distance };
      case "left": return { ...base, x: distance };
      case "right": return { ...base, x: -distance };
      case "none": return base;
      default: return { ...base, y: distance };
    }
  };

  const getAnimate = () => {
    return { opacity: 1, x: 0, y: 0, filter: "blur(0px)" };
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? getAnimate() : getInitial()}
      transition={{
        duration,
        delay,
        ease: PREMIUM_EASING as unknown as number[],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.12,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: isMobile ? "0px" : "-60px" });

  // On mobile: render children immediately without motion wrapper
  if (isMobile || prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  distance?: number;
  blur?: number;
}

export function StaggerItem({ 
  children, 
  className, 
  direction = "up",
  distance = 30,
  blur = 6,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // On mobile: render immediately without any filter/animation
  if (isMobile || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getOffset = () => {
    switch (direction) {
      case "up": return { y: distance };
      case "left": return { x: distance };
      case "right": return { x: -distance };
      default: return { y: distance };
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      filter: `blur(${blur}px)`,
      ...getOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
