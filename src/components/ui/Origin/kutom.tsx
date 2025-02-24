"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext, memo } from "react";
import type {} from "@/types/customs";

type ToastType = "default" | "success" | "error" | "info" | "warning" | "loading";
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  promise?: Promise<unknown>;
  dismissible?: boolean;
  inQueue?: boolean;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  //   promise: <T>(
  //     promise: Promise<T>,
  //     options?: {
  //       duration?: number;
  //     }
  //   ) => Promise<T>;
}

const ToastContext = createContext<ToastContextType | null>(null);

// Queue management using a ref to avoid re-renders
const useToastQueue = (maxConcurrent: number = 3) => {
  const queueRef = useRef<Toast[]>([]);
  const activeToastsRef = useRef<Set<string>>(new Set());
  const [activeToasts, setActiveToasts] = useState<Toast[]>([]);

  const processQueue = useCallback(() => {
    if (queueRef.current.length === 0) return;
    if (activeToastsRef.current.size >= maxConcurrent) return;

    const nextToast = queueRef.current[0];
    if (!nextToast) return;

    queueRef.current = queueRef.current.slice(1);
    activeToastsRef.current.add(nextToast.id);
    setActiveToasts((prev) => [...prev, { ...nextToast, inQueue: false }]);
  }, [maxConcurrent]);

  const addToQueue = useCallback(
    (toast: Toast) => {
      if (activeToastsRef.current.size < maxConcurrent) {
        activeToastsRef.current.add(toast.id);
        setActiveToasts((prev) => [...prev, toast]);
      } else {
        queueRef.current.push({ ...toast, inQueue: true });
      }
    },
    [maxConcurrent]
  );

  const removeFromActive = useCallback(
    (id: string) => {
      activeToastsRef.current.delete(id);
      setActiveToasts((prev) => prev.filter((t) => t.id !== id));
      processQueue();
    },
    [processQueue]
  );

  return { activeToasts, addToQueue, removeFromActive };
};

const LoadingSpinner = memo(() => (
  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
));

const ProgressBar = memo(({ duration, onComplete }: { duration: number; onComplete: () => void }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (duration === Infinity || !progressRef.current) return;

    const element = progressRef.current;
    const start = performance.now();
    let animationFrame: number;

    const updateProgress = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.max(0, 100 - (elapsed / duration) * 100);

      if (element) {
        element.style.width = `${progress}%`;
      }

      if (progress > 0) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        onComplete();
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [duration, onComplete]);

  if (duration === Infinity) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
      <div ref={progressRef} className="h-full bg-current opacity-30 transition-all duration-75" style={{ width: "100%" }} />
    </div>
  );
});

const ToastItem = memo(({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) => {
  const typeClasses = useMemo(
    () =>
      ({
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-500 text-white",
        loading: "bg-gray-700 text-white",
        default: "bg-gray-800 text-white",
      }[toast.type]),
    [toast.type]
  );

  return (
    <div
      role="alert"
      className={`
           ${typeClasses}
           flex items-center justify-between p-4 rounded-lg shadow-lg
           animate-in slide-in-from-right-5 duration-300
         `}
    >
      <div className="flex items-center gap-3">
        {toast.type === "loading" && <LoadingSpinner />}
        <p>{toast.message}</p>
      </div>
      {toast.dismissible !== false && (
        <button
          onClick={() => onRemove(toast.id)}
          className="ml-4 text-current opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          ×
        </button>
      )}
      <ProgressBar duration={toast.duration} onComplete={() => onRemove(toast.id)} />
    </div>
  );
});

const getPositionClasses = (position: ToastPosition): string =>
  ({
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  }[position]);

export const ToastProvider = ({
  children,
  position = "bottom-right",
  defaultDuration = 4000,
  maxConcurrent = 3,
}: {
  children: React.ReactNode;
  position?: ToastPosition;
  defaultDuration?: number;
  maxConcurrent?: number;
}) => {
  const { activeToasts, addToQueue, removeFromActive } = useToastQueue(maxConcurrent);
  const positionClasses = useMemo(() => getPositionClasses(position), [position]);

  const createToast = useCallback(
    (message: string, type: ToastType = "default", duration: number = defaultDuration) => {
      const id = Math.random().toString(36).slice(2, 9);
      addToQueue({ id, message, type, duration });
      return id;
    },
    [addToQueue, defaultDuration]
  );

  const promiseToast = useCallback(
    async <T,>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string;
        error: string;
      },
      options: { duration?: number } = {}
    ): Promise<T> => {
      const toastId = createToast(messages.loading, "loading", Infinity);

      try {
        const result = await promise;
        removeFromActive(toastId);
        createToast(messages.success, "success", options.duration);
        return result;
      } catch (error) {
        removeFromActive(toastId);
        createToast(messages.error, "error", options.duration);
        throw error;
      }
    },
    [createToast, removeFromActive]
  );

  const contextValue = useMemo(
    () => ({
      toast: createToast,
      success: (message: string, duration?: number) => createToast(message, "success", duration),
      error: (message: string, duration?: number) => createToast(message, "error", duration),
      info: (message: string, duration?: number) => createToast(message, "info", duration),
      warning: (message: string, duration?: number) => createToast(message, "warning", duration),
      promise: promiseToast,
    }),
    [createToast, promiseToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className={`fixed z-50 flex flex-col gap-2 min-w-[300px] max-w-md ${positionClasses}`} aria-live="polite">
        {activeToasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeFromActive} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;
