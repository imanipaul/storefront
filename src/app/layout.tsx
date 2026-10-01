import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Archivo } from "next/font/google";
import "./globals.css";
import { apolloClient } from "./lib/apollo-client";
import { GetCollectionSlugsDocument } from "@/gql/graphql";
import CartBadge from "@/components/CartBadge";
import SearchModal from "@/components/SearchModal";
import MobileNav, { type NavLink } from "@/components/MobileNav";
import HeaderNav from "@/components/HeaderNav";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "./lib/format";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
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
  const navLinks = [{ href: "/", label: "Shop all" }, ...collectionLinks];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${archivo.variable} h-full antialiased`}
    >
      {/* Browser extensions (e.g. ColorZilla) add attributes to <body> before
          React hydrates; this silences those attribute-only mismatches here */}
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-(--color-background-primary) text-(--color-text-primary)">
        <header className="relative flex items-center justify-between gap-3 md:gap-8 px-5 md:px-10 py-4 border-b border-(--color-border-secondary)">
          <div className="flex items-center gap-1 md:gap-8 min-w-0">
            <MobileNav links={navLinks} />

            {/* Wordmark */}
            <Link
              href="/"
              className="type-display uppercase text-[26px] leading-none text-(--color-text-primary) shrink-0"
            >
              Shoppe
            </Link>

            <HeaderNav links={navLinks} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <SearchModal />
            <CartBadge />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 md:px-10 py-6 border-t border-(--color-border-secondary)">
          <Link
            href="/"
            className="type-display uppercase text-lg leading-none text-(--color-text-primary)"
          >
            Shoppe
          </Link>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-(--color-text-secondary)">
            {/* TODO: point these at real pages once they exist */}
            <a href="#" className="underline underline-offset-4 hover:text-(--color-text-primary)">
              Shipping &amp; returns
            </a>
            <a href="#" className="underline underline-offset-4 hover:text-(--color-text-primary)">
              Size guide
            </a>
            <a href="#" className="underline underline-offset-4 hover:text-(--color-text-primary)">
              Contact
            </a>
            <span>Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
