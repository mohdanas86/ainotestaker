import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In - AI Notes Maker",
  robots: "noindex, nofollow", // ❌ Search engines won't index this page
};

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}
