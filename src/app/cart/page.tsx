import { apolloClient } from "@/app/lib/apollo-client";
import { GetProductsDocument } from "@/gql/graphql";
import CartView from "./CartView";

export default async function CartPage() {
  const { data } = await apolloClient.query({
    query: GetProductsDocument,
    variables: { limit: 3, where: { featured: true } },
  });

  const suggestedProducts = data?.productCollection?.items ?? [];

  return <CartView suggestedProducts={suggestedProducts} />;
}
