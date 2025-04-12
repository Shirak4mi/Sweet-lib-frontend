"use client";
import { AnimatePresence, motion } from "motion/react";
import { memo, ReactNode } from "react";
import { Link } from "@/i18n/routing";

import type { INavbarDropdownMenuProps } from "@/types/components";

function MobileDropdown({ item: { children = [] }, isOpen, onClose }: INavbarDropdownMenuProps): ReactNode {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					transition={{ duration: 0.3 }}
					exit={{ opacity: 0, height: 0 }}
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					className="dark:bg-blue-900/30 bg-blue-950/30 rounded-md mt-1 mb-2">
					{children.map(({ href, label }) => (
						<motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} key={label}>
							<Link href={href} className="block px-4 py-2 text-blue-100 hover:text-white" onClick={onClose}>
								{label}
							</Link>
						</motion.div>
					))}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default memo(MobileDropdown);
