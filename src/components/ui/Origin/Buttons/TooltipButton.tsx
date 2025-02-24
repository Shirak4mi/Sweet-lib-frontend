import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui";
import { Toggle } from "@/components/ui";
import { Bookmark } from "lucide-react";

import type { ReactNode } from "react";

export default function ToggleButton(): ReactNode {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            className="group size-7 p-0 hover:bg-indigo-50 hover:text-indigo-500 data-[state=on]:bg-indigo-50 data-[state=on]:text-indigo-500"
            aria-label="Bookmark this"
          >
            <Bookmark size={20} aria-hidden="true" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          {/* <p>{bookmarked ? "Remove bookmark" : "Bookmark this"}</p> */}
          <p>This is a test</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
