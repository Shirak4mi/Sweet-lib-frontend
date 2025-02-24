import { cn } from "@/utils/functions";

import type { IAlertIcon, IAlertProps } from "@/types/components";
import type { ReactNode } from "react";

export default function BaseOriginAlert({ show, neon, details, type, title, action, className }: IAlertProps): ReactNode {
  const basedTypeColor = type ? "info" : type;

  return (
    show && (
      <div className={cn(neon ? "border border-border " : `border-${basedTypeColor}`, "rounded-lg  px-4 py-3", className)}>
        <div className="flex gap-3">
          <AlertTypeBasedIcon Type={basedTypeColor} />
          <div className="flex grow justify-between gap-3"></div>
        </div>
      </div>
    )
  );
}

function AlertTypeBasedIcon({ Type }: IAlertIcon): ReactNode {
  switch (Type) {
    case "info":
      return <></>;
    case "danger":
      return <></>;
    case "success":
      return <></>;
  }
}
