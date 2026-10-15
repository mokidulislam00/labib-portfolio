
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePageTransition } from "./TransitionProvider";

type LogoProps = {
  light?: boolean;
};

export default function Logo({ light = false }: LogoProps) {
  const { navigate } = usePageTransition();

  return (
    <Link
      href="/"
      aria-label="Labib - Home"
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        event.preventDefault();
        navigate("/");
      }}
      className={`group relative z-[10000] inline-flex items-center gap-3 ${
        light ? "text-[#f7f6f2]" : "text-[#20201e]"
      }`}
    >
      <span
        className="relative flex h-11 w-11 shrink-0 items-center justify-center
        border border-current transition-all duration-300
        group-hover:-rotate-6 group-hover:rounded-xl"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <path
            d="M9 7V31H22"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
          />
          <path
            d="M18 31L27 7L36 31M22 21H32"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </span>

      <span className="flex flex-col gap-1">
        <span className="flex items-center gap-1 text-xl font-semibold tracking-[-0.07em]">
          LABIB
          <ArrowUpRight
            size={13}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>

        <span className="text-[8px] font-medium uppercase tracking-[0.22em] opacity-60">
          Digital Creator
        </span>
      </span>
    </Link>
  );
}
