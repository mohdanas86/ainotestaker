import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Briefcase,
  Award,
  MoveRight,
  ArrowRight,
} from "lucide-react"; // Fixed icon imports
import Link from "next/link";
import React from "react";

const Welcome = () => {
  return (
    <div className="w-full relative min-h-[60vh] bg-[#EAEEFE] overflow-hidden">
      <div
        className="w-full flex justify-center items-center min-h-[60vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,1) 50%, rgba(210,220,255,1) 100%)",
        }}
      >
        <div className="max-w-screen-xl md:min-h-[90%] min-h-[100%] mx-auto flex justify-center items-center gap-8 relative md:py-0 py-24">
          {/* TOP SECTION */}
          <div className="hero-left flex flex-col gap-6 justify-center items-center px-6 md:pr-20 relative text-center">
            {/* <span className="w-full "> */}
            <img
              src="/helix3.png"
              alt="img"
              className="w-[30%] absolute md:right-[-8%] right-[-12%] md:top-[-20%] md:bottom-0 bottom-[-30%] animate-breathing"
            />
            {/* </span> */}

            <h3 className="md:text-5xl text-4xl font-semibold">
              Sign up for free today
            </h3>
            <p className="text-center w-full md:w-[52%]">
              Unlock the power of AI-driven note-taking. Select text, let the AI
              generate concise summaries, and boost your productivity
              effortlessly.
            </p>
            <div className="justify-center items-center gap-4 flex mt-4">
              <Link href="/sign-up">
                <Button>Get For Free</Button>
              </Link>

              <span className=" cursor-pointer flex justify-center items-center gap-2 hover:underline hover:translate-x-2 duration-300">
                Learn more <ArrowRight />
              </span>
            </div>

            <img
              src="/emojistar.png"
              alt="img"
              className="md:w-[25%] w-[30%]  animate-breathing absolute md:left-[-8%] md:top-[-25%] left-[-12%] top-[-35%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
