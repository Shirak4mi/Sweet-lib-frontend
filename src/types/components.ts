import type { ReactNode } from "react";

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

export type AlertType = "info" | "danger" | "success";

export type IAlertIcon = { Type?: AlertType };

export interface IAlertProps {
  details?: Array<string>;
  className?: string;
  action?: Function;
  type?: AlertType;
  neon?: boolean;
  show?: boolean;
  title?: string;
}
