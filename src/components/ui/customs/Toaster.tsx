import React, { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext, memo } from "react";

// Types
type ToastType = "default" | "success" | "error" | "info" | "warning" | "loading";
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
  dismissible?: boolean;
  inQueue?: boolean;
}

interface ToastOptions {
  duration?: number;
  dismissible?: boolean;
}

// Create an event emitter to handle toast events
type ToastEvent = {
  type: "add" | "remove";
  toast?: Toast;
  id?: string;
};

class ToastEmitter {
  private listeners: Set<(event: ToastEvent) => void> = new Set();

  emit(event: ToastEvent) {
    this.listeners.forEach(listener => listener(event));
  }

  subscribe(listener: (event: ToastEvent) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

// Create a global instance of the emitter
const toastEmitter = new ToastEmitter();

// Toast function implementations
const createToastFunction = (defaultDuration: number = 4000) => {
  const generateId = () => Math.random().toString(36).slice(2, 9);

  const baseToast = (message: string, type: ToastType = "default", duration: number = defaultDuration, dismissible: boolean = true) => {
    const id = generateId();
    toastEmitter.emit({
      type: "add",
      toast: { id, message, type, duration, dismissible }
    });
    return id;
  };

  const toast = Object.assign(
    (message: string, options?: ToastOptions) => 
      baseToast(message, "default", options?.duration, options?.dismissible),
    {
      success: (message: string, options?: ToastOptions) => 
        baseToast(message, "success", options?.duration, options?.dismissible),
      error: (message: string, options?: ToastOptions) => 
        baseToast(message, "error", options?.duration, options?.dismissible),
      info: (message: string, options?: ToastOptions) => 
        baseToast(message, "info", options?.duration, options?.dismissible),
      warning: (message: string, options?: ToastOptions) => 
        baseToast(message, "warning", options?.duration, options?.dismissible),
      promise: async <T>(
        promise: Promise<T>,
        messages: ToastMessages,
        options: ToastOptions = {}
      ): Promise<T> => {
        const loadingId = baseToast(
          messages.loading,
          "loading",
          Infinity,
          options.dismissible ?? false
        );

        try {
          const result = await promise;
          toastEmitter.emit({ type: "remove", id: loadingId });
          baseToast(
            messages.success,
            "success",
            options.duration,
            options.dismissible
          );
          return result;
        } catch (error) {
          toastEmitter.emit({ type: "remove", id: loadingId });
          baseToast(
            messages.error,
            "error",
            options.duration,
            options.dismissible
          );
          throw error;
        }
      },
      dismiss: (id: string) => {
        toastEmitter.emit({ type: "remove", id });
      }
    }
  );

  return toast;
};

// Create the global toast instance
export const toast = createToastFunction();

// Toast Provider Component
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
  const [toasts, setToasts] = useState<Toast[]>([]);
  const queueRef = useRef<Toast[]>([]);
  const activeToastsRef = useRef<Set<string>>(new Set());

  const processQueue = useCallback(() => {
    if (queueRef.current.length === 0) return;
    if (activeToastsRef.current.size >= maxConcurrent) return;

    const nextToast = queueRef.current[0];
    if (!nextToast) return;

    queueRef.current = queueRef.current.slice(1);
    activeToastsRef.current.add(nextToast.id);
    setToasts(prev => [...prev, { ...nextToast, inQueue: false }]);
  }, [maxConcurrent]);

  const removeToast = useCallback((id: string) => {
    activeToastsRef.current.delete(id);
    setToasts(prev => prev.filter(t => t.id !== id));
    processQueue();
  }, [processQueue]);

  useEffect(() => {
    const unsubscribe = toastEmitter.subscribe((event) => {
      if (event.type === "add" && event.toast) {
        if (activeToastsRef.current.size < maxConcurrent) {
          activeToastsRef.current.add(event.toast.id);
          setToasts(prev => [...prev, event.toast]);
        } else {
          queueRef.current.push(event.toast);
        }
      } else if (event.type === "remove" && event.id) {
        removeToast(event.id);
      }
    });

    return unsubscribe;
  }, [maxConcurrent, removeToast]);

  const positionClasses = useMemo(() => ({
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  }[position]), [position]);

  return (
    <>
      {children}
      <div className={`fixed z-50 flex flex-col gap-2 min-w-[300px] max-w-md ${positionClasses}`}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`
              ${
                toast.type === "success" ? "bg-green-500" :
                toast.type === "error" ? "bg-red-500" :
                toast.type === "info" ? "bg-blue-500" :
                toast.type === "warning" ? "bg-yellow-500" :
                toast.type === "loading" ? "bg-gray-700" :
                "bg-gray-800"
              }
              text-white flex items-center justify-between p-4 rounded-lg shadow-lg
            `}
          >
            <div className="flex items-center gap-3">
              {toast.type === "loading" && (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              )}
              <p>{toast.message}</p>
            </div>
            {toast.dismissible && (
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 opacity-70 hover:opacity-100"
                aria-label="Close"
              >
                ×
              </button>
            )}
            {toast.duration !== Infinity && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                <div
                  className="h-full bg-current opacity-30 transition-all duration-75"
                  style={{ animation: `${toast.duration}ms linear shrink forwards` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
