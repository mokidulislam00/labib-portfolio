"use client";

import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";

type TransitionContextType = {
  navigate: (href: string) => void;
};

const TransitionContext =
  createContext<TransitionContextType | null>(null);

export function usePageTransition() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error(
      "usePageTransition must be used inside TransitionProvider"
    );
  }

  return context;
}

export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useCallback((href: string) => {
    // Navigate normally without the animated overlay.
    window.location.assign(href);
  }, []);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}
