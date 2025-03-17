import React from "react";

import BookList from "@/components/Book/BookList";
import { sampleBooks } from "@/constants";

const page = () => {
  return (
    <>
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default page;
