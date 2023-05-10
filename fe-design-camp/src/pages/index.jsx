import Head from "next/head";
import hero from "@/assets/hero.webp";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { MdOutlineDesignServices, MdGroups } from "react-icons/md";
import { CgDesignmodo } from "react-icons/cg";
import banner_1 from "@/assets/banner-1.png";
import banner_2 from "@/assets/banner-2.png";

export default function Home() {
  const banner = [
    {
      title: "FIND YOUR INSPIRATION DESIGN",
      button: "See Inspirations Page",
      link: "/project/inspirations",
      image: banner_1,
    },
    {
      title: "FIND THE DESIGN CATEGORY YOU WANT",
      button: "Discover All Project",
      link: "/project/discover",
      image: banner_2,
    },
  ];

  return (
    <>
      <Head>
        <title>Mejeng</title>
        <meta
          name="description"
          content="Mejeng adalah platform untuk para desain creator berbagi karya dan pamer karya!"
        />
      </Head>
      <section className="flex flex-col items-center justify-center gap-32">
        {/* Hero */}
        <div className="relative flex h-[60vh] items-center justify-center gap-10 pt-12">
          <div className="relative z-30 flex flex-col items-start justify-center gap-8">
            <h1
              className="text-3xl font-bold leading-snug text-primary md:text-4xl lg:text-5xl"
              data-aos="fade-up"
            >
              Share and discover your design <br className="hidden md:block" />{" "}
              creativity <span className="text-secondary">with us.</span>
            </h1>
            <p
              className="text-lg font-medium md:text-xl"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              Mejeng is a platform designed to give Design Creators a space{" "}
              <br className="hidden md:block" /> to showcase their work and
              connect with other users.
            </p>
            <Link
              href="/project/inspirations"
              className="flex h-[40px] w-[200px] items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/80 hover:text-white"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Find out more <BsArrowRightShort className="h-5 w-5" />
            </Link>
          </div>
          <Image
            src={hero}
            alt="hero"
            width={465}
            height={465}
            className="absolute opacity-25 lg:relative lg:block lg:opacity-100"
          />
        </div>

        <div className="pt-10 text-center">
          <h2
            className="pb-5 text-2xl font-bold text-primary"
            data-aos="fade-up"
          >
            Best platform for{" "}
            <span className="text-secondary">Showcase Project Design</span>
          </h2>
          <p
            className="mx-auto w-full text-justify text-base text-gray-700 md:w-10/12 md:text-center md:text-lg lg:w-2/3"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            Mejeng is a platform designed to provide a space for Design Creators
            to showcase their work and connect with other users. This platform
            will provide features such as design galleries, user profiles, and
            discussion forums to expand the creator network and inspire. This
            platform is a useful platform for creators to build their brand and
            new opportunities in the design industry.
          </p>
        </div>

        {/* Card Services */}
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-14">
          <div
            className="relative flex h-[370px] w-[310px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white px-8 text-center shadow-sm drop-shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-[#5B72EE]/10 lg:h-[320px] lg:w-[350px] lg:gap-6"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="absolute top-0 flex h-14 w-14 -translate-y-7 items-center justify-center rounded-full border-2 border-white bg-[#5B72EE] p-3 text-white">
              <MdOutlineDesignServices className="h-8 w-8" />
            </div>
            <h3 className="w-3/4 text-lg font-semibold lg:w-2/3">
              Diverse Design Tools and Categories
            </h3>
            <p className="text-gray-700">
              Mejeng offers a complete and varied range of Design Tools and
              Categories, which can help Design Creators better express their
              creativity and create more interesting and innovative works.
            </p>
          </div>
          <div
            className="relative flex h-[370px] w-[310px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white px-8 text-center shadow-sm drop-shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-purple-500/10 lg:h-[320px] lg:w-[350px] lg:gap-6"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="absolute top-0 flex h-14 w-14 -translate-y-7 items-center justify-center rounded-full bg-purple-500 p-3 text-white">
              <CgDesignmodo className="h-8 w-8" />
            </div>
            <h3 className="w-3/4 text-lg font-semibold lg:w-2/3">
              Easy to use Platform for any Users
            </h3>
            <p className="text-gray-700">
              Mejeng is designed with a user friendly interface that is easy to
              use, even for laymen. Users can easily showcase their works and
              explore new design ideas on the Mejeng platform.
            </p>
          </div>
          <div
            className="relative flex h-[370px] w-[310px] cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white px-8 text-center shadow-sm drop-shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-blue-400/10 lg:h-[320px] lg:w-[350px] lg:gap-6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="absolute top-0 flex h-14 w-14 -translate-y-7 items-center justify-center rounded-full bg-blue-400 p-3 text-white">
              <MdGroups className="h-8 w-8" />
            </div>
            <h3 className="w-3/4 text-lg font-semibold lg:w-2/3">
              Discussion Forum to share Design Ideas
            </h3>
            <p className="text-gray-700">
              Mejeng is also a discussion forum, where Design Creators can
              exchange ideas and provide feedback to each other to help improve
              the quality of design work produced and strengthen the creative
              community on the Mejeng platform.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-20">
          <div className="w-full text-center md:w-9/12 lg:w-7/12">
            <h1
              className="pb-5 text-2xl font-bold text-primary"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              What is <span className="text-secondary">Mejeng?</span>
            </h1>
            <p
              className="text-base text-gray-700 md:text-lg"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Mejeng is a platform specifically designed to give Design Creators
              the opportunity to showcase their works and connect with other
              users who are looking for design inspiration. With Mejeng, the
              creativity of Design Creators can be accommodated and displayed
              easily, so that other users can find new inspiration and explore
              various interesting design ideas.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-7 md:gap-10 lg:flex-row lg:gap-14">
            {banner.map((item, index) => (
              <div
                key={index}
                className="relative flex h-[250px] w-[380px] flex-col items-center justify-center gap-4 rounded-2xl border bg-gray-300 md:h-[300px] md:w-[450px]"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h3 className="relative z-30 text-center text-lg font-semibold tracking-wide text-white">
                  {item.title}
                </h3>
                <Link
                  href={item.link}
                  className="relative z-30 flex h-[55px] w-[200px] items-center justify-center rounded-full border border-white text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  {item.button}
                </Link>
                <Image
                  src={item.image}
                  alt={item.title}
                  className="absolute z-0 h-[250px] w-[380px] rounded-2xl bg-clip-border md:h-[300px] md:w-[450px]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
