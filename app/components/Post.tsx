import Link from "next/link";
import React from "react";
import { Lilita_One, Nunito } from "next/font/google";
import { Posts } from "../lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { postBg } from "../assets";
import { Button } from "@/components/ui/button";

interface Props {
  post: Posts;
}

const font = Lilita_One({ weight: "400", subsets: ["latin"] });
const dateFont = Nunito({ weight: "400", subsets: ["latin"] });

const Post = ({ post }: Props) => {
  return (
    <Card className="max-w-[350px] lg:max-w-[392px] w-full">
      <CardContent className="flex flex-col p-3 gap-[15px]">
        <Image
          src={postBg}
          width={500}
          height={500}
          className="object-contain rounded-md"
          alt="blog_bg"
        />
        <h2 className={`${font.className} text-2xl line-clamp-2`}>
          {post?.title}
        </h2>
        <p className="line-clamp-4">{post?.excerpt}</p>

        <div className="flex justify-between items-center">
          <div>
            {post?.authors?.map((author) => (
              <span
                key={author._id}
                className={`${font.className} font-semibold`}
              >
                {author.name}
              </span>
            ))}
          </div>
          <p className={`${dateFont.className} text-sm`}>
            {new Date(post?.publishedAt).toDateString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {post?.tags?.map((tag) => (
            <span
              key={tag?._id}
              className="bg-primary px-2 py-1 rounded-full text-white text-xs lowercase"
            >
              # {tag?.name}
            </span>
          ))}
        </div>

        <Link href={`/blog/${post?.slug?.current}`}>
          <Button className="text-white w-[100%] block mx-auto">
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Post;
