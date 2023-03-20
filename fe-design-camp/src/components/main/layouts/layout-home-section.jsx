import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function LayoutHomeSection({
  categoryTitle,
  categoryDesc,
  seeMoreRoute,
  children,
}) {
  return (
    <section className="flex flex-col items-end gap-7">
      <div className="flex items-center justify-between gap-[40px]">
        <div className="flex flex-col">
          <h2 className="text-[40px] font-bold text-secondary">
            {categoryTitle}
          </h2>
          <p className="w-10/12 text-xl">{categoryDesc}</p>
        </div>
        <div className="flex items-center justify-center gap-10">
          {children}
        </div>
      </div>
      <Link
        href={seeMoreRoute}
        className="flex items-center justify-center gap-1 rounded-lg bg-secondary px-3 py-2 text-white"
      >
        <p className="font-semibold">See More</p>
        <FaArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
