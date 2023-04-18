import Head from "next/head";
import Image from "next/image";
import ulin from "@/assets/ulin.png";
import doni from "@/assets/doni.png";
import sigit from "@/assets/sigit.png";
import nicko from "@/assets/nicko.png";
import our_mejeng from "@/assets/our-mejeng.png";
import information_1 from "@/assets/information-1.png";
import information_2 from "@/assets/information-2.png";

export default function Information() {
  const datas = [
    {
      name: "Aldilla Ulinnaja",
      position: "Front End Developer Mejeng",
      image: ulin,
      description:
        "Happy and proud of the attractive user interface and interaction.",
    },
    {
      name: "Doni Wahyu",
      position: "Back End Developer Mejeng",
      image: doni,
      description:
        "Proud of efficient and secure website infrastructure for users.",
    },
    {
      name: "Sigit Wahyudi",
      position: "Full Stack Developer Mejeng",
      image: sigit,
      description:
        "Excited by the implementation that is easily accessible to users.",
    },
    {
      name: "Nicko Ilham",
      position: "UI/UX Designer Mejeng",
      image: nicko,
      description:
        "Satisfied with the design that helps creators promote their work.",
    },
  ];

  const content = [
    {
      title: "Our Vision",
      image: our_mejeng,
      description:
        "At Mejeng, we believe that every creator deserves a platform to showcase their best work and connect with other creators. Our vision is to create a community-driven platform that empowers creators to build their brands and explore new opportunities in the design industry.",
    },
    {
      title: "Our Approach",
      image: information_1,
      description:
        "We focus on inclusivity and diversity, and we strive to provide a safe and supportive space for all members. We prioritize transparency and collaboration, working closely with creators to ensure that our platform meets their needs and expectations.",
    },
    {
      title: "Our Process",
      image: information_2,
      description:
        "Our process involves working with creators to showcase their work in the best possible way, using a variety of tools and resources to highlight their unique style and approach. We provide personalized support and guidance to help creators build their brands and engage with our community, from creating compelling profiles to participating in group discussions and collaborations.",
    },
  ];
  return (
    <>
      <Head>
        <title>About Us - Mejeng</title>
        <meta name="description" content="About Us - Mejeng Platform" />
      </Head>
      <section className="flex flex-col items-center justify-center">
        <h1 className="pb-4 text-xl font-bold text-primary" data-aos="fade-up">
          About Us
        </h1>
        <h2
          className="pb-12 text-5xl font-bold"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          The Team of Mejeng Project
        </h2>
        <div className="grid w-full grid-cols-4 gap-5 text-center">
          {datas.map((data, index) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center justify-center rounded-md border px-3 py-11 transition-all duration-300 hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-duration={index * 200 + 600}
            >
              <Image
                src={data.image}
                alt={data.name}
                height={120}
                width={120}
                className="pb-[30px]"
              />
              <p className="font-medium text-[#737373]">{data.description}</p>
              <h3 className="py-4 text-lg font-semibold text-primary">
                {data.name}
              </h3>
              <p className="text-sm font-semibold text-[#252B42]">
                {data.position}
              </p>
            </div>
          ))}
        </div>
        {content.map((data, index) => (
          <div
            key={index}
            className={`flex ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } items-center justify-center gap-16 px-20 pt-28 text-[#122341]`}
          >
            <div
              className="flex w-full flex-col items-start justify-center text-justify "
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <h2 className="pb-6 text-5xl font-bold">{data.title}</h2>
              <p className="break-words text-xl font-medium leading-loose">
                {data.description}
              </p>
            </div>
            <Image
              src={data.image}
              alt="Information Mejeng About Us"
              width={450}
              data-aos="fade-up"
              data-aos-duration="1000"
            />
          </div>
        ))}
      </section>
    </>
  );
}
