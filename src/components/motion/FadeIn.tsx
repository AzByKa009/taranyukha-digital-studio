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
  const isInView = useInView(ref, { once, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const shouldAnimate = !prefersReducedMotion && !isMobile;

  const getInitial = () => {
    if (!shouldAnimate) return { opacity: 0 };
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
    if (!shouldAnimate) return { opacity: 1 };
    return { opacity: 1, x: 0, y: 0, filter: "blur(0px)" };
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? getAnimate() : getInitial()}
      transition={{
        duration: shouldAnimate ? duration : 0.2,
        delay: shouldAnimate ? delay : 0,
        ease: shouldAnimate ? PREMIUM_EASING as unknown as number[] : "easeOut",
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
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
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
  const shouldAnimate = !prefersReducedMotion && !isMobile;

  const getOffset = () => {
    if (!shouldAnimate) return {};
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
      filter: shouldAnimate ? `blur(${blur}px)` : "blur(0px)",
      ...getOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldAnimate ? 0.9 : 0.2,
        ease: shouldAnimate ? [0.22, 1, 0.36, 1] : "easeOut",
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
