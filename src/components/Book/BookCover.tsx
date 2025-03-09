import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

import BookCoverSvg from "./BookCoverSvg";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra-small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012b48",
  coverUrl = "https://placehold.co/400x600.png",
}: BookCoverProps) => {
  return (
    <div
      className={cn(
        "relative transition-al duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div className="absolute z-10 left-[12%] w-[87.5%] h-[88%]">
        <Image
          src={coverUrl}
          alt="book cover"
          fill
          className="rounded-sm"
        />
      </div>
    </div>
  );
};

export default BookCover;
