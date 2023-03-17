import React from "react";
import logo from "@/assets/mejeng.webp";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

export default function Navbar() {
  return (
    <nav className=" absolute w-full shadow-md">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center justify-center gap-12 font-medium">
          <Image src={logo} alt="logo" height={30} />
          <Link href="/inspiration" className="hover:text-primary">
            Inspiration
          </Link>
          <Link href="/discover" className="hover:text-primary">
            Discover
          </Link>
        </div>
        <div className="flex items-center justify-center gap-11">
          <div className="flex h-12 w-96 items-center justify-center rounded-full bg-[#F0F1F2] px-5 text-[#9F9F9F]">
            <input
              type="text"
              placeholder="Cari blog dan artikel disini ..."
              className="w-full bg-transparent focus:outline-none"
            />
            <BiSearch size={20} />
          </div>
          <div className="flex items-center justify-center gap-3 ">
            <Link
              href={"/login"}
              className="rounded-[15px] py-[14px] px-8 font-bold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-primary/40 hover:drop-shadow-lg"
            >
              Log In
            </Link>
            <Link
              href={"/register"}
              className="rounded-[15px] bg-primary py-[14px] px-8 font-bold text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
