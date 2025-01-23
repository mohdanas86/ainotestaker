"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const { user } = useUser();
  const [phoMenu, setPhoMenu] = useState(false);

  const toggleMenu = () => setPhoMenu((prev) => !prev);

  return (
    <header className="bg-transparent absolute top-0 left-0 z-50 w-full">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link href="/" className="block text-teal-600">
              <span className="sr-only">Home</span>
              <Image
                src="/ainoteslogo.png"
                alt="logo"
                width={150}
                height={150}
              />
            </Link>
          </div>

          {/* Navigation */}
          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-500 transition hover:text-gray-500/75"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </nav>

            {/* User Button */}
            <span className="hidden lg:block">
              {user ? (
                <UserButton />
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <Link href="/sign-in">
                    <Button>Login</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button>Sign up</Button>
                  </Link>
                </div>
              )}
            </span>

            {/* Phone Menu Toggle */}
            <div className="block md:hidden relative">
              <button
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Phone Dropdown Menu */}
            {phoMenu && (
              <div
                className="absolute end-[3%] z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
              >
                <div className="p-2">
                  <Link
                    onClick={toggleMenu}
                    href="/"
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about-us"
                    onClick={toggleMenu}
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                  >
                    About us
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={toggleMenu}
                    className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                  >
                    Dashboard
                  </Link>
                  <div
                    onClick={toggleMenu}
                    className="flex w-full justify-end items-center border-t pt-2"
                  >
                    {user ? (
                      <UserButton />
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        <Link href="/sign-in">
                          <Button>Login</Button>
                        </Link>
                        <Link href="/sign-up">
                          <Button>Sign up</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
