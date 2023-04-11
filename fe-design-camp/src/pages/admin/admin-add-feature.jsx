import { useState, useRef } from "react";
import { TiPlus } from "react-icons/ti";
import { FiEdit3, FiTrash2, FiUpload } from "react-icons/fi";
import Image from "next/image";

export default function AdminAddFeature() {
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [isAddTool, setIsAddTool] = useState(false);

  const [logoTool, setLogoTool] = useState(null);
  const logoToolRef = useRef(null);

  const handleLogoTool = () => {
    logoToolRef.current.click();
  };

  const handleLogoToolChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoTool(URL.createObjectURL(e.target.files[0]));
    }
  };

  const Categories = [
    { id: 1, name: "Web Design" },
    { id: 2, name: "Mobile Design" },
    { id: 3, name: "UI Components" },
    { id: 4, name: "Branding" },
  ];

  const Tools = [
    { id: 1, icon: "PS", name: "Photoshop" },
    { id: 2, icon: "AI", name: "Illustrator" },
    { id: 3, icon: "FI", name: "Figma" },
    { id: 4, icon: "XD", name: "Adobe XD" },
  ];

  return (
    <section className="relative">
      <header className="text-xl font-bold">Add Feature</header>
      <section
        className={`mt-5 flex items-center justify-between gap-10 ${
          (isAddCategory || isAddTool) && "blur-sm"
        }`}
      >
        {/* Table Categories */}
        <div className="flex-1 overflow-x-auto">
          <h1 className="font-bold">Categories</h1>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Categories.map((category) => (
                <tr key={category.id}>
                  <th>{category.id}</th>
                  <td>{category.name}</td>
                  <td className="flex gap-1">
                    <button
                      title="Edit category"
                      className="btn-info btn-sm btn-circle btn text-white"
                    >
                      <FiEdit3 size={18} />
                    </button>
                    <button
                      title="Delete category"
                      className="btn-error btn-sm btn-circle btn text-white"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="active">
                <td colSpan={3} className="text-center">
                  <button
                    className="flex w-full items-center justify-center gap-2 text-lg font-bold"
                    onClick={() => setIsAddCategory(true)}
                  >
                    <TiPlus size={18} />
                    Add new category
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table Tools */}
        <div className="flex-1 overflow-x-auto">
          <h1 className="font-bold">Tools</h1>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Icon</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Tools.map((tool) => (
                <tr key={tool.id}>
                  <th>{tool.id}</th>
                  <td>{tool.icon}</td>
                  <td>{tool.name}</td>
                  <td className="flex gap-1">
                    <button
                      title="Edit tool"
                      className="btn-info btn-sm btn-circle btn text-white"
                    >
                      <FiEdit3 size={18} />
                    </button>
                    <button
                      title="Delete tool"
                      className="btn-error btn-sm btn-circle btn text-white"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="active">
                <td colSpan={4} className="text-center">
                  <button
                    className="flex w-full items-center justify-center gap-2 text-lg font-bold"
                    onClick={() => setIsAddTool(true)}
                  >
                    <TiPlus size={18} />
                    Add new tool
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal Add Category */}
      {isAddCategory && (
        <div className="absolute right-0 left-0 top-0 z-[99] mx-auto my-auto w-[478px] translate-y-1/2 rounded-2xl border bg-white p-6 shadow-lg drop-shadow-xl">
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <label
              className="btn-sm btn-circle btn absolute -right-2 -top-2"
              onClick={() => setIsAddCategory(false)}
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Tambahakan category baru</h3>
            <div className="mb-8 w-full">
              <label className="label">
                <span className="label-text">Nama category</span>
              </label>
              <input
                type="text"
                placeholder="Tulis disini..."
                className="input-bordered input w-full "
              />
            </div>
            <div className="flex gap-2">
              <button
                className="btn-error btn-sm btn text-white"
                onClick={() => setIsAddCategory(false)}
              >
                Cancel
              </button>
              <button className="btn-success btn-sm btn text-white">Yes</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Add Category End*/}

      {/* Modal Add Tool */}
      {isAddTool && (
        <div
          className={`absolute right-0 left-0 bottom-0 z-[99] mx-auto my-auto w-[478px] rounded-2xl border bg-white p-6 shadow-lg drop-shadow-xl ${
            logoTool && "-bottom-10"
          }`}
        >
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <label
              className="btn-sm btn-circle btn absolute -right-2 -top-2"
              onClick={() => {
                setIsAddTool(false);
                setLogoTool(null);
              }}
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Tambahakan tool baru</h3>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Logo tool</span>
              </label>
              <div className="relative">
                {logoTool ? (
                  <div className="relative w-1/3">
                    <Image
                      src={logoTool}
                      alt="Uploaded file"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={handleLogoTool}
                      className="absolute top-0 right-0 m-2 flex rounded-full border bg-white p-2 shadow-lg hover:bg-gray-100"
                    >
                      <FiEdit3 size={20} />
                    </button>
                    <input
                      type="file"
                      ref={logoToolRef}
                      className="hidden"
                      onChange={handleLogoToolChange}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      onClick={handleLogoTool}
                      className="flex w-1/3 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/40 py-3 font-semibold"
                    >
                      <FiUpload size={18} />
                      <p>Upload logo</p>
                    </div>
                    <input
                      type="file"
                      ref={logoToolRef}
                      className="hidden"
                      onChange={handleLogoToolChange}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="mb-8 w-full">
              <label className="label">
                <span className="label-text">Nama tool</span>
              </label>
              <input
                type="text"
                placeholder="Tulis disini..."
                className="input-bordered input w-full"
              />
            </div>
            <div className="flex gap-2">
              <button
                className="btn-error btn-sm btn text-white"
                onClick={() => {
                  setIsAddTool(false);
                  setLogoTool(null);
                }}
              >
                Cancel
              </button>
              <button className="btn-success btn-sm btn text-white">Yes</button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Add Tool End */}
    </section>
  );
}
