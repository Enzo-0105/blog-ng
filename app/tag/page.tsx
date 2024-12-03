import { client } from "../lib/sanity";
import React from "react";
import { Tag } from "../lib/interface";
import Header from "../components/Header";
import Link from "next/link";

async function getAllTags() {
  const query = `
    *[_type == "tag"] {
      name,
      slug,
      _id,
      "postCount": count(*[_type == "posts" && references("tags", ^._id)])
    }
  `;

  const tags = client.fetch(query);
  return tags;
}

export const revalidate = 30;

const page = async () => {
  const tags: Tag[] = await getAllTags();
  return (
    <div>
      <Header title="Tags" />

      <div>
        {tags?.length > 0 &&
          tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <div className="mb-2 p-2 text-sm lowercase border border-gray-900 hover:text-primary">
                # {tag.name} ({tag?.postCount})
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default page;
