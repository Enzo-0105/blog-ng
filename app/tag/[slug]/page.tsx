import Header from "@/app/components/Header";
import Post from "@/app/components/Post";
import { Posts } from "../../lib/interface";
import { client } from "../../lib/sanity";

async function getPostsByTag(tag: string) {
  const query = `
    *[_type == "posts" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
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
        name
      }
    }
  `;

  const posts = await client.fetch(query);
  return posts;
}
export const revalidate = 30;

// interface TagsProp {
//   params: {
//     slug: string
//   };
// }

interface TagsProp {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: TagsProp) {
  const resolvedParams = await params;
  const posts: Array<Posts> = await getPostsByTag(resolvedParams?.slug);

  return (
    <div>
      <Header title={`#${(await params).slug}`} tags />
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
