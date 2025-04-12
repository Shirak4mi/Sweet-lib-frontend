"use client";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, memo } from "react";
import { Link } from "@/i18n/routing";

import type { INavbarDropdownMenuProps } from "@/types/components";

function DropdownMenu({ item: { children = [] }, isOpen, onClose }: INavbarDropdownMenuProps): ReactNode {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="absolute top-full left-0 mt-1 w-48 dark:bg-gray-800 bg-white shadow-lg dark:shadow-gray-900 rounded-md overflow-hidden z-10"
					animate={{ opacity: 1, y: 0, height: "auto" }}
					initial={{ opacity: 0, y: 10, height: 0 }}
					exit={{ opacity: 0, y: 10, height: 0 }}
					transition={{ duration: 0.3 }}>
					<div className="py-2">
						{children.map(({ href, label }) => (
							<Link
								className="block px-4 py-2 text-sm dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-blue-50 dark:hover:text-white hover:text-blue-800"
								onClick={onClose}
								key={label}
								href={href}>
								{label}
							</Link>
						))}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default memo(DropdownMenu);
