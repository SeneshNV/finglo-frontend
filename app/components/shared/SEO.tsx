import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default SEO;
