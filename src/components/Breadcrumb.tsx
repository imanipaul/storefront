import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** Page path, e.g. Home / Shop all. The last item is the current page. */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-(--color-text-secondary)">
        {items.map((item, i) => {
          const isCurrent = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isCurrent || !item.href ? (
                <span aria-current={isCurrent ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-(--color-text-primary)">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
