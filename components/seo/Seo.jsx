import Head from "next/head";

const Seo = ({
  seo: {
    title = "Nelson",
    favicon = "/images/favicon.png",
    url = "https://rollingstone.webflow.io/",
  },
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="title" content={title} />
      <meta name="og:title" content={title} />
      <meta content={title} property="twitter:title" />
      <meta name="referrer" content="always" />
      <link href={favicon} rel="shortcut icon" type="image/x-icon" />
    </Head>
  );
};

export default Seo;
