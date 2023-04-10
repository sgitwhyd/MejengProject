import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { plusJakartaSans } from "@/utils/font";

export default function LayoutAdmin({ children }) {
  return (
    <>
      <Navbar />
      <main
        className={`mx-auto max-w-screen-2xl px-[47px] py-40 ${plusJakartaSans.className}`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
