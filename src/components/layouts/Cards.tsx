"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const cards = [
  { id: 1, title: "Web Development", content: "Create modern web applications" },
  { id: 2, title: "Mobile Apps", content: "Build cross-platform mobile apps" },
  { id: 3, title: "UI/UX Design", content: "Design intuitive user interfaces" },
  { id: 4, title: "Data Science", content: "Analyze and visualize complex data" },
];

export default function CardSection() {
  // State
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [filteredCards, setFilteredCards] = useState(cards);

  useEffect(() => {
    if ("startViewTransition" in document) document.startViewTransition(() => setIsExpanded(true));
    else setIsExpanded(() => true);

    // Set isFirstRender to false after the initial render
    const timer = setTimeout(() => setIsFirstRender(() => false), cards.length * 200 + 500);
    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      animate={{ width: isExpanded ? "100%" : "50%" }}
      transition={{ duration: 0.5 }}
      initial={{ width: "100%" }}
      className="grid gap-4"
    >
      <AnimatePresence mode="popLayout">
        {filteredCards.map(({ id, title, content }, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            key={id}
            layout
          >
            <motion.div
              transition={{ duration: 0.5, delay: isFirstRender ? idx * 0.2 : 0 }}
              className="bg-white p-6 rounded-lg shadow-md text-black"
              variants={cardVariants}
              animate="visible"
              initial="hidden"
            >
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p>{content}</p>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
