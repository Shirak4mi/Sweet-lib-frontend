import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  pathnames: {
    "/Home": "/Home",
    "/Auth/Register": "/Auth/Register",
    "/Auth/Login": "/Auth/Login",
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
export const locales = new Set(routing.locales.map((x) => ({ key: x, label: x })));
