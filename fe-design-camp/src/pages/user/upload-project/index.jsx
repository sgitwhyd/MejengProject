import Head from "next/head";
import { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import Image from "next/image";

export default function UploadProject() {
  const [step, setStep] = useState(true);
  const [thumbnail, setThumbnail] = useState(null);
  const [charactersLeave, setCharactersLeave] = useState(100);

  const handleStep = () => {
    setStep(true);
  };

  const handleCharactersLeave = (e) => {
    const inputLength = e.target.value.length;
    setCharactersLeave(100 - inputLength);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <Head>
        <title>Upload Your Project - Mejeng</title>
        <meta name="description" content="Upload your personal project here!" />
      </Head>

      <section className="mx-auto flex max-w-[800px] items-center justify-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-sm font-semibold">
          <button
            className={`h-8 w-8 rounded-full text-white ${
              step ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <p>1</p>
          </button>
          <p>Give a title and thumbnail image</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-sm font-semibold">
          <button
            className={`h-8 w-8 rounded-full text-white ${
              !step ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <p>2</p>
          </button>
          <p>Give some details</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-sm font-semibold">
          <button
            className={`h-8 w-8 rounded-full text-white ${
              !step ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <p>3</p>
          </button>
          <p>Review your post</p>
        </div>
      </section>

      <section className="mt-10 mb-5 flex flex-col items-center justify-center gap-5 px-10">
        <div className="relative flex w-full flex-col items-center justify-center gap-3">
          <label className="text-2xl font-medium">Your title here</label>
          <input
            type="text"
            className="duraiton-300 w-full rounded-md border px-4 py-4 text-lg font-semibold outline-slate-400 transition-all"
            placeholder="...."
            maxLength={100}
            onChange={handleCharactersLeave}
          />
          <p className="absolute bottom-1 right-2 text-xs">
            {charactersLeave} characters leave
          </p>
        </div>
        <div className="flex w-full items-center justify-center border p-10">
          {thumbnail ? (
            <div className="relative">
              <Image
                src={thumbnail}
                alt="Uploaded file"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <>
              <div
                onClick={() => document.getElementById("fileInput").click()}
                className="flex w-full cursor-pointer flex-col items-center justify-center gap-5 border-2 border-dashed border-primary/40 py-10"
              >
                <h1 className="text-xl font-semibold">
                  Upload your Project Thumbnail
                </h1>
                <FcAddImage size={70} />
                <p className="text-center text-lg">
                  Drag and drop an image, or Browse on your local
                </p>
              </div>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
            </>
          )}
        </div>
        <div className="mt-10 flex w-full items-center justify-end">
          <button className="rounded-lg bg-primary px-10 py-2 font-semibold text-white transition-all hover:bg-primary/80">
            Next
          </button>
        </div>
      </section>
    </>
  );
}
