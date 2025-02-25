import { RefObject, useEffect } from "react";

export default function useClickOutside(ref: RefObject<HTMLElement | null>, handler?: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref) return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler && handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}
