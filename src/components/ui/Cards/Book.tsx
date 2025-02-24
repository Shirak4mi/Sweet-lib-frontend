"use client";
import { BookCardVariants } from "@/utils/variants";
import { motion } from "motion/react";
import Image from "next/image";

import type { IBookCardProps } from "@/types/components";
import type { ReactNode } from "react";

export default function BookCard({ ifr, id }: IBookCardProps): ReactNode {
  return (
    <motion.div
      whileTap={{ transition: { type: "spring", stiffness: 400, damping: 17 }, scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="hover:cursor-pointer"
      transition={{ duration: 0.3 }}
      id={id.toString()}
      layout
    >
      <motion.div
        transition={{ duration: 0.5, delay: ifr ? id * 0.2 : 0 }}
        variants={BookCardVariants}
        animate="visible"
        initial="hidden"
        className={`relative overflow-hidden rounded-2xl shadow-lg ${"aspect-square"}`}
      >
        <Image src={`/placeholders/${id}.avif`} alt={`title-${id}`} fill className="object-cover" />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6"
          whileHover={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">{id}</h3>
            <p className="text-primary">{id}</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="p-6">HERE GOES TABLE DESCRIPTION</div>
    </motion.div>
  );
}
