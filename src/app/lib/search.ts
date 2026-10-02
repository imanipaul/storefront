/** Terms shown under "Suggested" in the search dialog */
export const SUGGESTED_SEARCHES = ["linen", "wool overcoat", "trousers"];

type Searchable = {
  name?: string | null;
  category?: string | null;
  tags?: (string | null)[] | null;
  featured?: boolean | null;
  description?: { json: unknown } | null;
};

type RichTextNode = { value?: string; content?: RichTextNode[] };

function richTextToPlain(node: RichTextNode | undefined): string {
  if (!node) return "";
  return (node.value ?? "") + " " + (node.content ?? []).map(richTextToPlain).join(" ");
}

/**
 * Orders products by how well they match the search term: name matches first,
 * then tags and category, then description. Featured products break ties.
 */
export function rankByRelevance<T extends Searchable | null>(
  products: T[],
  term: string,
): T[] {
  const words = term.toLowerCase().split(/\s+/).filter(Boolean);
  const phrase = words.join(" ");

  const score = (p: T) => {
    if (!p) return -1;
    const name = (p.name ?? "").toLowerCase();
    const category = (p.category ?? "").toLowerCase();
    const tags = (p.tags ?? []).map((t) => (t ?? "").toLowerCase());
    const description = richTextToPlain(
      p.description?.json as RichTextNode,
    ).toLowerCase();

    let s = name.includes(phrase) ? 20 : 0;
    for (const word of words) {
      if (name.includes(word)) s += 8;
      if (tags.some((t) => t.startsWith(word))) s += 5;
      if (category.includes(word)) s += 4;
      if (description.includes(word)) s += 1;
    }
    return s + (p.featured ? 0.5 : 0);
  };

  return products
    .map((product) => ({ product, score: score(product) }))
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);
}
