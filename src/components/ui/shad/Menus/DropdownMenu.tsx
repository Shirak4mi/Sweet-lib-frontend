"use client";
import { type ComponentRef, type ComponentPropsWithoutRef, type ReactNode, type HTMLAttributes, forwardRef } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/utils/functions";

export type CommonInset = {
  inset?: boolean;
};

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

type TDMST = typeof DropdownMenuPrimitive.SubTrigger;

export const DropdownMenuSubTrigger = forwardRef<ComponentRef<TDMST>, ComponentPropsWithoutRef<TDMST> & CommonInset>(
  ({ className, inset, children, ...props }, ref): ReactNode => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
);

DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

export type TDMPSC = typeof DropdownMenuPrimitive.SubContent;

export const DropdownMenuSubContent = forwardRef<ComponentRef<TDMPSC>, ComponentPropsWithoutRef<TDMPSC>>(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
);

DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

export type TDMPC = typeof DropdownMenuPrimitive.Content;

export const DropdownMenuContent = forwardRef<ComponentRef<TDMPC>, ComponentPropsWithoutRef<TDMPC>>(
  ({ className, sideOffset = 4, ...props }, ref): ReactNode => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
);

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

export type TDMPI = typeof DropdownMenuPrimitive.Item;

export const DropdownMenuItem = forwardRef<ComponentRef<TDMPI>, ComponentPropsWithoutRef<TDMPI> & CommonInset>(
  ({ className, inset, ...props }, ref): ReactNode => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
);

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export type TDMPCBI = typeof DropdownMenuPrimitive.CheckboxItem;

export const DropdownMenuCheckboxItem = forwardRef<ComponentRef<TDMPCBI>, ComponentPropsWithoutRef<TDMPCBI>>(
  ({ className, children, checked, ...props }, ref): ReactNode => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
);

DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

export type TDMPRI = typeof DropdownMenuPrimitive.RadioItem;

export const DropdownMenuRadioItem = forwardRef<ComponentRef<TDMPRI>, ComponentPropsWithoutRef<TDMPRI>>(
  ({ className, children, ...props }, ref): ReactNode => (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
);

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

export type TDMPL = typeof DropdownMenuPrimitive.Label;

export const DropdownMenuLabel = forwardRef<ComponentRef<TDMPL>, ComponentPropsWithoutRef<TDMPL> & CommonInset>(
  ({ className, inset, ...props }, ref): ReactNode => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
      {...props}
    />
  )
);

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export type TDMPMS = typeof DropdownMenuPrimitive.Separator;

export const DropdownMenuSeparator = forwardRef<ComponentRef<TDMPMS>, ComponentPropsWithoutRef<TDMPMS>>(
  ({ className, ...props }, ref): ReactNode => (
    <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
  )
);

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export const DropdownMenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>): ReactNode => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
);

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
