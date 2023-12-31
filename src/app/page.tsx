import Link from "next/link";
import Head from "next/head";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import { Header } from "../components/Header";
import { useSession } from "next-auth/react";

export default async function Home() {
  const hello = await api.post.hello.query({
    text: "world",
  });
  const session = await getServerAuthSession();

  return (
    <>
      <Head>
        <title>Notetaker</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex  text-white">

        <Header />
        <Content />
        {/* <CrudShowcase /> */}
      </main>
    </>

  );
}

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: topics, refecth: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined, 
    }
  );

  return <div>{JSON.stringify(topics)}</div>;

};
// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
