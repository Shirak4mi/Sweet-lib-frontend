import { cn, getAlertType } from "@/utils/functions";
import ToggleButton from "../Buttons/TooltipButton";
import AlertIcon from "./parts/AlertIcon";

import type { IAlertProps } from "@/types/components.ts";
import type { ReactNode } from "react";

export default function BaseOriginAlert({ show, neon, details, type, title, action, className }: IAlertProps): ReactNode {
  // Constants
  const color = getAlertType(type);

  const alertCss = cn(
    neon ? `border-${color}` : "border border-border",
    "rounded-lg px-4 py-3",
    `text-${color}-600`,
    "bg-background/25 backdrop-blur supports-[backdrop-filter]:bg-background/20",
    className
  );

  return (
    show && (
      <div className={alertCss}>
        <div className="flex gap-3">
          <AlertIcon Type={type} />
          <div className={details ? "grow space-y-1" : "flex grow justify-between gap-3"}>
            <p className={details ? "text-sm font-medium" : "text-sm"}>{title}</p>
            {details && (
              <ul className="list-inside list-disc text-sm text-muted-foreground">
                {details.map((item, key) => (
                  <li key={`${item}-${key}`}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          {action && <ToggleButton />}
        </div>
      </div>
    )
  );
}
