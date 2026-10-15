
"use client";

import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Menu,
  X,
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";
import { projects } from "../lib/projects";
import Logo from "@/components/Logo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(".gsap-reveal", {
          autoAlpha: 1,
          y: 0,
        });

        gsap.set(".gsap-image", {
          scale: 1,
        });

        return;
      }

      // Scroll reveal animations
      const revealElements =
        gsap.utils.toArray<HTMLElement>(".gsap-reveal");

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 35,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Project image reveal
      const imageElements =
        gsap.utils.toArray<HTMLElement>(".gsap-image");

      imageElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            scale: 1.06,
          },
          {
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: root }
  );

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main
      ref={root}
      id="top"
      className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#20201e]"
    >
      
      
{/* NAVBAR */}
<header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-black/10 bg-[#f7f6f2]/90 px-6 py-4 backdrop-blur-md md:px-12">
  {/* LOGO */}
  <div onClick={closeMenu}>
    <Logo />
  </div>

  {/* DESKTOP NAVIGATION */}
  <nav className="hidden items-center gap-8 text-sm md:flex">
    {navigation.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="transition-opacity duration-300 hover:opacity-50"
      >
        {item.label}
      </a>
    ))}
  </nav>

  {/* DESKTOP CONTACT BUTTON */}
  <a
    href="#contact"
    data-magnetic
    className="hidden rounded-full border border-black/20 px-5 py-3 text-sm transition-colors duration-300 hover:bg-[#242420] hover:text-white md:block"
  >
    Let&apos;s talk ↗
  </a>

  {/* MOBILE MENU BUTTON */}
  <button
    type="button"
    aria-label={menuOpen ? "Close menu" : "Open menu"}
    aria-expanded={menuOpen}
    onClick={() => setMenuOpen((open) => !open)}
    className="flex size-11 items-center justify-center rounded-full border border-black/15 transition-colors hover:bg-black/5 md:hidden"
  >
    {menuOpen ? <X size={22} /> : <Menu size={22} />}
  </button>

  {/* MOBILE NAVIGATION */}
  {menuOpen && (
    <nav
      aria-label="Mobile navigation"
      className="absolute left-0 right-0 top-full flex flex-col gap-5 border-t border-black/10 bg-[#f7f6f2] px-6 py-7 shadow-lg md:hidden"
    >
      {navigation.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={closeMenu}
          className="text-lg transition-opacity hover:opacity-50"
        >
          {item.label} ↗
        </a>
      ))}

      <a
        href="mailto:mokidulislam00@gmail.com?subject=Portfolio%20Project"
        onClick={closeMenu}
        className="mt-2 border-t border-black/10 pt-5 text-sm"
      >
        Let&apos;s talk ↗
      </a>
    </nav>
  )}
