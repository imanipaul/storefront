import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { apolloClient } from "./lib/apollo-client";
import { GetCollectionSlugsDocument } from "@/gql/graphql";
import CartBadge from "@/components/CartBadge";
import SearchModal from "@/components/SearchModal";
import MobileNav, { type NavLink } from "@/components/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoppe",
  description: "Sample Shopping App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await apolloClient.query({
    query: GetCollectionSlugsDocument,
  });

  const collectionLinks: NavLink[] =
    data?.collectionCollection?.items.flatMap((item) =>
      item?.slug
        ? [{ href: `/collections/${item.slug}`, label: item.title ?? item.slug }]
        : [],
    ) ?? [];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-(--color-background-primary) text-(--color-text-primary)">
        <header className="relative flex items-center justify-between px-5 py-3.5 border-b border-(--color-border-tertiary) gap-3 md:gap-6">
          <div className="flex items-center gap-1 min-w-0">
            <MobileNav
              links={[{ href: "/", label: "All products" }, ...collectionLinks]}
            />

            {/* Logo */}
            <Link
              href="/"
              className="text-base font-medium tracking-tight text-(--color-text-primary) shrink-0"
            >
              Shoppe
            </Link>
          </div>

          {/* Nav links */}
          <nav
            aria-label="Main"
            className="hidden md:flex items-center gap-1 flex-1 min-w-0"
          >
            <Link
              href="/"
              className="text-xs text-(--color-text-secondary) px-2.5 py-1.5 rounded-md whitespace-nowrap hover:bg-(--color-background-secondary) hover:text-(--color-text-primary)"
            >
              All products
            </Link>
            <div className="w-px bg-(--color-border-tertiary) self-stretch mx-1" />
            {collectionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-(--color-text-secondary) px-2.5 py-1.5 rounded-md whitespace-nowrap hover:bg-(--color-background-secondary) hover:text-(--color-text-primary)"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <SearchModal />
            <CartBadge />
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
