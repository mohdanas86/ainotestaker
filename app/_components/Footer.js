import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div className="text-teal-600 w-[200px]">
                <img src="/ainoteslogo.png" alt="logo" />
              </div>

              <p className="mt-4 max-w-xs text-white">
                AI Notes Taker auto-captures and summarizes key info from
                meetings and lectures for efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
              {/* <div>
                <p className="font-medium text-white">Services</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-white transition hover:opacity-75"
                    >
                      {" "}
                      3A AI{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-white transition hover:opacity-75"
                    >
                      {" "}
                      Company Review{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-white transition hover:opacity-75"
                    >
                      {" "}
                      Accounts Review{" "}
                    </a>
                  </li>
                </ul>
              </div> */}

              <div>
                <p className="font-medium text-white">Company</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-white transition hover:opacity-75"
                    >
                      {" "}
                      Home{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us"
                      className="text-white transition hover:opacity-75"
                    >
                      {" "}
                      About{" "}
                    </Link>
                  </li>

                  {/* <li>
                    <a
                      href="#"
                      className="text-white transition hover:opacity-75"
                    >
                      {" "}
                      Accounts Review{" "}
                    </a>
                  </li> */}
                </ul>
              </div>

              <div>
                <p className="font-medium text-white">Helpful Links</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-white transition hover:opacity-75"
                    >
                      {" "}
                      Contact{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-white transition hover:opacity-75"
                    >
                      {" "}
                      FAQs{" "}
                    </a>
                  </li>
                </ul>
              </div>

              {/* <div>
                <p className="font-medium text-white">Legal</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-white transition hover:opacity-75"
                    >
                      {" "}
                      Accessibility{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-white transition hover:opacity-75"
                    >
                      {" "}
                      Refund Policy{" "}
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>

          <p className="text-xs text-white">
            &copy; 2025 3A All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
