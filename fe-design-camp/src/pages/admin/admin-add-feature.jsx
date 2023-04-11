import { useState, useRef } from "react";
import { TiPlus } from "react-icons/ti";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/delete-modal";
import AdminCategoryModal from "@/components/modal/admin-category-modal";
import AdminToolModal from "@/components/modal/admin-tool-modal";

export default function AdminAddFeature() {
  //Category
  const [category, setCategory] = useState("");
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [isEditCategory, setIsEditCategory] = useState(false);

  // Public
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  //Tool
  const [tool, setTool] = useState("");
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
    <section className="relative h-full">
      <header className="text-xl font-bold">Add Feature</header>
      <section
        className={`mt-5 flex items-center justify-between gap-10 ${
          (isAddCategory || isAddTool || isDelete || isEditCategory) &&
          "blur-sm"
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
                      onClick={() => {
                        setIsEditCategory(true);
                        setCategory(category.name);
                      }}
                    >
                      <FiEdit3 size={18} />
                    </button>
                    <button
                      title="Delete category"
                      className="btn-error btn-sm btn-circle btn text-white"
                      onClick={() => {
                        setIsDelete(true);
                        setDeleteId(category.name);
                      }}
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
                      onClick={() => {
                        setIsDelete(true);
                        setDeleteId(tool.name);
                      }}
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

      {/* Delete modal */}
      {isDelete && (
        <DeleteModal setIsDelete={setIsDelete} deleteId={deleteId} />
      )}

      {/* Modal Add Category */}
      {isAddCategory && (
        <AdminCategoryModal
          closeModal={setIsAddCategory}
          title="Tambahakan category baru"
          category={category}
          setCategory={setCategory}
        />
      )}

      {/* Modal Edit Category */}
      {isEditCategory && (
        <AdminCategoryModal
          closeModal={setIsEditCategory}
          title="Edit nama category"
          category={category}
          setCategory={setCategory}
        />
      )}

      {/* Modal Add Tool */}
      {isAddTool && (
        <AdminToolModal
          tool={tool}
          setTool={setTool}
          setIsAddTool={setIsAddTool}
          setLogoTool={setLogoTool}
          logoTool={logoTool}
          logoToolRef={logoToolRef}
          handleLogoTool={handleLogoTool}
          handleLogoToolChange={handleLogoToolChange}
        />
      )}
      {/* Modal Add Tool End */}
    </section>
  );
}
