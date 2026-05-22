import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pl-4 pr-4">
        <header className="flex flex-row w-full  justify-between pt-4 pb-4">
          <h1>Shoppe</h1>
          <div className="flex justify-between w-1/2">
            <Link href={"/"}>Tops</Link>
            <Link href={"/"}>Bottoms</Link>
            <Link href={"/"}>Accessories</Link>
          </div>
          <button>Cart</button>
        </header>

        {children}
      </body>
    </html>
  );
}
