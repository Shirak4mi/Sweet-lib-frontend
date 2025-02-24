import type { ComponentProps, HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { TBadgeVariants, TButtonVariants } from "@/utils/variants";
import type { HTMLMotionProps } from "motion/react";

/**
 * Interface React Server Component ( IRSC )
 *
 * This interface is just a kind of "Markup" interface,
 * this means that this interface sole purpose of existing.
 *
 * Is to be used on 'server/client' components that only that the children prop.
 */
export interface IRSC {
  children: ReactNode;
}

/**
 * Interface React Server Lnaguague Change Component ( IRSLCC )
 *
 * This interface is a implementation of the IRSC the only difference
 * between this two,
 *
 * Is that IRSLCC actualy expects a "locale" param for the reading of the "languague" in the http call
 *
 */
export interface IRSLCC extends IRSC {
  params: { locale: string };
}

/**
 * Interface React Server Component With Class ( IRSCWC )
 *
 * This is just a simple adaptation of IRSC with simple "tailwind" or "css" classes
 */
export interface IRSCWC extends IRSC {
  className?: string;
}

/** Profiler Props Interface <-- Just Syntax amenities --> */
export interface IProfilerProps {
  children?: ReactNode;
  id?: string;
}

export type AlertType = "info" | "danger" | "success" | "warning";

export type IAlertIcon = { Type?: AlertType };

export interface IAlertProps {
  action?: { func?: MouseEventHandler<HTMLAnchorElement>; label?: string };
  details?: Array<string>;
  className?: string;
  type?: AlertType;
  neon?: boolean;
  show?: boolean;
  title?: string;
}

export interface IAlertIconProps {
  className?: string;
  Type?: AlertType;
  size?: number;
}

export interface IAnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface IBookCardProps {
  /** Is First Render ( IFR ) */
  ifr?: boolean;
  id: number;
}

/* Base Component Props */

export interface IButtonProps extends ComponentProps<"button">, VariantProps<TButtonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}

export interface IAnimatedButtonProps
  extends Omit<IButtonProps, keyof HTMLMotionProps<"button">>,
    HTMLMotionProps<"button"> {
  children: ReactNode;
}

export interface IBadgeProps extends ComponentProps<"span">, TBadgeVariants {
  asChild?: boolean;
}

export interface IAnimatedBadgeProps extends Omit<IBadgeProps, keyof HTMLMotionProps<"span">>, HTMLMotionProps<"span"> {
  removeIcon?: boolean;
  children: ReactNode;
}

export interface IAnimatedAlertProps extends Omit<IAlertProps, keyof HTMLMotionProps<"div">>, HTMLMotionProps<"div"> {
  children: ReactNode;
}

export type TAlertDivProps = ComponentProps<"div">;

export interface IAnimatedAvatarProps extends HTMLMotionProps<"div"> {
  src?: string;
  alt?: string;
  fallback?: string;
  delayMs?: number;
  showRing?: boolean;
}

export interface IBaseInputProps extends ComponentProps<"input"> {}

/* Base Component Props */

/* Animated Component Props */

export interface IAnimatedNumberProps {
  value: number;
  mass?: number;
  damping?: number;
  stiffness?: number;
  precision?: number;
  format?: (value: number) => string;
  onAnimInit?: () => void;
  onAnimDone?: () => void;
}

export interface IAnimatedSkeletonProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "card" | "text" | "avatar" | "button";
  className?: string;
  shimmer?: boolean;
  pulse?: boolean;
}

/* Animated Component Props */
