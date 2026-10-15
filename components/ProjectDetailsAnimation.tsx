
"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: ReactNode;
};

export default function ProjectDetailsAnimation({
  children,
}: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items =
        gsap.utils.toArray<HTMLElement>(".detail-reveal");

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const images =
        gsap.utils.toArray<HTMLElement>(".detail-image");

      images.forEach((image) => {
        gsap.fromTo(
          image,
          { clipPath: "inset(8% 4% 8% 4%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: image,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: container }
  );

  return <div ref={container}>{children}</div>;
}
