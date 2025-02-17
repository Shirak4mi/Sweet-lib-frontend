import type { AlertType } from "@/types";
import type { ReactNode } from "react";

export default function AlertTypeBasedIcon({ Type }: { Type: AlertType }): ReactNode {
  switch (Type) {
    case "info":
      return <></>;
    case "danger":
      return <></>;
    case "success":
      return <></>;
  }
}
