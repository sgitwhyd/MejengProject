import React from "react";
import Navbar from "./main/navbar/navbar";
import Footer from "./main/footer/footer";
import { plusJakartaSans } from "@/utils/font";

export default function LayoutAdmin({ children }) {
  return (
    <>
      <Navbar />
      <main
        className={`max-w-screen-[1440px] container py-40 ${plusJakartaSans.className}`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
