import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Lilita_One } from "next/font/google";

const font = Lilita_One({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  return (
    <div className="mx-auto max-w-7xl px-5 fixed z-50 top-0 left-0 right-0 bg-transparent bg-opacity-80 backdrop-blur-lg">
      <nav className="flex justify-between items-center w-full h-16">
        <Link href="/">
          <div
            className={`${font.className} text-2xl lg:text-4xl font-semibold lg:font-bold`}
          >
            Blog<span className="bg-primary text-white">NG</span>
          </div>
        </Link>
        <div>
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
