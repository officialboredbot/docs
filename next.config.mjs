import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX({
  configPath: "source.config.mjs"
});

export default withMDX({
  turbopack: {
    root: new URL(".", import.meta.url).pathname
  }
});
