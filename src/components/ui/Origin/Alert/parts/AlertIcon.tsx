import { CheckCircle, Circle, Info, WarningCircle, XCircle } from "@phosphor-icons/react/dist/ssr";

import type { IAlertIconProps } from "@/types/components";
import type { ReactNode } from "react";

export default function AlertIcon({ Type, size = 20, className = "" }: IAlertIconProps): ReactNode {
  switch (Type) {
    case "info":
      return <Info size={size} className={className} />;
    case "danger":
      return <XCircle size={size} className={className} />;
    case "success":
      return <CheckCircle size={size} className={className} />;
    case "warning":
      return <WarningCircle size={size} className={className} />;
    default:
      return <Circle size={size} className={className} />;
  }
}
