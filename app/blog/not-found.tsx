import React from "react";
import Header from "../components/Header";
import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <Header title="404 - Post Not Found" />

      <div>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
