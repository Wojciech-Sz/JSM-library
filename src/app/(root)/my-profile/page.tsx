import React from "react";

import BookList from "@/components/Book/BookList";
import ProfileForm from "@/components/forms/ProfileForm";
import { sampleBooks } from "@/constants";

const page = () => {
  return (
    <>
      <ProfileForm />
      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default page;
