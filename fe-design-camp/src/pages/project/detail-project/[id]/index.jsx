import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import ButtonWIcon from "@/components/button/button-w-icon";
import { AiFillLike, AiFillHeart, AiFillEye } from "react-icons/ai";

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;

  const datas = {
    author: "Nicko Ilham",
    authorImage: "https://ui-avatars.com/api/?background=random",
    title: "Mobile Application for Plant Businesses",
    thumbnail: "https://picsum.photos/seed/pasdmaa/600/325",
    description: `
    <p>
      In today's digital era, having a strong online presence is crucial for
      businesses. This includes having an <b>e-commerce platform</b> and a
      mobile application to make it easier for customers to access products
      and services. For businesses that sell plants and gardening products,
      having a mobile application is especially important as it allows
      customers to browse through a wide selection of plants and make
      purchases on-the-go. With the convenience of a mobile application,
      customers can place orders, track deliveries, and receive
      notifications on new products and special offers. 👨‍🌾🌼🌺🌻🌱 <br /> By
      making the shopping experience more convenient and personalized, a
      mobile application can help a plant business stand out in a
      competitive market and attract new customers.😇😁☺👌
    </p>`,
    image1: "https://picsum.photos/seed/asdacwa/700/300",
    image2: "https://picsum.photos/seed/cwa/700/300",
    image3: "",
    totalLike: 140,
    totalView: 350,
    date: "08 March 2023",
  };

  return (
    <section>
      <h1 className="pb-7 text-3xl font-bold uppercase text-primary">
        {datas.title} {id}
      </h1>

      <div className="flex items-center justify-start gap-2 pb-3">
        <Image
          width={32}
          height={32}
          src={datas.authorImage}
          className="rounded-full"
          alt={datas.author}
        />
        <p
          className="w-[150px] truncate text-left font-semibold"
          title={datas.author}
        >
          {datas.author}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Image
          src={datas.thumbnail}
          alt="Uploaded file"
          width={500}
          height={500}
          className="h-full w-full rounded-xl object-cover"
        />
        <div className="px-12 py-5 text-xl ">
          <div
            dangerouslySetInnerHTML={{
              __html: datas.description,
            }}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <Image
            src={datas.image1}
            alt="Uploaded file"
            width={500}
            height={500}
            className="h-full w-full rounded-xl object-cover"
          />
          {datas.image2 && (
            <Image
              src={datas.image2}
              alt="Uploaded file"
              width={500}
              height={500}
              className="h-full w-full rounded-xl object-cover"
            />
          )}
          {datas.image3 && (
            <Image
              src={datas.image3}
              alt="Uploaded file"
              width={500}
              height={500}
              className="h-full w-full rounded-xl object-cover"
            />
          )}
          <div className="flex w-full flex-col items-center justify-center gap-8 bg-[#122341] p-16 text-white">
            <h3 className="text-2xl font-semibold capitalize">{datas.title}</h3>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80">
              <AiFillLike size={18} /> Appreciate
            </button>
            <div className="flex items-center justify-center gap-2 font-medium">
              <p className="pr-5">Published : {datas.date}</p>
              <div className="flex items-center justify-center gap-1 text-sm text-white">
                <button>
                  <AiFillHeart className="h-5 w-5 transition-all duration-300 hover:text-gray-300" />
                </button>
                <p>{datas.totalLike}</p>
              </div>
              <div className="flex items-center justify-center gap-1 text-sm text-white">
                <AiFillEye className="h-5 w-5 transition-all duration-300 hover:text-gray-300" />
                <p>{datas.totalView}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>komentar</div>
    </section>
  );
}
