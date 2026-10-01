"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "./MobileNav";

export default function HeaderNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden md:flex items-center gap-6 min-w-0">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`text-[13px] whitespace-nowrap py-1 border-b-[1.5px] transition-colors ${
              active
                ? "text-(--color-text-primary) font-medium border-(--color-text-primary)"
                : "text-(--color-text-secondary) border-transparent hover:text-(--color-text-primary)"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
