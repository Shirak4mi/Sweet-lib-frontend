import { useState, useEffect, useMemo } from "react";

const useResponsiveValues = () => {
  // Use null initially for proper SSR handling
  const [windowSize, setWindowSize] = useState<{ width: number; height: number } | null>(null);

  // useEffect for client-side only code
  useEffect(() => {
    // Variable for timeout needs to be declared outside the handler
    let resizeTimeout: NodeJS.Timer;

    // Handler to call on window resize
    const handleResize = () => {
      // Debounce resize events for better performance
      if (resizeTimeout) clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };

    // Set size at the beginning
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Use more efficient resize observer if available
    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(document.body);
      return () => resizeObserver.disconnect();
    } else {
      // Fallback to event listener
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Memoize derived values to prevent unnecessary recalculations
  return useMemo(() => {
    const isMounted = windowSize !== null;
    const width = windowSize?.width || 0;

    return {
      isMobile: isMounted && width < 768,
      isTablet: isMounted && width >= 768 && width < 1024,
      isDesktop: isMounted && width >= 1024,
      windowSize: windowSize || { width: 0, height: 0 },
      isMounted,
    };
  }, [windowSize]);
};

export default useResponsiveValues;
