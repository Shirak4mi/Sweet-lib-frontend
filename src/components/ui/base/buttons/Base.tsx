import { buttonVariants } from "@/utils/variants";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/functions";

import type { IButtonProps } from "@/types/components.ts";
import type { ReactNode } from "react";

export default function Button({ className, variant, size, asChild = false, isLoading, ...props }: IButtonProps): ReactNode {
	// Component Instancing
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			className={cn(isLoading && "disabled:cursor-progress disabled:bg-amber-700", buttonVariants({ variant, size, className }))}
			disabled={isLoading || props.disabled}
			data-slot="button"
			{...props}
		/>
	);
}
