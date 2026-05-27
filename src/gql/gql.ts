/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetCollection($slug: String!) {\n  collectionCollection(limit: 1, where: {slug: $slug}) {\n    items {\n      title\n      description {\n        json\n      }\n      heroImage {\n        url\n        title\n        width\n        height\n      }\n      productsCollection(limit: 20) {\n        items {\n          ... on Product {\n            name\n            slug\n            price\n            imagesCollection(limit: 1) {\n              items {\n                url\n                title\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": typeof types.GetCollectionDocument,
    "query GetCollectionSlugs {\n  collectionCollection(limit: 100) {\n    items {\n      slug\n      title\n    }\n  }\n}": typeof types.GetCollectionSlugsDocument,
    "query GetProduct($slug: String!) {\n  productCollection(limit: 1, where: {slug: $slug}) {\n    items {\n      name\n      price\n      description {\n        json\n      }\n      variants\n      imagesCollection(limit: 5) {\n        items {\n          url\n          title\n          width\n          height\n        }\n      }\n    }\n  }\n}": typeof types.GetProductDocument,
    "query GetProductSlugs {\n  productCollection(limit: 100) {\n    items {\n      slug\n    }\n  }\n}": typeof types.GetProductSlugsDocument,
    "query GetProducts($limit: Int!, $where: ProductFilter) {\n  productCollection(limit: $limit, where: $where) {\n    total\n    items {\n      sys {\n        id\n      }\n      name\n      description {\n        json\n      }\n      slug\n      price\n      category\n      tags\n      featured\n      imagesCollection(limit: 1) {\n        items {\n          url\n          title\n        }\n      }\n    }\n  }\n}": typeof types.GetProductsDocument,
};
const documents: Documents = {
    "query GetCollection($slug: String!) {\n  collectionCollection(limit: 1, where: {slug: $slug}) {\n    items {\n      title\n      description {\n        json\n      }\n      heroImage {\n        url\n        title\n        width\n        height\n      }\n      productsCollection(limit: 20) {\n        items {\n          ... on Product {\n            name\n            slug\n            price\n            imagesCollection(limit: 1) {\n              items {\n                url\n                title\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.GetCollectionDocument,
    "query GetCollectionSlugs {\n  collectionCollection(limit: 100) {\n    items {\n      slug\n      title\n    }\n  }\n}": types.GetCollectionSlugsDocument,
    "query GetProduct($slug: String!) {\n  productCollection(limit: 1, where: {slug: $slug}) {\n    items {\n      name\n      price\n      description {\n        json\n      }\n      variants\n      imagesCollection(limit: 5) {\n        items {\n          url\n          title\n          width\n          height\n        }\n      }\n    }\n  }\n}": types.GetProductDocument,
    "query GetProductSlugs {\n  productCollection(limit: 100) {\n    items {\n      slug\n    }\n  }\n}": types.GetProductSlugsDocument,
    "query GetProducts($limit: Int!, $where: ProductFilter) {\n  productCollection(limit: $limit, where: $where) {\n    total\n    items {\n      sys {\n        id\n      }\n      name\n      description {\n        json\n      }\n      slug\n      price\n      category\n      tags\n      featured\n      imagesCollection(limit: 1) {\n        items {\n          url\n          title\n        }\n      }\n    }\n  }\n}": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollection($slug: String!) {\n  collectionCollection(limit: 1, where: {slug: $slug}) {\n    items {\n      title\n      description {\n        json\n      }\n      heroImage {\n        url\n        title\n        width\n        height\n      }\n      productsCollection(limit: 20) {\n        items {\n          ... on Product {\n            name\n            slug\n            price\n            imagesCollection(limit: 1) {\n              items {\n                url\n                title\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetCollection($slug: String!) {\n  collectionCollection(limit: 1, where: {slug: $slug}) {\n    items {\n      title\n      description {\n        json\n      }\n      heroImage {\n        url\n        title\n        width\n        height\n      }\n      productsCollection(limit: 20) {\n        items {\n          ... on Product {\n            name\n            slug\n            price\n            imagesCollection(limit: 1) {\n              items {\n                url\n                title\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollectionSlugs {\n  collectionCollection(limit: 100) {\n    items {\n      slug\n      title\n    }\n  }\n}"): (typeof documents)["query GetCollectionSlugs {\n  collectionCollection(limit: 100) {\n    items {\n      slug\n      title\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProduct($slug: String!) {\n  productCollection(limit: 1, where: {slug: $slug}) {\n    items {\n      name\n      price\n      description {\n        json\n      }\n      variants\n      imagesCollection(limit: 5) {\n        items {\n          url\n          title\n          width\n          height\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetProduct($slug: String!) {\n  productCollection(limit: 1, where: {slug: $slug}) {\n    items {\n      name\n      price\n      description {\n        json\n      }\n      variants\n      imagesCollection(limit: 5) {\n        items {\n          url\n          title\n          width\n          height\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductSlugs {\n  productCollection(limit: 100) {\n    items {\n      slug\n    }\n  }\n}"): (typeof documents)["query GetProductSlugs {\n  productCollection(limit: 100) {\n    items {\n      slug\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProducts($limit: Int!, $where: ProductFilter) {\n  productCollection(limit: $limit, where: $where) {\n    total\n    items {\n      sys {\n        id\n      }\n      name\n      description {\n        json\n      }\n      slug\n      price\n      category\n      tags\n      featured\n      imagesCollection(limit: 1) {\n        items {\n          url\n          title\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetProducts($limit: Int!, $where: ProductFilter) {\n  productCollection(limit: $limit, where: $where) {\n    total\n    items {\n      sys {\n        id\n      }\n      name\n      description {\n        json\n      }\n      slug\n      price\n      category\n      tags\n      featured\n      imagesCollection(limit: 1) {\n        items {\n          url\n          title\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;