import type { ReactNode } from "react";

/** Profiler Props Interface <-- Just Syntax amenities --> */
export interface IProfilerProps {
  children?: ReactNode;
  id?: string;
}

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

export interface IRSCC extends IRSC {
  className?: string;
}
