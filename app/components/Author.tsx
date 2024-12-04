import React from "react";
import { client, urlFor } from "../lib/sanity";
import Image from "next/image";
import { avatar } from "../assets";

async function getAuthorsInfo() {
  const query = `
    *[_type == 'author'] {
      _id,
      name,
      avatar
    }
  `;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 30;

interface Author {
  name: string;
  image: any;
  _id: string;
}

const fallbackAvatar = avatar;

const Author = async () => {
  const authors: Author[] = await getAuthorsInfo();
  // console.log(authors);
  return (
    <div>
      {authors?.map((author: any) => (
        <div key={author?._id} className="flex items-center gap-2">
          <Image
            src={author?.avatar ? urlFor(author?.avatar).url() : fallbackAvatar}
            alt="author_pfp"
            className="w-[30px] h-[30px] rounded-full"
            width={50}
            height={50}
          />
          <h3>{author?.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Author;
