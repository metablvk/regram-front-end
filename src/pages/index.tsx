import Head from "next/head";
import Layout from "components/layout/layout.component";
import Post from "components/post/post.component";
export default function Home() {
  const posts = [
    {
      img: "/images/stock-image-1.jpg",
      likes: 124,
      username: "alicia",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta veritatis, explicabo mollitia tempore magnam quis.`,
    },
    {
      img: "/images/stock-image-2.jpg",
      likes: 524,
      username: "shannon",
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta veritatis, explicabo mollitia tempore magnam quis.`,
    },
  ];
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {posts.map((post, id) => (
          <Post key={id} post={post} />
        ))}
      </Layout>
    </>
  );
}
