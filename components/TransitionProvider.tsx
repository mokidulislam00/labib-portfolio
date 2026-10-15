
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

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
  const router = useRouter();
  const pathname = usePathname();

  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);

  const previousPathRef = useRef(pathname);
  const navigatingRef = useRef(false);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const navigationTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearNavigationTimeout = useCallback(() => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
  }, []);

  const resetOverlay = useCallback(() => {
    timelineRef.current?.kill();
    timelineRef.current = null;

    clearNavigationTimeout();

    const overlay = overlayRef.current;

    if (overlay) {
      gsap.set(overlay, {
        yPercent: 100,
        autoAlpha: 1,
      });
    }

    gsap.set(
      [brandRef.current, lineRef.current, captionRef.current],
      { clearProps: "all" }
    );

    navigatingRef.current = false;
  }, [clearNavigationTimeout]);

  const navigate = useCallback(
    (href: string) => {
      // Prevent duplicate clicks during an active transition.
      if (navigatingRef.current) return;

      const destination = new URL(href, window.location.href);

      // External URLs should use normal browser navigation.
      if (destination.origin !== window.location.origin) {
        window.location.assign(href);
        return;
      }

      // Same page: allow normal hash scrolling when applicable.
      if (
        destination.pathname === pathname &&
        destination.search === window.location.search &&
        destination.hash
      ) {
        window.location.assign(href);
        return;
      }

      // Already on the exact destination.
      if (
        destination.pathname === pathname &&
        destination.search === window.location.search &&
        destination.hash === window.location.hash
      ) {
        return;
      }

      const overlay = overlayRef.current;

      // If the overlay is missing, navigate without animation.
      if (!overlay) {
        router.push(href);
        return;
      }

      navigatingRef.current = true;
      clearNavigationTimeout();

      timelineRef.current?.kill();
      timelineRef.current = null;

      gsap.killTweensOf([
        overlay,
        brandRef.current,
        lineRef.current,
        captionRef.current,
      ]);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        router.push(href);
        navigationTimeoutRef.current = setTimeout(
          resetOverlay,
          3000
        );
        return;
      }

      gsap.set(overlay, {
        yPercent: 100,
        autoAlpha: 1,
      });

      gsap.set(brandRef.current, {
        autoAlpha: 0,
        y: 15,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(captionRef.current, {
        autoAlpha: 0,
        y: 8,
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          // Start route navigation after the curtain arrives.
          router.push(href);

          // Recover if the route never changes.
          navigationTimeoutRef.current = setTimeout(() => {
            if (window.location.pathname !== destination.pathname) {
              resetOverlay();
            }
          }, 4000);
        },
      });

      timelineRef.current = timeline;

      timeline.to(overlay, {
        yPercent: 0,
        duration: 0.65,
        ease: "power4.inOut",
      });

      timeline.to(
        brandRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        },
        "-=0.3"
      );

      timeline.to(
        captionRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );

      timeline.to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.4,
          ease: "power3.inOut",
        },
        "-=0.15"
      );
    },
    [
      pathname,
      router,
      clearNavigationTimeout,
      resetOverlay,
    ]
  );

  // Set the initial overlay position.
  useEffect(() => {
    const overlay = overlayRef.current;

    if (!overlay) return;

    gsap.set(overlay, {
      yPercent: 100,
      autoAlpha: 1,
    });

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;

      clearNavigationTimeout();

      gsap.killTweensOf([
        overlay,
        brandRef.current,
        lineRef.current,
        captionRef.current,
      ]);
    };
  }, [clearNavigationTimeout]);

  // Reveal the page whenever the route changes.
  useEffect(() => {
    if (previousPathRef.current === pathname) return;

    previousPathRef.current = pathname;

    const overlay = overlayRef.current;

    clearNavigationTimeout();

    timelineRef.current?.kill();
    timelineRef.current = null;

    if (!overlay) {
      navigatingRef.current = false;
      return;
    }

    gsap.killTweensOf([
      overlay,
      brandRef.current,
      lineRef.current,
      captionRef.current,
    ]);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      resetOverlay();
      return;
    }

    gsap.set(overlay, {
      yPercent: 0,
      autoAlpha: 1,
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, {
          yPercent: 100,
          autoAlpha: 1,
        });

        gsap.set(
          [brandRef.current, lineRef.current, captionRef.current],
          { clearProps: "all" }
        );

        timelineRef.current = null;
        navigatingRef.current = false;
      },
    });

    timelineRef.current = timeline;

    timeline.to(overlay, {
      yPercent: -100,
      duration: 0.75,
      ease: "power4.inOut",
    });

    // Animate incoming page sections.
    const main = document.querySelector("main");

    const pageItems = main?.querySelectorAll(
      ":scope > section, :scope > div"
    );

    if (pageItems?.length) {
      gsap.fromTo(
        pageItems,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.12,
          clearProps: "opacity,visibility,transform",
        }
      );
    }
  }, [
    pathname,
    clearNavigationTimeout,
    resetOverlay,
  ]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      <div
        ref={overlayRef}
        aria-hidden="true"
        className="page-transition-overlay"
      >
        <div className="transition-overlay-inner">
          <span
            ref={brandRef}
            className="transition-brand"
          >
            LABIB
            <span className="transition-brand-mark">®</span>
          </span>

          <span
            ref={lineRef}
            className="transition-line"
          />

          <span
            ref={captionRef}
            className="transition-caption"
          >
            DESIGNING THE DIGITAL
          </span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
