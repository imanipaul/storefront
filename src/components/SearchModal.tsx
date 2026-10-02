"use client";

import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { formatPrice } from "@/app/lib/format";
import { SUGGESTED_SEARCHES } from "@/app/lib/search";

export type FeaturedProduct = {
  slug: string;
  name: string;
  price: number;
  imageUrl?: string;
};

export function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M20 20L15.8033 15.8033M18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C14.6421 18 18 14.6421 18 10.5Z" />
    </svg>
  );
}

export default function SearchModal({
  featured,
}: {
  featured: FeaturedProduct[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const close = () => dialogRef.current?.close();

  // Close after navigating (e.g. submitting, or picking a featured product)
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!query.trim()) {
      e.preventDefault();
      return;
    }
    close();
  };

  const searchFor = (term: string) => {
    close();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <>
      <button
        type="button"
        className="button button-tertiary button-sm px-2.5 gap-1.5 text-(--color-text-primary)"
        aria-label="Search products"
        onClick={() => dialogRef.current?.showModal()}
      >
        <SearchIcon />
        <span className="hidden sm:inline" aria-hidden="true">
          Search
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search"
        className="modal"
        onClose={() => setQuery("")}
      >
        <div className="modal-box w-11/12 max-w-2xl p-0 bg-(--color-background-primary) text-(--color-text-primary)">
          <Form
            action="/search"
            onSubmit={handleSubmit}
            className="flex items-center gap-3 px-5 py-4 border-b border-(--color-border-secondary)"
          >
            <span className="text-(--color-text-secondary)">
              <SearchIcon size={18} />
            </span>
            <input
              type="search"
              name="q"
              autoComplete="off"
              placeholder="Search products…"
              aria-label="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-[15px] outline-none placeholder:text-(--color-text-secondary) [&::-webkit-search-cancel-button]:hidden"
            />
            <kbd className="hidden sm:inline-block rounded-(--border-radius-md) border border-(--color-border-secondary) px-1.5 py-0.5 font-sans text-[11px] text-(--color-text-secondary)">
              Esc
            </kbd>
          </Form>

          <div className="px-5 py-4 border-b border-(--color-border-secondary)">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-(--color-text-secondary) mb-2">
              Suggested
            </p>
            <ul>
              {SUGGESTED_SEARCHES.map((term) => (
                <li key={term}>
                  <button
                    type="button"
                    onClick={() => searchFor(term)}
                    className="flex w-full items-center gap-3 rounded-(--border-radius-md) px-2 py-2 text-left text-sm hover:bg-(--color-background-secondary) focus-visible:bg-(--color-background-secondary)"
                  >
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-(--color-text-secondary)"
                    >
                      <path d="M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6" />
                    </svg>
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {featured.length > 0 && (
            <div className="px-5 pt-4 pb-5">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-(--color-text-secondary) mb-3">
                Featured products
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {featured.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={close}
                      className="group block"
                    >
                      <div className="relative aspect-4/5 rounded-xs overflow-hidden bg-(--color-background-secondary)">
                        {product.imageUrl && (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            sizes="160px"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        )}
                      </div>
                      <p className="mt-2 text-[13px] font-medium leading-tight">
                        {product.name}
                      </p>
                      <p className="text-xs text-(--color-text-secondary)">
                        {formatPrice(product.price)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close search">close</button>
        </form>
      </dialog>
    </>
  );
}
