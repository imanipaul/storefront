# Shoppe

A sample e-commerce storefront built with Next.js and Contentful. Browse products and collections, filter by category, view product details with variants, and manage a persistent shopping cart.

## Features

- **Product catalog** — Home page with a featured hero, category filters, and a product grid
- **Collections** — Curated product groupings with rich-text descriptions
- **Product pages** — Variant selection, image gallery, and rich-text content from Contentful
- **Shopping cart** — Client-side cart with Zustand, persisted to `localStorage`
- **Static generation** — Product and collection pages pre-rendered at build time

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, React Server Components)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Contentful](https://www.contentful.com) — headless CMS via GraphQL
- [Apollo Client](https://www.apollographql.com/docs/react) — data fetching
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) — typed queries and hooks
- [Zustand](https://zustand.docs.pmnd.rs) — cart state management

## Prerequisites

- Node.js 20+
- A Contentful space with product and collection content models
- Content Delivery API access token

## Environment variables

Create a `.env.local` file in the project root:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
```

These are used by the Apollo client (`src/app/lib/apollo-client.ts`) and GraphQL Code Generator (`graphql.config.ts`).

## Getting started

Install dependencies:

```bash
npm install
```

Generate typed GraphQL artifacts from your Contentful schema:

```bash
npm run codegen
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run codegen` | Generate typed GraphQL client from Contentful schema |
| `npm run codegen:watch` | Regenerate GraphQL types on file changes |

## Project structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home — product grid with filters
│   ├── cart/page.tsx       # Shopping cart
│   ├── products/[slug]/    # Product detail pages
│   ├── collections/[slug]/ # Collection pages
│   └── lib/apollo-client.ts
├── components/             # UI components
├── gql/                    # Generated GraphQL types (via codegen)
├── queries/                # GraphQL query documents
└── store/cart.ts           # Zustand cart store
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page with featured hero and filterable product grid |
| `/products/[slug]` | Product detail with variants and add-to-cart |
| `/collections/[slug]` | Collection page with associated products |
| `/cart` | Shopping cart |

Home page filters are driven by URL search params (`?category=…`, `?featured=true`) so the page can remain a React Server Component.

## GraphQL workflow

1. Add or edit `.graphql` files in `src/queries/`
2. Run `npm run codegen` to regenerate types in `src/gql/`
3. Import documents from `@/gql/graphql` in your pages and components

## Deploy

This app can be deployed to any platform that supports Next.js (e.g. [Vercel](https://vercel.com)). Set `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` as environment variables in your deployment settings.
