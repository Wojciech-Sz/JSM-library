"use client";

import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "./ui/button";

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

      <ul className="flex gap-8">
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
      <div className="flex min-w-40 gap-4">
        <ClerkLoading>
          <Button disabled className="cursor-not-allowed">
            Sign In
          </Button>
          <Button
            disabled
            variant="secondary"
            className="cursor-not-allowed"
          >
            Sign Up
          </Button>
        </ClerkLoading>

        <SignedOut>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="secondary">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
