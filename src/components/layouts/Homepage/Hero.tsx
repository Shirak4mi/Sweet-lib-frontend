"use client";
import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/base";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AnimatedHero(): ReactNode {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(() => true), []);

  return (
    <section className="overflow-hidden py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ opacity: isVisible ? 0.8 : 0, scale: isVisible ? 1 : 0.8, x: [0, 20, 0], y: [0, -20, 0] }}
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1.2 },
            x: { repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "easeInOut" },
            y: { repeat: Number.POSITIVE_INFINITY, duration: 15, ease: "easeInOut" },
          }}
        />
        <motion.div
          animate={{ opacity: isVisible ? 0.6 : 0, scale: isVisible ? 1 : 0.8, x: [0, -30, 0], y: [0, 30, 0] }}
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 1, delay: 0.3 },
            scale: { duration: 1.2, delay: 0.3 },
            x: { repeat: Number.POSITIVE_INFINITY, duration: 25, ease: "easeInOut" },
            y: { repeat: Number.POSITIVE_INFINITY, duration: 18, ease: "easeInOut" },
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Transform Your</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Digital Experience
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="max-w-md text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Elevate your online presence with our cutting-edge solutions designed to captivate your audience and drive
              meaningful engagement.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 overflow-hidden rounded-full border-2 border-background bg-muted">
                    <div className="flex h-full w-full items-center justify-center text-xs font-medium">{i}</div>
                  </div>
                ))}
              </div>
              <span>Join 10,000+ satisfied customers</span>
            </motion.div>
          </div>

          {/* Animated illustration */}
          <motion.div
            className="relative mx-auto h-[400px] w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.9,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: 0.3 },
              scale: { duration: 1, delay: 0.3 },
              y: { repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" },
            }}
          >
            <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-1 backdrop-blur-sm">
              <div className="h-full w-full rounded-xl bg-card p-6">
                <div className="flex h-full w-full flex-col items-center justify-center space-y-6 rounded-lg border border-border bg-background/50 p-8">
                  {/* Animated dashboard elements */}
                  <motion.div
                    className="h-4 w-3/4 rounded-full bg-primary/20"
                    animate={{ width: ["60%", "75%", "60%"] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut" }}
                  />

                  <div className="grid w-full grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="h-16 rounded-lg bg-muted/50"
                        initial={{ opacity: 0.5 }}
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 4 + i,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>

                  <motion.div
                    className="h-4 w-1/2 rounded-full bg-secondary/20"
                    animate={{ width: ["40%", "55%", "40%"] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
                  />

                  <motion.div
                    className="flex w-full justify-end"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/30" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
