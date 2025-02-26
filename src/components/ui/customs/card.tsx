"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/base";

// Animation variants for the Card
const animationVariants = {
  soft: {
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 0.45,
        ease: [0.8, 0, 1, 1], // Gentle lift-off
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120, // Soft and plush
        damping: 35, // Cushioned feel
        mass: 1.5, // Heavy for softness
        duration: 0.7, // Slow and luxurious
      },
    },
  },
  smooth: {
    hidden: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.35,
        ease: [0.7, 0, 0.9, 1], // Soft fade-out
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // Fluid and seamless
        ease: [0.3, 0, 0.1, 1], // Silky curve
      },
    },
  },
  modern: {
    hidden: {
      opacity: 0,
      scale: 0.85,
      x: -30,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 350, // Sleek and dynamic
        damping: 22, // Controlled bounce
        mass: 0.7, // Light and modern
        duration: 0.45, // Quick yet refined
      },
    },
    pressed: {
      scale: 0.95, // Subtle press effect
      transition: {
        type: "spring",
        stiffness: 600, // Quick press
        damping: 20, // Soft return
        mass: 0.6, // Light for responsiveness
        duration: 0.15, // Fast press
      },
    },
  },
};

const AnimatedCard = ({ animationType = "soft", enablePressAnimation = false }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    if (animationType === "modern" && enablePressAnimation) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150); // Reset after animation
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileTap={{ scale: 0.99 }}
      animate={isPressed && animationType === "modern" ? "pressed" : "visible"}
      variants={animationVariants[animationType as keyof typeof animationVariants]}
      className="w-full max-w-md"
      onClick={handlePress}
    >
      <Card className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>A quick snapshot of your work</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This card showcases a beautifully animated entrance. Try soft, smooth, or modern styles.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline">Learn More</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Demo component with fixed animation switching
const CardDemo = () => {
  const [animation, setAnimation] = useState("soft");
  const [pressEnabled, setPressEnabled] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="flex gap-4">
        <Button onClick={() => setAnimation("soft")}>Soft</Button>
        <Button onClick={() => setAnimation("smooth")}>Smooth</Button>
        <Button onClick={() => setAnimation("modern")}>Modern</Button>
        <Button onClick={() => setPressEnabled((prev) => !prev)} variant={pressEnabled ? "default" : "outline"}>
          {pressEnabled ? "Press On" : "Press Off"}
        </Button>
      </div>
      {/* Key prop forces re-mount on animation change */}
      <AnimatedCard key={animation} animationType={animation} enablePressAnimation={pressEnabled} />
    </div>
  );
};

export default CardDemo;
