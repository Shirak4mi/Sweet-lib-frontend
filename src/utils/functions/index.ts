import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { AlertType } from "@/types";

export function cn(...inputs: Array<ClassValue>): string {
  return twMerge(clsx(inputs));
}

export function getAlertType(type: AlertType = "info"): string {
  switch (type) {
    case "info":
      return "default";
    case "danger":
      return "red";
    case "success":
      return "";
    default:
      return "";
  }
}
