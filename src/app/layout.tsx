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
      <body className="min-h-full flex flex-col pl-8 pr-8">
        <header className="flex flex-row w-full pt-8 pb-8 items-center">
          <Link href={"/"} className="font-bold pr-6 text-3xl">
            Shoppe
          </Link>
          <div className="flex justify-between pl-10 text-l">
            <Link href={"/"} className="pr-8 border-r border-white">
              All Products
            </Link>
            {data?.collectionCollection?.items.map((item) => {
              return (
                <Link
                  key={item?.slug}
                  href={`/collections/${item?.slug}`}
                  className="pl-8 pr-10"
                >
                  {item?.title}
                </Link>
              );
            })}
          </div>
          <div className={"flex ml-auto"}>
            <button
              className={"min-w-10 mr-6 border-1 border-white rounded-sm p-3"}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M20 20L15.8033 15.8033M18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C14.6421 18 18 14.6421 18 10.5Z"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <button className={"min-w-10 border-1 border-white rounded-sm p-3"}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11M8 8H16C19 8 20 11.8899 20 13.5C20 19.5259 18.3966 20.5 12 20.5C5.60338 20.5 4 19.5259 4 13.5C4 11.8899 5 8 8 8Z"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </button>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
