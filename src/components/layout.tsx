import { ReactNode, FC } from "react";
import Head from "next/head";
import { Navbar } from "./navbar";

interface LayoutProps {
  children: ReactNode;
  description?: string;
  author?: string;
  title?: string;
  meta?: Record<"name" | "content" | "property?", string>[];
}

export const Layout: FC<LayoutProps> = ({
  children,
  meta,
  description = "This is the technical assessment for EukaPay Software Engineer Role",
  author = "Ifeanyi Derick Iloabachie",
  title = "Derick's Todo Management App",
}) => {
  const metaData = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
  ].concat(meta ?? []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        {metaData.map(({ name, content }, i) => (
          <meta key={i.toString()} name={name} content={content} />
        ))}
      </Head>
      <main role="main">
        <Navbar />
        {children}
      </main>
    </>
  );
};
