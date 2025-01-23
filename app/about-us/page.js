import { Lightbulb, Users, BookOpen, Lock } from "lucide-react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Welcome from "../_components/Welcome";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <section
        className="text-black md:py-[10%] py-[20%] md:pt-[10%] pt-[40%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(234,238,254,0) 47%, rgba(24,62,194,1) 280%)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Revolutionize Your Note-Taking
          </h2>
          <p className="text-lg mb-8">
            Simplify your life and boost productivity with our smart, AI-powered
            note-taking solutions.
          </p>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Why Choose AI Notes Taker?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
            <Lightbulb className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Smart AI Assistance
            </h4>
            <p className="text-gray-600">
              Automatically summarize, organize, and highlight key points in
              your notes with AI.
            </p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
            <Lock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Data Security
            </h4>
            <p className="text-gray-600">
              Your notes are protected, encryption and strict security protocols
              to ensure your privacy.
            </p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
            <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Enhanced Organization
            </h4>
            <p className="text-gray-600">
              Categorize, tag, and search your notes in seconds for maximum
              efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Advantages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-xl font-semibold text-indigo-600 mb-2">
              Increased Productivity
            </h4>
            <p className="text-gray-600">
              Save time and effort with AI-powered features.
            </p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-xl font-semibold text-indigo-600 mb-2">
              Personalized Experiences
            </h4>
            <p className="text-gray-600">
              Customize your notes to suit your individual learning style.
            </p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-xl font-semibold text-indigo-600 mb-2">
              Seamless Collaboration
            </h4>
            <p className="text-gray-600">
              Share notes and collaborate with classmates or colleagues.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <Welcome />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
