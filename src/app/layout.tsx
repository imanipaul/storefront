import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { apolloClient } from "./lib/apollo-client";
import { GetCollectionSlugsDocument } from "@/gql/graphql";

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
      <body className="min-h-full flex flex-col bg-[var(--color-background-primary)] text-[var(--color-text-primary)]">
        <header className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border-tertiary)] gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-base font-medium tracking-tight text-[var(--color-text-primary)] shrink-0"
          >
            Shoppe
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1 flex-1">
            <Link
              href="/"
              className="text-xs text-[var(--color-text-secondary)] px-2.5 py-1.5 rounded-md hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)]"
            >
              All products
            </Link>
            <div className="w-px bg-[var(--color-border-tertiary)] self-stretch mx-1" />
            {data?.collectionCollection?.items.map((item) => (
              <Link
                key={item?.slug}
                href={`/collections/${item?.slug}`}
                className="text-xs text-[var(--color-text-secondary)] px-2.5 py-1.5 rounded-md hover:bg-[var(--color-background-secondary)] hover:text-[var(--color-text-primary)]"
              >
                {item?.title}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              className="text-[var(--color-text-secondary)] p-1 flex items-center bg-transparent border-0 cursor-pointer"
              aria-label="Search"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 20L15.8033 15.8033M18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C14.6421 18 18 14.6421 18 10.5Z" />
              </svg>
            </button>
            <div className="relative">
              <Link href="/cart">
                <button
                  className="text-[var(--color-text-secondary)] p-1 flex items-center bg-transparent border-0 cursor-pointer"
                  aria-label="Cart"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11M8 8H16C19 8 20 11.8899 20 13.5C20 19.5259 18.3966 20.5 12 20.5C5.60338 20.5 4 19.5259 4 13.5C4 11.8899 5 8 8 8Z" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
