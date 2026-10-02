"use client";

import Form from "next/form";
import { type FormEvent, useRef, useState } from "react";
import { SearchIcon } from "./SearchModal";

export default function SearchField({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the field in sync when the URL's query changes (e.g. a new search from the header)
  const [lastInitial, setLastInitial] = useState(initialQuery);
  if (initialQuery !== lastInitial) {
    setLastInitial(initialQuery);
    setQuery(initialQuery);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!query.trim()) e.preventDefault();
  };

  return (
    <Form action="/search" onSubmit={handleSubmit} role="search" className="w-full">
      <div className="flex items-center gap-3 rounded-(--border-radius-md) border border-(--color-border-primary) bg-(--color-background-primary) px-4 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-(--color-accent)">
        <span className="text-(--color-text-secondary)">
          <SearchIcon size={18} />
        </span>
        <input
          ref={inputRef}
          type="search"
          name="q"
          autoComplete="off"
          placeholder="Search products…"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-0 bg-transparent py-3 text-[15px] outline-none placeholder:text-(--color-text-secondary) [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="button button-tertiary button-icon size-7 -mr-1"
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
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </Form>
  );
}
