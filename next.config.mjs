// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      // Disallow indexing for specific paths
      {
        source: "/",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow", // Ensure the home page is indexed and links are followed
          },
        ],
      },
      {
        source: "/about-us",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow", // Ensure the home page is indexed and links are followed
          },
        ],
      },
      {
        source: "/sign-in",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/sign-up",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/dashboard",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/dashboard/upgrade",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/workspace",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
