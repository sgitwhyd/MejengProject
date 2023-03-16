import React from "react";
import { MdPostAdd } from "react-icons/md";
import { FaUserFriends, FaUserCheck } from "react-icons/fa";

export default function AdminHome() {
  const datas = [
    { name: "All Post", total: 346 },
    { name: "Active User", total: 1125 },
    { name: "Total Creator", total: 28 },
    { name: "Report User", total: 5 },
  ];

  return (
    <>
      <header className="text-xl font-bold">Home</header>
      <section className="mt-10 grid grid-cols-4 gap-10">
        <div className="flex items-center justify-center gap-5 rounded-2xl bg-white p-6 shadow-md">
          <div className="rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 p-6 text-white shadow-lg shadow-blue-500/40">
            <MdPostAdd size={40} />
          </div>
          <div className="flex h-full flex-col justify-evenly">
            <h2 className="text-lg font-semibold text-black/60">
              {datas[0].name}
            </h2>
            <p className="text-2xl font-extrabold">{datas[0].total}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 rounded-2xl bg-white p-6 shadow-md">
          <div className="rounded-2xl bg-gradient-to-tr from-pink-600 to-pink-400 p-6 text-white shadow-lg shadow-pink-500/40">
            <FaUserFriends size={40} />
          </div>
          <div className="flex h-full flex-col justify-evenly">
            <h2 className="text-lg font-semibold text-black/60">
              {datas[1].name}
            </h2>
            <p className="text-2xl font-extrabold">{datas[1].total}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 rounded-2xl bg-white p-6 shadow-md">
          <div className="rounded-2xl bg-gradient-to-tr from-green-600 to-green-400 p-6 text-white shadow-lg shadow-green-500/40">
            <FaUserCheck size={40} />
          </div>
          <div className="flex h-full flex-col justify-evenly">
            <h2 className="text-lg font-semibold text-black/60">
              {datas[2].name}
            </h2>
            <p className="text-2xl font-extrabold">{datas[2].total}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 rounded-2xl bg-white p-6 shadow-md">
          <div className="rounded-2xl bg-gradient-to-tr from-orange-600 to-orange-400 p-6 text-white shadow-lg shadow-orange-500/40">
            <FaUserCheck size={40} />
          </div>
          <div className="flex h-full flex-col justify-evenly">
            <h2 className="text-lg font-semibold text-black/60">
              {datas[3].name}
            </h2>
            <p className="text-2xl font-extrabold">{datas[3].total}</p>
          </div>
        </div>
      </section>
    </>
  );
}
