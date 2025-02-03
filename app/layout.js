// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Outfit } from "next/font/google";
// import ConvexClientProvider from "./ConvexClientProvider";
// import { ClerkProvider } from "@clerk/nextjs";
// import { Toaster } from "@/components/ui/sonner";
// import Head from "next/head";

// const siteUrl = "https://ainotestaker.netlify.app";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Free AI Notes Maker - Capture, Organize & Boost Productivity",
//   keywords:
//     "free notes maker, AI notes taker, note-taking app, free note-taking tool, AI-powered notes, productivity tools, online notes app, organize notes, AI note-taking solution, free productivity app, smart notes app",
//   description:
//     "Discover Free AI Notes Maker - capture, organize, and manage notes easily. Boost productivity with smart, AI-powered features. Start for free now!",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// const outfit = Outfit({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <Head>
//           <meta
//             name="google-site-verification"
//             content="jqEzwK7eoReqyfciSG7WRzX31u0fNzJIx7eje4cPhz8"
//           />
//           <title>AI Notes Taker</title>
//           <meta
//             name="description"
//             content="Discover Free AI Notes Maker - capture, organize, and manage notes easily. Boost productivity with smart, AI-powered features. Start for free now!"
//           />
//           <meta
//             name="keywords"
//             content="free notes maker, AI notes taker, note-taking app, free note-taking tool, AI-powered notes, productivity tools, online notes app, organize notes, AI note-taking solution, free productivity app, smart notes app
// "
//           />

//           <meta
//             property="og:title"
//             content="Free AI Notes Maker - Capture, Organize & Boost Productivity"
//           />
//           <meta
//             property="og:description"
//             content="Discover Free AI Notes Maker - the ultimate tool to capture, organize, and manage notes easily. Boost productivity with AI-powered features."
//           />
//           <meta property="og:type" content="website" />
//           <meta property="og:url" content="https://ainotestaker.netlify.app/" />
//           <meta property="og:image" content="/ainoteslogo.png" />
//           <meta
//             property="og:image:alt"
//             content="Screenshot of Free AI Notes Maker web application"
//           />
//           <meta property="og:site_name" content="AI Notes Maker" />

//           <link rel="canonical" href="https://ainotestaker.netlify.app/" />
//           {/* <link rel="canonical" href={`${siteUrl}${router.asPath}`} /> */}

//           <link rel="icon" type="image/png" href="/favicon.ico" />
//           <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
//           {/* JSON-LD for schema.org structured data */}
//           <script
//             type="application/ld+json"
//             dangerouslySetInnerHTML={{
//               __html: JSON.stringify({
//                 "@context": "https://schema.org",
//                 "@type": "WebPage",
//                 name: "Free AI Notes Maker - Capture, Organize & Boost Productivity",
//                 description:
//                   "Discover Free AI Notes Maker - capture, organize, and manage notes easily. Boost productivity with smart, AI-powered features. Start for free now!",
//                 url: "https://ainotestaker.netlify.app/",
//               }),
//             }}
//           />
//           <meta name="robots" content="index, follow" />
//         </Head>
//         <body className={outfit.className}>
//           {/* <MyProvider> */}
//           <ConvexClientProvider>{children}</ConvexClientProvider>
//           <Toaster />
//           {/* </MyProvider> */}
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const siteUrl = "https://ainotestaker.netlify.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Free AI Notes Maker - Capture, Organize & Boost Productivity",
  description:
    "Discover Free AI Notes Maker - capture, organize, and manage notes easily. Boost productivity with smart, AI-powered features. Start for free now!",
  keywords:
    "free notes maker, AI notes taker, note-taking app, free note-taking tool, AI-powered notes, productivity tools, online notes app, organize notes, AI note-taking solution, free productivity app, smart notes app",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Free AI Notes Maker - Capture, Organize & Boost Productivity",
    description:
      "Discover Free AI Notes Maker - the ultimate tool to capture, organize, and manage notes easily. Boost productivity with AI-powered features.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: "/ainoteslogo.png",
        alt: "Screenshot of Free AI Notes Maker web application",
      },
    ],
    siteName: "AI Notes Maker",
  },
  robots: "index, follow",
  // verification: {
  //   google: "jqEzwK7eoReqyfciSG7WRzX31u0fNzJIx7eje4cPhz8",
  // },
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
