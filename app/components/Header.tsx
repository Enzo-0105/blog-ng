import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  tags?: boolean;
}

const Header = ({ title = "", tags = false }: Props) => {
  return (
    <header className="py-5 text-center mb-5 border-b border-primary">
      <h2 className="uppercase text-2xl mx-auto max-w-2xl font-bold">{title}</h2>

      {tags && (
        <div className="mt-2 hover:text-primary">
          <Link href='/tag'>#tags</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
