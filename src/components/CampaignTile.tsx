import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

// Thin paper-colored lattice over the brand color
const lattice = [45, -45]
  .map(
    (angle) =>
      `repeating-linear-gradient(${angle}deg, color-mix(in srgb, var(--color-background-primary) 9%, transparent) 0 1px, transparent 1px 56px)`,
  )
  .join(", ");

export default function CampaignTile({
  slug,
  title,
  description,
  productCount,
}: {
  slug: string;
  title: string;
  description?: Document;
  productCount: number;
}) {
  return (
    <section
      aria-labelledby={`campaign-${slug}`}
      className="col-span-2 lg:row-span-2 flex flex-col justify-end min-h-[26rem] p-6 md:p-7 rounded-xs bg-(--color-brand) text-(--color-background-primary)"
      style={{ backgroundImage: lattice }}
    >
      <p className="text-xs font-medium opacity-80 mb-4">
        Collection · {productCount} {productCount === 1 ? "piece" : "pieces"}
      </p>
      <h2
        id={`campaign-${slug}`}
        className="type-display text-[52px] md:text-[76px] max-w-[7ch] mb-6"
      >
        {title}
      </h2>
      {description && (
        <div className="text-sm leading-relaxed max-w-sm opacity-90 mb-5 [&_p]:m-0">
          {documentToReactComponents(description)}
        </div>
      )}
      <Link
        href={`/collections/${slug}`}
        className="self-start text-sm font-medium underline underline-offset-4 decoration-1 hover:decoration-2"
      >
        Shop the edit
      </Link>
    </section>
  );
}
