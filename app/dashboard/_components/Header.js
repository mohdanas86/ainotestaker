import { UserButton } from "@clerk/nextjs";
import React from "react";

const Header = ({ setMenu }) => {
  return (
    <div className="flex justify-between md:justify-end p-5 shadow-sm">
      <UserButton />

      {/* PHONE TOGLE MENU */}
      <div className="block md:hidden">
        <button
          onClick={(e) => setMenu((e) => !e)}
          className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
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
    </div>
  );
};

export default Header;
