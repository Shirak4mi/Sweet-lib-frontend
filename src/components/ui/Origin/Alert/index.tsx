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
          neon ? "border border-border" : `border-${color}`,
          "rounded-lg px-4 py-3",
          `text-${color}-600`,
          className
        )}
      >
        <div className="flex gap-3">
          <AlertIcon Type={type} />
          <div className={details ? "grow space-y-1" : "flex grow justify-between gap-3"}>
            {(details ?? []).map((item) => (
              <></>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
