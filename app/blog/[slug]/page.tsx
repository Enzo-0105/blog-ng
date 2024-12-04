import Header from "@/app/components/Header";
import { Posts } from "../../lib/interface";
import { client, urlFor } from "../../lib/sanity";
import { Nunito } from "next/font/google";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import SharePost from "@/app/components/SharePost";
import { IoShareSocial } from "react-icons/io5";

const dateFont = Nunito({ weight: "400", subsets: ["latin"] });

async function getPost(slug: string) {
  const query = `
    *[_type == 'posts' && slug.current == "${slug}"] [0] {
      title,
      excerpt,
      publishedAt,
      postImage,
      slug,
      _id,
      body,
      tags[]-> {
        _id,
        slug,
        name
      },
      authors[]-> {
        _id,
        name,
        avatar
      }
    }
  `;

  const post = await client.fetch(query);
  return post;
}

export const revalidate = 30;

interface BlogProp {
  params: Promise<{ slug: string }>;
}

// Dynamic metadata generation function
export async function generateMetadata({
  params,
}: BlogProp): Promise<Metadata> {
  const { slug } = await params;

  // Fetch post data based on slug
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // const imageUrl = "https://bloggng.netlify.app/blog_bg.png";
  // const dynamicImageUrl = post[0]?.postImage?.asset.url || imageUrl

  return {
    title: post.title,
    description: post.excerpt,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://bloggng.netlify.app/blog/${slug}`,
      // images: [
      //   {
      //     url: dynamicImageUrl,
      //     width: 800,
      //     height: 600,
      //   },
      // ],
      type: "article",
      publishedTime: post.publishedAt,
    },

    twitter: {
      title: post.title,
      description: post.excerpt,
      // images: [dynamicImageUrl],
    },
  };
}

export default async function BlogPage({ params }: BlogProp) {
  const resolvedParams = await params;
  const post: Posts = await getPost(resolvedParams?.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Header title={post?.title} />

      <div>
        <div className="max-w-[625px] w-full mx-auto mt-5">
          <span className={`${dateFont?.className} text-md font-600`}>
            {new Date(post?.publishedAt).toDateString()}
          </span>
        </div>

        <div className="text-left mt-5 mx-auto prose md:prose-lg dark:prose-invert prose-li:marker:text-primary">
          <PortableText
            value={post?.body}
            components={myPortableTextComponents}
          />
        </div>

        <div className="max-w-[625px] w-full mx-auto mt-5 flex items-center gap-3">
          {post?.tags?.map((tag) => (
            <Link
              key={tag?._id}
              className="bg-green-500 px-3 py-1 rounded-full text-white text-xs lowercase"
              href={`/tag/${tag.slug.current}`}
            >
              # {tag?.name}
            </Link>
          ))}
        </div>

        <div className="max-w-[625px] w-full mx-auto mt-5">
          <div className="flex items-center gap-5">
            <h3 className="text-xl font-bold flex gap-2 items-center">
              Share Post <IoShareSocial fontWeight={500} />:
            </h3>
            <SharePost slug={post?.slug?.current} title={post?.title} />
          </div>
        </div>
      </div>
    </div>
  );
}

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlFor(value).url()}
        className="border shadow-lg rounded-lg object-contain"
        alt="blog_image"
        width={700}
        height={700}
      />
    ),
  },
};
