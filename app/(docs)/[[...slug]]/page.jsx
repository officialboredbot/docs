import { source } from "../../../lib/source.js";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { notFound } from "next/navigation";
import { getMDXComponents } from "../../../mdx-components.jsx";

export default async function Page(props) {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} tableOfContent={{ style: "clerk" }}>
      {!page.data.full ? <DocsTitle>{page.data.title}</DocsTitle> : null}
      {!page.data.full ? <DocsDescription>{page.data.description}</DocsDescription> : null}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page)
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description
  };
}
