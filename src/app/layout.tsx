import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { apolloClient } from "./lib/apollo-client";
import { GetCollectionSlugsDocument } from "@/gql/graphql";
import CartBadge from "@/components/CartBadge";
import SearchModal from "@/components/SearchModal";

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

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-(--color-background-primary) text-(--color-text-primary)">
        <header className="flex items-center justify-between px-5 py-3.5 border-b border-(--color-border-tertiary) gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-base font-medium tracking-tight text-(--color-text-primary) shrink-0"
          >
            Shoppe
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1 flex-1">
            <Link
              href="/"
              className="text-xs text-(--color-text-secondary) px-2.5 py-1.5 rounded-md hover:bg-(--color-background-secondary) hover:text-(--color-text-primary)"
            >
              All products
            </Link>
            <div className="w-px bg-(--color-border-tertiary) self-stretch mx-1" />
            {data?.collectionCollection?.items.map((item) => (
              <Link
                key={item?.slug}
                href={`/collections/${item?.slug}`}
                className="text-xs text-(--color-text-secondary) px-2.5 py-1.5 rounded-md hover:bg-(--color-background-secondary) hover:text-(--color-text-primary)"
              >
                {item?.title}
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
