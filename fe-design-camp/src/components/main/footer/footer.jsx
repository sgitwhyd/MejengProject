import React from "react";
import Image from "next/image";
import mejengLogoWhite from "@/assets/mejeng-logo-white.svg";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="absolute w-full bg-[#282828]">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-start px-[47px] pb-[20px] pt-[83px]">
        <div className="flex w-full items-start justify-between ">
          <div className="flex flex-col text-white">
            <Image
              src={mejengLogoWhite}
              alt="mejeng-logo-white"
              className="mb-10 h-14"
            />
            <h4 className="pb-7 text-xl font-semibold">
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
          <div className="flex gap-48">
            <div className="mt-2 flex flex-col gap-[15px] text-xl font-semibold text-[#9F9F9F]">
              <h1 className="text-2xl text-white">MEET MEJENG</h1>
              <p>About Us</p>
              <p>Term of Services</p>
              <p>Privacy Policy</p>
            </div>
            <div className="mt-2 flex flex-col gap-[15px] text-xl font-semibold text-[#9F9F9F]">
              <h1 className="text-2xl text-white">Help</h1>
              <p>Help Center</p>
              <h1 className="text-2xl text-white">Creator</h1>
              <p>Become an Creator</p>
              <p>Creator Sign in</p>
            </div>
          </div>
        </div>
        <div className="my-10 h-[1px] w-full bg-white"></div>
        <p className="text-sm font-semibold text-white ">
          &#169; 2023 Mejeng Elements Pty Ltd. Trademarks and brands aret the
          property of their respective owners.
        </p>
      </div>
    </footer>
  );
}
