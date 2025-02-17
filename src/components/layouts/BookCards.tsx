"use client";
import { type ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import Card from "../ui/Card";

const cards = [
  { id: 1, title: "Web Development", content: "Create modern web applications" },
  { id: 2, title: "Mobile Apps", content: "Build cross-platform mobile apps" },
  { id: 3, title: "UI/UX Design", content: "Design intuitive user interfaces" },
  { id: 4, title: "Data Science", content: "Analyze and visualize complex data" },
];

export default function CardSection(): ReactNode {
  // State
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Constants
  const timer = setTimeout(() => setIsFirstRender(() => false), cards.length * 200 + 500);

  // Effects
  useEffect(() => () => clearTimeout(timer), []);

  return (
    <motion.div
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      transition={{ duration: 0.5 }}
      initial={{ width: "100%" }}
      className="grid gap-4"
    >
      <AnimatePresence mode="sync">
        {cards.map((item) => (
          <Card {...item} key={item.id} ifr={isFirstRender} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
