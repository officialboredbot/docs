import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "../../lib/layout.shared.jsx";
import { source } from "../../lib/source.js";

export default function Layout({ children }) {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
