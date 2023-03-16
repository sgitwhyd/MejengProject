import React from "react";
import Navbar from "./main/navbar/navbar";
import Footer from "./main/footer/footer";

export default function LayoutAdmin({ children }) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">{children}</main>
      <Footer />
    </>
  );
}
