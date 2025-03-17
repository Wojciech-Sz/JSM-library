import BookList from "@/components/Book/BookList";
import BookOverview from "@/components/Book/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const Home = async () => {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
