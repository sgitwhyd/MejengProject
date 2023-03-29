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
      title: "MEET MEJENG",
      links: [
        { title: "About Us", route: "/about-us" },
        { title: "Terms & Conditions", route: "/term-conditions" },
        { title: "Privacy Policy", route: "/privacy-policy" },
      ],
    },
    {
      title: "HELP",
      links: [
        { title: "FAQ", route: "/faq" },
        { title: "Help Center", route: "/help" },
      ],
    },
    {
      title: "CREATOR",
      links: [
        { title: "Become an Creator", route: "/become-an-creator" },
        { title: "Creator's Guide", route: "/creators-guides" },
      ],
    },
  ];

  return (
    <footer className="absolute w-full bg-[#282828]">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-start px-[47px] pb-[20px] pt-[70px]">
        <div className="flex w-full items-start justify-between ">
          <div className="flex flex-col text-white">
            <Image
              src={mejengLogoWhite}
              alt="mejeng-logo-white"
              className="mb-10 h-14"
            />
            <h4 className="pb-7 text-lg font-medium text-[#9F9F9F]">
              Send tips, trends, updates & offers
              <br />
              And connect with us
            </h4>
            <div className="flex items-center justify-start gap-1">
              <AiFillInstagram className="h-[30px] w-[30px]" />
              <AiFillTwitterSquare className="h-[30px] w-[30px]" />
              <AiFillFacebook className="h-[30px] w-[30px]" />
            </div>
          </div>
          <div className="flex gap-20">
            {footerData.map((item) => (
              <div
                key={item.title}
                className="mt-2 flex flex-col gap-[15px] text-base font-semibold text-[#9F9F9F]"
              >
                <h1 className="text-xl text-white">{item.title}</h1>
                {item.links.map((link) => (
                  <Link
                    href={link.route}
                    key={link.title}
                    className="underline-animation-footer transition-all  hover:text-white"
                  >
                    <p>{link.title}</p>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="my-8 h-[1px] w-full bg-white"></div>
        <p className="text-sm font-semibold text-white ">
          &#169; 2023 Mejeng Elements Pty Ltd. Trademarks and brands aret the
          property of their respective owners.
        </p>
      </div>
    </footer>
  );
}
