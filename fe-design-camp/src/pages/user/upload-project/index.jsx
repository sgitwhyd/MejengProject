import Head from "next/head";
import { useState } from "react";
import Headline from "./headline";
import Details from "./details";
import Review from "./review";
import { WarningToast } from "@/components/toast/alert-taost";

export default function UploadProject() {
  const [step, setStep] = useState(1);

  // Headline
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");

  // Details
  const [isActived, setIsActived] = useState(false);
  const [moreImage1, setMoreImage1] = useState(false);
  const [moreImage2, setMoreImage2] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [description, setDescription] = useState("");
  const [isCategory, setIsCategory] = useState("");
  const [checkedTools, setCheckedTools] = useState([]);
  const [link, setLink] = useState("");

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <section className="mx-auto max-w-[1024px]">
      <Head>
        <title>Upload Your Project - Mejeng</title>
        <meta name="description" content="Upload your personal project here!" />
      </Head>
      <section className="mx-auto flex max-w-[800px] items-center justify-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-sm font-semibold">
          <button
            onClick={() => {
              setStep(1);
            }}
            className={`h-8 w-8 rounded-full text-white ${
              step >= 1 ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <p>1</p>
          </button>
          <p>Give a title and thumbnail image</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-sm font-semibold">
          <button
            onClick={() => {
              title.trim() === "" || thumbnail === null
                ? WarningToast("Please fill in all required fields")
                : setStep(2);
            }}
            className={`h-8 w-8 rounded-full text-white ${
              step >= 2 ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <p>2</p>
          </button>
          <p>Give some details</p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-sm font-semibold">
          <button
            onClick={() => {
              description.trim() === "" ||
              image1 === null ||
              isCategory === "" ||
              checkedTools.length === 0
                ? WarningToast("Please fill in all required fields")
                : setStep(3);
            }}
            className={`h-8 w-8 rounded-full text-white ${
              step >= 3 ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <p>3</p>
          </button>
          <p>Review your post</p>
        </div>
      </section>

      {/* Step page view */}
      {step === 1 && (
        <Headline
          title={title}
          setTitle={setTitle}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
        />
      )}
      {step === 2 && (
        <Details
          setIsActived={setIsActived}
          moreImage1={moreImage1}
          setMoreImage1={setMoreImage1}
          moreImage2={moreImage2}
          setMoreImage2={setMoreImage2}
          image1={image1}
          setImage1={setImage1}
          image2={image2}
          setImage2={setImage2}
          image3={image3}
          setImage3={setImage3}
          description={description}
          setDescription={setDescription}
          isCategory={isCategory}
          setIsCategory={setIsCategory}
          checkedTools={checkedTools}
          setCheckedTools={setCheckedTools}
          isActived={isActived}
          link={link}
          setLink={setLink}
        />
      )}
      {step === 3 && (
        <Review
          title={title}
          thumbnail={thumbnail}
          description={description}
          image1={image1}
          moreImage1={moreImage1}
          image2={image2}
          moreImage2={moreImage2}
          image3={image3}
          isCategory={isCategory}
          checkedTools={checkedTools}
          isActived={isActived}
          link={link}
        />
      )}

      {/* Step button */}
      <div className="mt-10 flex w-full items-center justify-end">
        {step === 1 && (
          <button
            className="w-[125px] rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80"
            onClick={() => {
              title.trim() === "" || thumbnail === null
                ? WarningToast("Please fill in all required fields")
                : setStep(2);
            }}
          >
            Next
          </button>
        )}
        {step === 2 && (
          <div className="flex items-center justify-center gap-3">
            <button
              className="w-[125px] rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80"
              onClick={handlePrevStep}
            >
              Prev
            </button>
            <button
              className="w-[125px] rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80"
              onClick={() => {
                description.trim() === "" ||
                image1 === null ||
                isCategory === "" ||
                checkedTools.length === 0
                  ? WarningToast("Please fill in all required fields")
                  : setStep(3);
              }}
            >
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="flex items-center justify-center gap-3">
            <button
              className="w-[125px] rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80"
              onClick={handlePrevStep}
            >
              Prev
            </button>
            <button className="w-[125px] rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80">
              Publish
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
