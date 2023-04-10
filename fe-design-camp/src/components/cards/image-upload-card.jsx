import { useRef, useState } from "react";
import Image from "next/image";
import { FcAddImage } from "react-icons/fc";
import { TbEdit, TbTrash } from "react-icons/tb";

export default function ImageUploadCard({
  image,
  title,
  handleFileChange,
  handleCancel,
}) {
  const [isEditHover, setIsEditHover] = useState(false);
  const [isDeleteHover, setIsDeleteHover] = useState(false);
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleEditMouseEnter = () => {
    setIsEditHover(true);
  };

  const handleEditMouseLeave = () => {
    setIsEditHover(false);
  };

  const handleDeleteMouseEnter = () => {
    setIsDeleteHover(true);
  };

  const handleDeleteMouseLeave = () => {
    setIsDeleteHover(false);
  };

  return (
    <div className="flex w-full items-center justify-center border p-10">
      {image ? (
        <div className="relative">
          <Image
            src={image}
            alt="Uploaded file"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
          <button
            onClick={handleEditClick}
            onMouseEnter={handleEditMouseEnter}
            onMouseLeave={handleEditMouseLeave}
            className="absolute top-0 right-0 m-2 flex rounded-full border bg-white p-2 shadow-lg hover:bg-gray-100"
          >
            <TbEdit size={20} />
            {isEditHover && <p className="text-sm">Replace Image</p>}
          </button>
          {handleCancel && (
            <button
              onClick={handleCancel}
              onMouseEnter={handleDeleteMouseEnter}
              onMouseLeave={handleDeleteMouseLeave}
              className="absolute top-11 right-0 m-2 flex rounded-full border bg-white p-2 shadow-lg hover:bg-gray-100"
            >
              <TbTrash size={20} />
              {isDeleteHover && <p className="text-sm">Delete Image</p>}
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <>
          <div
            onClick={handleEditClick}
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-5 border-2 border-dashed border-primary/40 py-10"
          >
            <h1 className="text-xl font-semibold">{title}</h1>
            <FcAddImage size={70} />
            <p className="text-center text-lg">
              Select file from your local storage
            </p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}
