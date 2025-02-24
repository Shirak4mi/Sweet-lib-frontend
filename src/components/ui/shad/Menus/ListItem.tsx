import { NavigationMenuLink } from "@/components/ui/shad/Menus/NavigationMenu";
import { HTMLMotionProps, motion } from "motion/react";
import { type ReactNode, forwardRef } from "react";
import { cn } from "@/utils/functions";

const ListItem = forwardRef<HTMLAnchorElement, HTMLMotionProps<"a">>(
  ({ className, title, children, ...props }, ref): ReactNode => {
    const baseClassName =
      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";

    return (
      <li>
        <NavigationMenuLink asChild>
          <motion.a
            className={cn(baseClassName, className)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            ref={ref}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children as ReactNode}</p>
          </motion.a>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

export { ListItem };
