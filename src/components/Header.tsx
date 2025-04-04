"use client";

import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
  ClerkLoading,
} from "@clerk/nextjs";
import { LogIn, UserRound, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Header = ({ userId }: { userId: string | null }) => {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between items-center gap-5">
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <p className="text-2xl font-bold hidden xs:block text-light-100">
          BookWise
        </p>
      </Link>

      <ul className="flex gap-8">
        <li>
          <Link
            href="/library"
            className={`text-base cursor-pointer capitalize ${
              pathname === "/library" ? "text-light-200" : "text-light-100"
            }`}
          >
            Library
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <ClerkLoading>
          {userId ? (
            <>
              <MyAvatar />
            </>
          ) : (
            <>
              <Button title="Sign In" disabled>
                <MySignInButton />
              </Button>
              <Button variant="secondary" title="Sign Up" disabled>
                <MySignUpButton />
              </Button>
            </>
          )}
        </ClerkLoading>

        <SignedOut>
          <SignInButton>
            <Button title="Sign In">
              <MySignInButton />
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="secondary" title="Sign Up">
              <MySignUpButton />
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                href="/my-profile"
                label="My Profile"
                labelIcon={<UserRound className="size-5" />}
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;

const MySignInButton = () => {
  return (
    <>
      <span className="hidden xs:block">Sign In</span>
      <LogIn className="xs:hidden block" />
    </>
  );
};

const MySignUpButton = () => {
  return (
    <>
      <span className="hidden xs:block">Sign Up</span>
      <UserRoundPlus className="xs:hidden block" />
    </>
  );
};

const MyAvatar = () => {
  return (
    <Avatar className="size-7">
      <AvatarImage src="" />
      <AvatarFallback className="bg-purple-500/50 text-white font-bold text-sm">
        <UserRound fill="white" className="translate-y-1" />
      </AvatarFallback>
    </Avatar>
  );
};
