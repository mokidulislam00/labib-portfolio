
"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AdvancedAnimationsProps = {
  children: React.ReactNode;
};

export default function AdvancedAnimations({
  children,
}: AdvancedAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const container = containerRef.current;

      if (!container) return;

      // Accessibility: respect reduced-motion preference.
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const cleanupFunctions: (() => void)[] = [];

      // 1. Fade-up reveal
      const revealElements = gsap.utils.toArray<HTMLElement>(
        '[data-gsap="fade-up"]',
        container
      );

      revealElements.forEach((element) => {
        gsap.from(element, {
          y: 35,
          autoAlpha: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      // 2. Image reveal
      const imageElements = gsap.utils.toArray<HTMLElement>(
        '[data-gsap="image-reveal"]',
        container
      );

      imageElements.forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.15,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // 3. Stagger reveal for cards and lists
      const staggerContainers = gsap.utils.toArray<HTMLElement>(
        "[data-gsap-stagger]",
        container
      );

      staggerContainers.forEach((parent) => {
        const children = Array.from(parent.children).filter(
          (child): child is HTMLElement =>
            child instanceof HTMLElement
        );

        if (!children.length) return;

        gsap.from(children, {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 86%",
            once: true,
          },
        });
      });

      // 4. Scroll parallax
      const parallaxElements = gsap.utils.toArray<HTMLElement>(
        "[data-gsap-parallax]",
        container
      );

      parallaxElements.forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      // 5. Magnetic hover for buttons and links
      const magneticElements = gsap.utils.toArray<HTMLElement>(
        "[data-gsap-magnetic]",
        container
      );

      magneticElements.forEach((element) => {
        const moveX = gsap.quickTo(element, "x", {
          duration: 0.35,
          ease: "power3.out",
        });

        const moveY = gsap.quickTo(element, "y", {
          duration: 0.35,
          ease: "power3.out",
        });

        const handleMouseMove = (event: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          moveX((event.clientX - centerX) * 0.18);
          moveY((event.clientY - centerY) * 0.18);
        };

        const handleMouseLeave = () => {
          moveX(0);
          moveY(0);
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        cleanupFunctions.push(() => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        });
      });

      ScrollTrigger.refresh();

      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    },
    {
      scope: containerRef,
      dependencies: [pathname],
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
}
