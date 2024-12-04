import { client } from "./lib/sanity";
import Header from "./components/Header";
import { Posts } from "./lib/interface";
import Post from "./components/Post";

async function getPosts() {
  const query = `
    *[_type == 'posts'] | order(_createdAt desc) {
      title,
      excerpt,
      publishedAt,
      slug,
      _id,
      tags[]-> {
        _id,
        slug,
        name
      },
      authors[]-> {
        _id,
        name,
        avatar
      },
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 30;

export default async function Home() {
  const posts: Posts[] = await getPosts();
  return (
    <div>
      <Header title="Blog Posts" tags />

      <div className="flex justify-center flex-wrap gap-5">
        {posts?.length > 0 &&
          posts?.map((post) => (
            <div key={post?._id}>
              <Post post={post} />
            </div>
          ))}
      </div>
    </div>
  );
}
