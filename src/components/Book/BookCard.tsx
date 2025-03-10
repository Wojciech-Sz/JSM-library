import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

import BookCover from "./BookCover";
import { Button } from "../ui/button";

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoaned = true,
}: Book) => {
  return (
    <li className={cn(isLoaned && "xs:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(
          isLoaned && "w-full flex flex-col items-center"
        )}
      >
        <BookCover
          coverColor={coverColor}
          coverUrl={coverUrl}
        />
        <div
          className={cn(
            "mt-4",
            !isLoaned && "xs:max-w-40 max-w-28"
          )}
        >
          <p className="book-title">{title}</p>

          <p className="book-genre">{genre}</p>
        </div>
        {isLoaned && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">
                Loaned on 12/03/2025
              </p>
            </div>
            <Button className="!book-btn">
              Download Receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
