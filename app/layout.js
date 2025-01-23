import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "3A - AI Notes Taker",
  keywords:
    "AI Notes Taker, note-taking, productivity, AI-powered solutions, 3A",
  description:
    "AI Notes Taker: Efficiently capture and organize your notes with 3A. Enhance productivity with smart, AI-powered note-taking solutions. Try it now!",
  icons: {
    icon: "/favicon.ico",
  },
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <meta
            name="google-site-verification"
            content="jqEzwK7eoReqyfciSG7WRzX31u0fNzJIx7eje4cPhz8"
          />
          <title>3A - AI Notes Taker</title>
          <meta
            name="description"
            content="AI Notes Taker: Efficiently capture and organize your notes with 3A. Enhance productivity with smart, AI-powered note-taking solutions. Try it now!"
          />
          <meta
            name="keywords"
            content="AI Notes Taker, note-taking, productivity, AI-powered solutions, 3A"
          />

          <link rel="icon" type="image/png" href="/favicon.ico" />
          <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "3A - AI Notes Taker",
                url: "https://ainotestaker.netlify.app",
              }),
            }}
          />
        </Head>
        <body className={outfit.className}>
          {/* <MyProvider> */}
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Toaster />
          {/* </MyProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
