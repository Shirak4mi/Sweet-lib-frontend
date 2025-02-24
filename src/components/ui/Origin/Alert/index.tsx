import { cn, getAlertType } from "@/utils/functions";
import AlertIcon from "./parts/AlertIcon";

import type { IAlertProps } from "@/types/components";
import type { ReactNode } from "react";

export default function BaseOriginAlert({ show, neon, details, type, title, action, className }: IAlertProps): ReactNode {
  // Constants
  const color = getAlertType(type);

  return (
    show && (
      <div
        className={cn(
          neon ? `border-${color}` : "border border-border",
          "rounded-lg px-4 py-3",
          `text-${color}-600`,
          className
        )}
      >
        <div className="flex gap-3">
          <AlertIcon Type={type} />
          <div className={details ? "grow space-y-1" : "flex grow justify-between gap-3"}>
            <p className={details ? "text-sm font-medium" : "text-sm"}>{title}</p>
            {details && (
              <ul className="list-inside list-disc text-sm text-muted-foreground">
                {details.map((item, key) => (
                  <li key={`${item}_${key}`}>{item}</li>
                ))}
              </ul>
            )}

            {action && (
              <a href="#" className="group whitespace-nowrap text-sm font-medium" onClick={action}>
                Link
              </a>
            )}
          </div>
        </div>
      </div>
    )
  );
}
