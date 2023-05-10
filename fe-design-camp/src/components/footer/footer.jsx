import React from "react";
import Image from "next/image";
import mejengLogoWhite from "@/assets/mejeng-logo-white.svg";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
} from "react-icons/ai";
import Link from "next/link";

export default function Footer() {
  const footerData = [
    {
      title: "GENERAL INFORMATION",
      links: [
        { title: "About Us", route: "/information" },
        { title: "Terms of Services", route: "/information/term-of-service" },
        { title: "Privacy Policy", route: "/information/privacy-policy" },
      ],
    },
    {
      title: "HELP",
      links: [{ title: "Help Center", route: "/information/help-center" }],
    },
    {
      title: "SEE MEJENG",
      links: [
        { title: "Inspiration Design", route: "/project/inspirations" },
        { title: "Discover Awesome Design", route: "/project/discover" },
      ],
    },
  ];

  return (
    <footer className="absolute w-full bg-[#282828]">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-start px-9 pb-2 pt-9 lg:px-[47px] lg:pb-[20px] lg:pt-[70px]">
        <div className="flex w-full items-start justify-between ">
          <div className="hidden flex-col items-start justify-center text-white md:flex">
            <Link href="/">
              <Image
                src={mejengLogoWhite}
                alt="mejeng-logo-white"
                className="mb-5 h-10 lg:mb-10 lg:h-14"
              />
            </Link>
            <h4 className="w-9/12 pb-7 text-base font-medium text-[#9F9F9F] lg:w-full lg:text-lg">
              Send tips, trends, updates & offers{" "}
              <br className="hidden lg:block" />
              And connect with us
            </h4>
            <div className="hidden items-center justify-start gap-1 lg:flex">
              <AiFillInstagram className="h-[30px] w-[30px]" />
              <AiFillTwitterSquare className="h-[30px] w-[30px]" />
              <AiFillFacebook className="h-[30px] w-[30px]" />
            </div>
          </div>
          <div className="flex gap-3 lg:gap-20">
            {footerData.map((item) => (
              <div
                key={item.title}
                className="mt-2 flex flex-col gap-2 text-base font-semibold text-[#9F9F9F] lg:gap-[15px]"
              >
                <h1 className="text-lg text-white lg:text-xl">{item.title}</h1>
                {item.links.map((link) => (
                  <Link
                    href={link.route}
                    key={link.title}
                    className="underline-animation-footer text-sm transition-all hover:text-white lg:text-base"
                  >
                    <p>{link.title}</p>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="my-8 h-[1px] w-full bg-white"></div>
        <p className="text-xs font-semibold text-white md:text-sm ">
          &#169; 2023 Mejeng Elements Pty Ltd. Trademarks and brands aret the
          property of their respective owners.
        </p>
      </div>
    </footer>
  );
}
