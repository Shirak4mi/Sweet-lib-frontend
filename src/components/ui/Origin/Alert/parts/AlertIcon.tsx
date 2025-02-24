import { CheckCircle, Info, XCircle } from "@phosphor-icons/react/dist/ssr";

import type { IAlertIconProps } from "@/types/components";
import type { ReactNode } from "react";

export default function AlertIcon({ Type, size = 20 }: IAlertIconProps): ReactNode {
  switch (Type) {
    case "info":
      return <Info size={size} />;
    case "danger":
      return <XCircle size={size} />;
    case "success":
      return <CheckCircle size={size} />;
  }
}
