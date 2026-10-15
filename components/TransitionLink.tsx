
"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

export default function TransitionLink({
  href,
  children,
  ...props
}: TransitionLinkProps) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
