import React from "react";
import { nunito } from "@utils/font";

export default function LayoutAdmin({ children }) {
  return (
    <>
      <main className={nunito.className}>{children}</main>
    </>
  );
}
