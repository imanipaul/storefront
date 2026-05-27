import type { CodegenConfig } from "@graphql-codegen/cli";
import "./envConfig.ts";

const config: CodegenConfig = {
  schema: {
    [`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`]:
      {
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
      },
  },
  documents: ["src/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};

export default config;
