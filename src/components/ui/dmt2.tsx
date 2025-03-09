"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export default function Switch2({ checked: controlledChecked, onChange, className }: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (!isControlled) setInternalChecked(newChecked);
    onChange?.(newChecked);
  };

  // Smooth, cozy animation variants for the slider
  const sliderVariants = {
    unchecked: { backgroundColor: "#f4f4f5" },
    checked: { backgroundColor: "#303136" },
  };

  // Smooth, cozy animation variants for the knob
  const knobVariants = {
    unchecked: {
      x: 0,
      background: "linear-gradient(40deg, #ff0080, #ff8c00 70%)",
      boxShadow: "none",
    },
    checked: {
      x: "1.5em", // Calculated from width - knob size - offset
      background: "#303136",
      boxShadow: "inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb",
    },
  };

  return (
    <label className={`relative inline-block w-[3.5em] h-[2em] ${className}`}>
      <input type="checkbox" checked={checked} onChange={handleChange} className="opacity-0 w-0 h-0 absolute" />
      <motion.span
        className="absolute inset-0 cursor-pointer rounded-full"
        variants={sliderVariants}
        animate={checked ? "checked" : "unchecked"}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.span
          className="absolute w-[1.4em] h-[1.4em] rounded-full top-1/2 -translate-y-1/2 left-[0.3em]"
          variants={knobVariants}
          animate={checked ? "checked" : "unchecked"}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.span>
    </label>
  );
}
