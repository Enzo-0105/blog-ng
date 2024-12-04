"use client";

import { Button } from "@/components/ui/button";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { BsClipboard2 } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import { Toaster, toast } from "sonner";
import React from "react";

interface ShareProps {
  slug: string;
  title: string;
}

const SharePost = ({ slug, title }: ShareProps) => {
  const currentUrl = `https://bloggng.netlify.app/blog/${slug}`;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);
  console.log(encodedTitle, encodedUrl);

  return (
    <div>
      <Toaster richColors />

      {/* Copy link */}
      {/* <Button
        asChild
        variant="ghost"
        size="icon"
        className="rounded-full border border-primary hover:bg-green-500 hover:bg-opacity-20"
        onClick={() => {
          navigator.clipboard
            .writeText(currentUrl)
            .then(() => toast.success("Link copied to clipboard!"))
            .catch(() => toast.error("Failed to copy link"));
        }}
      >
        <BsClipboard2 />
      </Button> */}

      <div className="flex items-center gap-3">
        {/* Copy to Clipboard */}
        <Button
          asChild
          variant="ghost"
          size="icon"
          onClick={() => {
            navigator.clipboard
              .writeText(currentUrl)
              .then(() => toast.success("Link copied to clipboard!"))
              .catch(() => toast.error("Failed to copy link"));
          }}
          className="rounded-full border border-primary hover:bg-green-500 hover:bg-opacity-20"
        >
          <a className="cursor-pointer">
            <BsClipboard2 />
          </a>
        </Button>

        {/* Share on WhatsApp */}
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="rounded-full border border-primary hover:bg-green-500 hover:bg-opacity-20"
        >
          <a
            href={`https://wa.me/?text=${encodedTitle} - ${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
        </Button>

        {/* Share on Facebook */}
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="rounded-full border border-primary hover:bg-green-500 hover:bg-opacity-20"
        >
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
        </Button>

        {/* Share on Twitter */}
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="rounded-full border border-primary hover:bg-green-500 hover:bg-opacity-20"
        >
          <a
            href={`https://www.twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiTwitterXFill />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default SharePost;