</header>


      {/* HERO */}
      <section className="flex min-h-[78svh] flex-col justify-center px-6 py-32 md:px-12">
        <p className="gsap-reveal mb-8 text-xs tracking-[0.22em] text-[#77766f]">
          INDEPENDENT DEVELOPER &amp; CREATIVE THINKER
        </p>

        <h1 className="gsap-reveal max-w-6xl text-[15vw] font-medium leading-[0.84] tracking-[-0.085em] sm:text-[12vw] md:text-[10vw]">
          Making
          <br />
          digital things
          <br />
          <span className="text-[#96958c]">matter.</span>
        </h1>

        <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="gsap-reveal max-w-md text-base leading-7 text-[#68675f] md:text-lg">
            I design and develop thoughtful digital experiences
            that bring ideas to life through creativity,
            technology and attention to detail.
          </p>

          <a
            href="#work"
            className="gsap-reveal flex w-fit items-center gap-4 rounded-full bg-[#242420] px-6 py-4 text-sm text-white transition-colors hover:bg-[#55554d]"
          >
            Explore my work <ArrowDown size={17} />
          </a>
        </div>

        <div className="gsap-reveal mt-20 flex flex-col justify-between gap-3 border-t border-black/15 pt-5 text-[10px] tracking-[0.18em] text-[#77766f] sm:flex-row">
          <span>BASED IN BANGLADESH</span>
          <span>AVAILABLE FOR PROJECTS ↗</span>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section
        id="work"
        className="scroll-mt-8 px-6 py-20 md:px-12 md:py-28"
      >
        <div className="gsap-reveal mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs tracking-[0.2em] text-[#77766f]">
              A SELECTION OF MY WORK
            </p>

            <h2 className="text-4xl tracking-tight md:text-6xl">
              Selected works
              <span className="text-[#99988f]">.</span>
            </h2>
          </div>

          <span className="hidden text-sm text-[#77766f] sm:block">
            ( 2025 — 2026 )
          </span>
        </div>

        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 md:gap-y-14">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className={`gsap-reveal ${
                index === 2 ? "md:col-span-2" : ""
              }`}
            >
              <TransitionLink
                href={`/work/${project.slug}`}
                className="group block"
                aria-label={`View ${project.name} project`}
              >
                <div
                  className={`relative aspect-[1.25/1] overflow-hidden bg-[#e8e6df] ${
                    index === 2 ? "md:aspect-[2.05/1]" : ""
                  }`}
                >
                  <div className="gsap-image absolute inset-0">
                    <Image
                      src={project.image}
                      alt={`${project.name} project preview`}
                      fill
                      priority={index === 0}
                      sizes={
                        index === 2
                          ? "(max-width: 768px) 100vw, 90vw"
                          : "(max-width: 768px) 100vw, 45vw"
                      }
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <span className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-[#f7f6f2] transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={20} />
                  </span>

                  <span className="absolute bottom-5 left-5 bg-[#f7f6f2] px-3 py-2 text-[10px] tracking-[0.18em]">
                    PROJECT {project.number}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 py-5">
                  <div>
                    <h3 className="text-2xl tracking-tight transition-colors group-hover:text-[#77766f] md:text-3xl">
                      {project.name}
                    </h3>

                    <p className="mt-2 text-[10px] tracking-[0.16em] text-[#77766f]">
                      {project.type}
                    </p>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-[#68675f]">
                      {project.description}
                    </p>
                  </div>

                  <span className="pt-2 text-sm text-[#77766f]">
                    {project.year}
                  </span>
                </div>
              </TransitionLink>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="scroll-mt-8 border-t border-black/10 px-6 py-24 md:px-12 md:py-32"
      >
        <p className="gsap-reveal mb-8 text-xs tracking-[0.2em] text-[#77766f]">
          A LITTLE ABOUT ME
        </p>

        <h2 className="gsap-reveal max-w-5xl text-4xl leading-[1.15] tracking-tight md:text-6xl">
          I believe the best digital experiences combine
          <span className="text-[#99988f]">
            {" "}clarity, character and a little bit of magic.
          </span>
        </h2>

        <div className="gsap-reveal mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-lg leading-7 text-[#68675f]">
            I&apos;m Labib, a developer passionate about creating
            modern websites with purposeful design, smooth
            interactions and clean code.
          </p>

          <a
            href="#contact"
            className="flex w-fit items-center gap-3 border-b border-black pb-2 text-sm"
          >
            Let&apos;s work together <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="scroll-mt-8 bg-[#eae9e3] px-6 py-24 md:px-12 md:py-28"
      >
        <p className="gsap-reveal mb-10 text-xs tracking-[0.2em] text-[#77766f]">
          WHAT I CAN DO FOR YOU
        </p>

        {[
          ["01", "Web Development", "Modern, responsive websites"],
          ["02", "UI / UX Design", "Intuitive digital experiences"],
          ["03", "Creative Development", "Interactive web experiences"],
        ].map(([number, title, description]) => (
          <div
            key={number}
            className="gsap-reveal group grid gap-3 border-t border-black/20 py-7 md:grid-cols-[60px_1fr_280px] md:items-center md:gap-6"
          >
            <span className="text-xs text-[#77766f]">
              {number}
            </span>

            <h3 className="text-2xl tracking-tight transition-transform group-hover:translate-x-2 md:text-4xl">
              {title}
            </h3>

            <p className="text-sm text-[#68675f]">
              {description}
            </p>
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-8 px-6 py-28 md:px-12 md:py-36"
      >
        <p className="gsap-reveal mb-8 text-xs tracking-[0.2em] text-[#77766f]">
          HAVE A PROJECT IN MIND?
        </p>

        <h2 className="gsap-reveal max-w-5xl text-6xl leading-[0.95] tracking-[-0.07em] md:text-8xl">
          Let&apos;s make
          <br />
          something
          <br />
          <span className="text-[#99988f]">meaningful.</span>
        </h2>

        <a
          href="mailto:mokidulislam00@gmail.com?subject=Portfolio%20Project"
          className="gsap-reveal mt-10 inline-flex items-center gap-4 rounded-full bg-[#242420] px-7 py-5 text-white transition-colors hover:bg-[#55554d]"
        >
          Start a conversation <ArrowUpRight size={19} />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-col justify-between gap-5 border-t border-black/15 px-6 py-7 text-xs text-[#77766f] md:flex-row md:items-center md:px-12">
        <span>LABIB® — INDEPENDENT DEVELOPER</span>
        <span>DESIGNED WITH INTENTION © 2026</span>

        <a href="#top" className="hover:text-black">
          BACK TO TOP ↑
        </a>
      </footer>
    </main>
  );
}
