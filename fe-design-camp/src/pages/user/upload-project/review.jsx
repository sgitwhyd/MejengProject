import Image from "next/image";

export default function Review(props) {
  const { title } = props;
  const { thumbnail } = props;
  const { moreImage1 } = props;
  const { moreImage2 } = props;
  const { image1 } = props;
  const { image2 } = props;
  const { image3 } = props;
  const { description } = props;
  const { isCategory } = props;
  const { checkedTools } = props;
  const { isActived } = props;
  const { link } = props;

  return (
    <>
      <h1 className="py-8 text-center font-light">
        *Preview your post before upload
      </h1>
      <div className="flex w-full flex-col items-center justify-center border px-10">
        <div className="relative my-8 flex flex-col items-start justify-center gap-5">
          <label className=" text-2xl font-semibold text-primary">
            {title}
          </label>
          <Image
            src={thumbnail}
            alt="Uploaded file"
            width={500}
            height={500}
            className="h-full w-full rounded-lg object-cover"
          />
          {/* <div className="my-5 h-[2px] w-full bg-[#D9D9D9]"></div> */}
          <div className="px-12 py-5 text-xl ">
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
          <Image
            src={image1}
            alt={`${title} image 1`}
            width={500}
            height={500}
            className="h-full w-full rounded-lg object-cover"
          />
          {moreImage1 && (
            <Image
              src={image2}
              alt={`${title} image 2`}
              width={500}
              height={500}
              className="h-full w-full rounded-lg object-cover"
            />
          )}
          {moreImage2 && (
            <Image
              src={image3}
              alt={`${title} image 3`}
              width={500}
              height={500}
              className="h-full w-full rounded-lg object-cover"
            />
          )}
          {isActived && (
            <div class="flex w-full items-center justify-center py-2">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center rounded border-b-2 border-blue-500 bg-white py-3 px-6 font-bold tracking-wide text-gray-800 shadow-md transition-all duration-200 hover:border-blue-600 hover:bg-blue-500 hover:text-white"
              >
                See full detail project here
              </a>
            </div>
          )}
          <div className="flex w-full justify-between text-lg font-semibold">
            <p className="text-lg font-semibold">
              Category - <span>{isCategory}</span>
            </p>
            <div className="inline-flex gap-1">
              <label>Tools</label>
              <p className="flex flex-col">
                {checkedTools.map((tool, index) => (
                  <span key={index}> - {tool}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
