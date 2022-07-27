import Head from "next/head";

export default function Metatags({
  title = "The DIY Tech Den",
  description = "A social space geared for hobbyist tech DIY enthusiasts to share their knowledge.",
  image = "https://cdn-icons-png.flaticon.com/512/3079/3079165.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
