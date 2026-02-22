"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef, ReactNode } from "react";
import { useReducedMotion, useIsMobile } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface PremiumCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  glowOnHover?: boolean;
}

export const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ children, className, hoverScale = 1.01, hoverY = -4, glowOnHover = false, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const isMobile = useIsMobile();

    const shouldAnimate = !prefersReducedMotion && !isMobile;

    return (
      <motion.div
        ref={ref}
        whileHover={shouldAnimate ? { 
          scale: hoverScale, 
          y: hoverY,
        } : undefined}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          "transition-shadow duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          glowOnHover && "hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)]",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

PremiumCard.displayName = "PremiumCard";

interface PremiumButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  className?: string;
}

export const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ children, className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
        whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export function FloatingElement({ 
  children, 
  className, 
  duration = 3, 
  distance = 10 
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (prefersReducedMotion || isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface GlowPulseProps {
  children: ReactNode;
  className?: string;
}

export function GlowPulse({ children, className }: GlowPulseProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (prefersReducedMotion || isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        boxShadow: [
          "0 0 20px -5px hsl(var(--primary) / 0.2)",
          "0 0 40px -5px hsl(var(--primary) / 0.4)",
          "0 0 20px -5px hsl(var(--primary) / 0.2)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
