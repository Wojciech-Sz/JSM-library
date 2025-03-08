"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={40}
          height={40}
        />
        <p className="text-2xl font-bold text-light-100">
          BookWise
        </p>
      </Link>

      <ul className="flex flex-row gap-8">
        <li>
          <Link
            href="/library"
            className={`text-base cursor-pointer capitalize ${
              pathname === "/library"
                ? "text-light-200"
                : "text-light-100"
            }`}
          >
            Library
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
