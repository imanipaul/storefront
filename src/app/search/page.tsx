export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const resolvedParams = await searchParams;

  console.log("resolvedParams", resolvedParams);
  console.log("query", resolvedParams?.q);

  return <div>Search Page</div>;
}
