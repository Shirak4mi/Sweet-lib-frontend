"use client";
import { BookCardVariants } from "@/utils/variants";
import { motion } from "motion/react";
import Image from "next/image";

import type { IBookCardProps } from "@/types/components";
import type { ReactNode } from "react";

export default function BookCard({ ifr, id }: IBookCardProps): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      id={id.toString()}
      layout
    >
      <motion.div
        transition={{ duration: 0.5, delay: ifr ? id * 0.2 : 0 }}
        variants={BookCardVariants}
        animate="visible"
        initial="hidden"
      >
        <div>
          <Image alt={"title"} className="w-full object-cover" src={`/placeholders/${id}.avif`} width={200} height={200} />
        </div>
      </motion.div>
    </motion.div>
  );
}
