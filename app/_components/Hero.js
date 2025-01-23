import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full relative md:h-screen lg:min-h-screen bg-[#EAEEFE] overflow-hidden">
      <div
        className="w-full flex justify-center items-center md:h-screen lg:min-h-scree"
        style={{
          background:
            "linear-gradient(195deg, rgba(234,238,254,0) 47%, rgba(24,62,194,1) 100%)",
        }}
      >
        <div className="max-w-screen-xl lg:min-h-[90%] mx-auto py-9 md:pt-[5%] pt-[30%] grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* LEFT SECTION */}
          <div className="hero-left flex flex-col gap-4 justify-center items-start px-6 md:pb-0 pb-10 pr-20 relative">
            <span className="border border-slate-500 rounded-md py-2 px-4 text-sm md:text-base">
              Version 1.0 is here
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold font-serif leading-tight md:leading-none">
              Effortless <br /> Notes with AI
            </h1>
            <p className="w-full md:w-[90%] text-sm md:text-base">
              Enhance your note-taking with AI! Simply select text from your
              PDF, click the AI Generator button, and let the AI create concise,
              accurate summaries or answers. Save time, stay organized, and
              boost productivity with ease.
            </p>
            <div className="flex mt-4">
              <Link href="/sign-up">
                <Button>Get For free</Button>
              </Link>
            </div>

            <Image
              src={"/cylinder.png"}
              width={100}
              height={100}
              className="w-[25%] md:w-[40%] absolute md:right-[-15%] right-[10%] top-[-2%] anim"
              alt="hero"
              unoptimized
            />
          </div>
          {/* RIGHT SECTION */}
          <div className="hero-right flex justify-center items-center relative overflow-hidden">
            <Image
              src={"/visual.png"}
              width={100}
              height={100}
              className="w-full max-w-[80%] md:max-w-[90%] animate-spin-slow"
              alt="hero"
              unoptimized
            />
          </div>
          <Image
            src={"/pipe.png"}
            width={100}
            height={100}
            className="w-[30%] md:w-[20%] absolute right-[-10%] md:right-[-7%] bottom-[-20%] md:bottom-[-10%] animate-breathing"
            alt="hero"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
