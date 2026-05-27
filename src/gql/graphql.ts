/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all?: Array<string | null | undefined> | null | undefined;
  id_contains_none?: Array<string | null | undefined> | null | undefined;
  id_contains_some?: Array<string | null | undefined> | null | undefined;
};

export type ContentfulMetadataConceptsFilter = {
  descendants?: ContentfulMetadataConceptsDescendantsFilter | null | undefined;
  id_contains_all?: Array<string | null | undefined> | null | undefined;
  id_contains_none?: Array<string | null | undefined> | null | undefined;
  id_contains_some?: Array<string | null | undefined> | null | undefined;
};

export type ContentfulMetadataFilter = {
  concepts?: ContentfulMetadataConceptsFilter | null | undefined;
  concepts_exists?: boolean | null | undefined;
  tags?: ContentfulMetadataTagsFilter | null | undefined;
  tags_exists?: boolean | null | undefined;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: Array<string | null | undefined> | null | undefined;
  id_contains_none?: Array<string | null | undefined> | null | undefined;
  id_contains_some?: Array<string | null | undefined> | null | undefined;
};

export type ProductFilter = {
  AND?: Array<ProductFilter | null | undefined> | null | undefined;
  OR?: Array<ProductFilter | null | undefined> | null | undefined;
  category?: string | null | undefined;
  category_contains?: string | null | undefined;
  category_exists?: boolean | null | undefined;
  category_in?: Array<string | null | undefined> | null | undefined;
  category_not?: string | null | undefined;
  category_not_contains?: string | null | undefined;
  category_not_in?: Array<string | null | undefined> | null | undefined;
  contentfulMetadata?: ContentfulMetadataFilter | null | undefined;
  description_contains?: string | null | undefined;
  description_exists?: boolean | null | undefined;
  description_not_contains?: string | null | undefined;
  featured?: boolean | null | undefined;
  featured_exists?: boolean | null | undefined;
  featured_not?: boolean | null | undefined;
  imagesCollection_exists?: boolean | null | undefined;
  name?: string | null | undefined;
  name_contains?: string | null | undefined;
  name_exists?: boolean | null | undefined;
  name_in?: Array<string | null | undefined> | null | undefined;
  name_not?: string | null | undefined;
  name_not_contains?: string | null | undefined;
  name_not_in?: Array<string | null | undefined> | null | undefined;
  price?: number | null | undefined;
  price_exists?: boolean | null | undefined;
  price_gt?: number | null | undefined;
  price_gte?: number | null | undefined;
  price_in?: Array<number | null | undefined> | null | undefined;
  price_lt?: number | null | undefined;
  price_lte?: number | null | undefined;
  price_not?: number | null | undefined;
  price_not_in?: Array<number | null | undefined> | null | undefined;
  slug?: string | null | undefined;
  slug_contains?: string | null | undefined;
  slug_exists?: boolean | null | undefined;
  slug_in?: Array<string | null | undefined> | null | undefined;
  slug_not?: string | null | undefined;
  slug_not_contains?: string | null | undefined;
  slug_not_in?: Array<string | null | undefined> | null | undefined;
  sys?: SysFilter | null | undefined;
  tags_contains_all?: Array<string | null | undefined> | null | undefined;
  tags_contains_none?: Array<string | null | undefined> | null | undefined;
  tags_contains_some?: Array<string | null | undefined> | null | undefined;
  tags_exists?: boolean | null | undefined;
  variants_exists?: boolean | null | undefined;
};

export type SysFilter = {
  firstPublishedAt?: unknown;
  firstPublishedAt_exists?: boolean | null | undefined;
  firstPublishedAt_gt?: unknown;
  firstPublishedAt_gte?: unknown;
  firstPublishedAt_in?: Array<unknown> | null | undefined;
  firstPublishedAt_lt?: unknown;
  firstPublishedAt_lte?: unknown;
  firstPublishedAt_not?: unknown;
  firstPublishedAt_not_in?: Array<unknown> | null | undefined;
  id?: string | null | undefined;
  id_contains?: string | null | undefined;
  id_exists?: boolean | null | undefined;
  id_in?: Array<string | null | undefined> | null | undefined;
  id_not?: string | null | undefined;
  id_not_contains?: string | null | undefined;
  id_not_in?: Array<string | null | undefined> | null | undefined;
  publishedAt?: unknown;
  publishedAt_exists?: boolean | null | undefined;
  publishedAt_gt?: unknown;
  publishedAt_gte?: unknown;
  publishedAt_in?: Array<unknown> | null | undefined;
  publishedAt_lt?: unknown;
  publishedAt_lte?: unknown;
  publishedAt_not?: unknown;
  publishedAt_not_in?: Array<unknown> | null | undefined;
  publishedVersion?: number | null | undefined;
  publishedVersion_exists?: boolean | null | undefined;
  publishedVersion_gt?: number | null | undefined;
  publishedVersion_gte?: number | null | undefined;
  publishedVersion_in?: Array<number | null | undefined> | null | undefined;
  publishedVersion_lt?: number | null | undefined;
  publishedVersion_lte?: number | null | undefined;
  publishedVersion_not?: number | null | undefined;
  publishedVersion_not_in?: Array<number | null | undefined> | null | undefined;
};

export type GetCollectionQueryVariables = Exact<{
  slug: string;
}>;


export type GetCollectionQuery = { collectionCollection: { items: Array<{ title: string | null, description: { json: unknown } | null, heroImage: { url: string | null, title: string | null, width: number | null, height: number | null } | null, productsCollection: { items: Array<
          | { name: string | null, slug: string | null, price: number | null, imagesCollection: { items: Array<{ url: string | null, title: string | null } | null> } | null }
          | Record<PropertyKey, never>
         | null> } | null } | null> } | null };

export type GetCollectionSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCollectionSlugsQuery = { collectionCollection: { items: Array<{ slug: string | null, title: string | null } | null> } | null };

export type GetProductQueryVariables = Exact<{
  slug: string;
}>;


export type GetProductQuery = { productCollection: { items: Array<{ name: string | null, price: number | null, variants: unknown, description: { json: unknown } | null, imagesCollection: { items: Array<{ url: string | null, title: string | null, width: number | null, height: number | null } | null> } | null } | null> } | null };

export type GetProductSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductSlugsQuery = { productCollection: { items: Array<{ slug: string | null } | null> } | null };

export type GetProductsQueryVariables = Exact<{
  limit: number;
  where?: ProductFilter | null | undefined;
}>;


export type GetProductsQuery = { productCollection: { total: number, items: Array<{ name: string | null, slug: string | null, price: number | null, category: string | null, tags: Array<string | null> | null, featured: boolean | null, sys: { id: string }, description: { json: unknown } | null, imagesCollection: { items: Array<{ url: string | null, title: string | null } | null> } | null } | null> } | null };


export const GetCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"json"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heroImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"imagesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionQuery, GetCollectionQueryVariables>;
export const GetCollectionSlugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollectionSlugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionSlugsQuery, GetCollectionSlugsQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"json"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"}},{"kind":"Field","name":{"kind":"Name","value":"imagesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetProductSlugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductSlugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductSlugsQuery, GetProductSlugsQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProductFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"json"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"featured"}},{"kind":"Field","name":{"kind":"Name","value":"imagesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;