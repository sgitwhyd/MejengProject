import React from "react";
import { TiPlus } from "react-icons/ti";

export default function AdminAddFeature() {
  const Categories = [
    { name: "Web Design" },
    { name: "Mobile Design" },
    { name: "UI Components" },
    { name: "Branding" },
  ];

  const Tools = [
    { name: "Photoshop" },
    { name: "Illustrator" },
    { name: "Figma" },
    { name: "Adobe XD" },
  ];

  return (
    <>
      <header className="text-xl font-bold">Add Feature</header>
      <div className="mt-10 flex w-full flex-col items-center justify-center">
        <div className="grid grid-cols-4 gap-5">
          {Categories.map((category) => {
            return (
              <div className="flex items-center justify-center rounded-lg bg-white px-8 py-4 text-xl font-semibold">
                {category.name}
              </div>
            );
          })}
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-4 gap-5">
          {Tools.map((tool) => {
            return (
              <div className="flex items-center justify-center rounded-lg bg-white px-8 py-4 text-xl font-semibold">
                {tool.name}
              </div>
            );
          })}
        </div>
      </div>
      <label
        htmlFor="my-modal-3"
        className="absolute bottom-5 right-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-cyan-500 text-white"
      >
        <TiPlus size={23} />
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Tambahakan fitur baru untuk kategori ini
          </h3>
          <div className="form-control my-2 w-full">
            <label className="label">
              <span className="label-text">
                Pilih fitur yang mau ditambahkan
              </span>
            </label>
            <select className="select-bordered select ">
              <option disabled selected>
                Select
              </option>
              <option>Category</option>
              <option>Tools</option>
            </select>
          </div>
          <div className="form-control mb-8 w-full">
            <label className="label">
              <span className="label-text">Masukan nama fitur</span>
            </label>
            <input
              type="text"
              placeholder="Tulis disini..."
              className="input-bordered input w-full "
            />
          </div>
        </div>
      </div>
    </>
  );
}
