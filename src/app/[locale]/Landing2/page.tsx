// File: app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/base";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, BarChart3, PieChart, Layers, Shield, Zap, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full w-10 h-10 bg-white/10 backdrop-blur-sm border-slate-200 dark:border-slate-800"
        >
          {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
        </Button>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="container max-w-6xl mx-auto" style={{ opacity, scale }}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.h1
                className="text-5xl sm:text-6xl font-bold leading-tight text-slate-900 dark:text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Simplify Your <span className="text-blue-600 dark:text-blue-400">Financial</span> Workflow
              </motion.h1>

              <motion.p
                className="text-xl text-slate-600 dark:text-slate-300 max-w-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Streamline accounting processes, gain real-time insights, and make confident financial decisions with our
                modern accounting system.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Button className="text-base px-8 py-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white rounded-xl shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transition-all">
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="text-base px-8 py-6 rounded-xl border-slate-300 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Schedule Demo
                </Button>
              </motion.div>

              <motion.div
                className="pt-4 flex items-center gap-8 text-slate-600 dark:text-slate-400"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  <span>14-day free trial</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <AnimatedDashboard />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Designed to scale with your business and simplify complex financial workflows.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: "Real-time Analytics",
                description:
                  "Get instant insights into your financial performance with customizable dashboards and reports.",
              },
              {
                icon: <Layers className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: "Multi-ledger Support",
                description: "Manage multiple companies, departments, and currencies in a unified system.",
              },
              {
                icon: <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: "Automated Workflows",
                description: "Save time with intelligent automation for recurring transactions and reconciliations.",
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: "Bank-level Security",
                description: "Enterprise-grade encryption and compliance with global financial regulations.",
              },
              {
                icon: <PieChart className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: "Expense Tracking",
                description: "Effortlessly categorize and monitor expenses with AI-powered receipt scanning.",
              },
              {
                icon: <CheckCircle2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
                title: "Tax Compliance",
                description: "Stay compliant with automated tax calculations and filing assistance.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg shadow-slate-100 dark:shadow-slate-900/50 h-full transition-all hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-slate-800 dark:border-slate-700">
                  <CardContent className="p-6 space-y-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg inline-block">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 rounded-3xl p-8 md:p-12 shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to transform your financial management?</h2>
                <p className="text-blue-100 text-lg">
                  Join thousands of businesses that have simplified their accounting and financial reporting.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="text-base px-8 py-6 bg-white text-blue-600 hover:bg-blue-50 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800 rounded-xl">
                    Get Started Today
                  </Button>
                  <Button
                    variant="outline"
                    className="text-base px-8 py-6 rounded-xl border-blue-300 dark:border-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    Contact Sales
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <motion.div
                  className="relative"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="w-full h-64 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/2 rounded-xl backdrop-blur p-6 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-medium text-white/90">Start your 14-day free trial</span>
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-300/10 rounded-full blur-xl"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// Animated Dashboard Component
function AnimatedDashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      className="relative rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Header */}
      <div className="bg-slate-900 dark:bg-black p-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="ml-4 h-6 w-48 bg-slate-700 dark:bg-slate-800 rounded-md"></div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <motion.div
            className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          ></motion.div>
          <motion.div
            className="h-10 w-24 bg-blue-500 dark:bg-blue-600 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          ></motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              className="h-24 bg-slate-100 dark:bg-slate-700 rounded-xl p-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <div className="h-4 w-16 bg-slate-200 dark:bg-slate-600 rounded-md mb-2"></div>
              <div className="h-8 w-24 bg-slate-300 dark:bg-slate-500 rounded-md"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="h-64 bg-slate-100 dark:bg-slate-700 rounded-xl mb-6"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="p-4">
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-600 rounded-md mb-4"></div>
            <div className="flex items-end h-40 pt-4">
              {[40, 70, 30, 80, 50, 60, 45].map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 mx-1 bg-blue-400 dark:bg-blue-500 rounded-t-md"
                  style={{ height: `${height}%` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.4 + i * 0.1, duration: 0.4 }}
                ></motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="h-32 bg-slate-100 dark:bg-slate-700 rounded-xl p-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-600 rounded-md mb-3"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-blue-400 dark:bg-blue-500 mr-2"></div>
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="h-32 bg-slate-100 dark:bg-slate-700 rounded-xl p-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-600 rounded-md mb-4"></div>
            <div className="relative h-20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-blue-400 dark:bg-blue-500 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white dark:bg-slate-800"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Animated Background Component
function AnimatedBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="absolute inset-0">
      {/* Gradient circles */}
      <motion.div
        className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 -right-64 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-slate-100/[0.03] dark:bg-grid-slate-700/[0.03] bg-[size:20px_20px]"></div>

      {/* Floating elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500/5 dark:bg-blue-400/5"
          style={{
            width: Math.random() * 100 + 20,
            height: Math.random() * 100 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -30 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 10 + 15,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
