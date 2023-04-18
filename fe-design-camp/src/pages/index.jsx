import Head from "next/head";
import hero from "@/assets/hero.webp";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { MdOutlineDesignServices, MdGroups } from "react-icons/md";
import { CgDesignmodo } from "react-icons/cg";

export default function Home() {
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
        <div className="flex h-[60vh] items-center justify-center gap-10 pt-12">
          <div className="flex flex-col items-start justify-center gap-8">
            <h1
              className="text-5xl font-bold leading-snug text-primary"
              data-aos="fade-up"
            >
              Share and discover your design <br /> creativity{" "}
              <span className="text-secondary">with us.</span>
            </h1>
            <p
              className="text-xl font-medium"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              Mejeng is a platform designed to give Design Creators a space{" "}
              <br /> to showcase their work and connect with other users.
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
            data-aos="fade-up"
            data-aos-duration="600"
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
            className="mx-auto w-2/3 text-lg text-gray-700"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            Skilline is one powerful online software suite that combines all the
            tools needed to run a successful school or office.
          </p>
        </div>

        {/* Card Services */}
        <div className="flex items-center justify-center gap-14">
          <div
            className="relative flex h-[320px] w-[350px] cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl border border-gray-100 bg-white px-8 text-center shadow-sm drop-shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-[#5B72EE]/10"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="absolute top-0 flex h-14 w-14 -translate-y-7 items-center justify-center rounded-full border-2 border-white bg-[#5B72EE] p-3 text-white">
              <MdOutlineDesignServices className="h-8 w-8" />
            </div>
            <h3 className="w-2/3 text-lg font-semibold">
              Online Billing, Invoicing, & Contracts
            </h3>
            <p className="text-gray-700">
              Simple and secure control of your organization's financial and
              legal transactions. Send customized invoices and contracts
            </p>
          </div>
          <div
            className="relative flex h-[320px] w-[350px] cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl border border-gray-100 bg-white px-8 text-center shadow-sm drop-shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-purple-500/10"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="absolute top-0 flex h-14 w-14 -translate-y-7 items-center justify-center rounded-full bg-purple-500 p-3 text-white">
              <CgDesignmodo className="h-8 w-8" />
            </div>
            <h3 className="w-2/3 text-lg font-semibold">
              Easy Scheduling & Attendance Tracking
            </h3>
            <p className="text-gray-700">
              Schedule and reserve classrooms at one campus or multiple
              campuses. Keep detailed records of student attendance
            </p>
          </div>
          <div
            className="relative flex h-[320px] w-[350px] cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl border border-gray-100 bg-white px-8 text-center shadow-sm drop-shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-blue-400/10"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="absolute top-0 flex h-14 w-14 -translate-y-7 items-center justify-center rounded-full bg-blue-400 p-3 text-white">
              <MdGroups className="h-8 w-8" />
            </div>
            <h3 className="w-2/3 text-lg font-semibold">
              Customer Tracking & Colaborative work
            </h3>
            <p className="text-gray-700">
              Automate and track emails to individuals or groups. Skilline's
              built-in system helps organize your organization
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-20">
          <div className="w-7/12 text-center">
            <h1
              className="pb-5 text-2xl font-bold text-primary"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              What is <span className="text-secondary">Mejeng?</span>
            </h1>
            <p
              className="text-lg text-gray-700"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Skilline is a platform that allows educators to create online
              classes whereby they can store the course materials online; manage
              assignments, quizzes and exams; monitor due dates; grade results
              and provide students with feedback all in one place.
            </p>
          </div>
          <div className="flex items-center justify-center gap-14">
            <div
              className="flex h-[300px] w-[450px] flex-col items-center justify-center gap-4 rounded-2xl border bg-gray-300"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h3 className="text-lg font-semibold tracking-wide text-white">
                FOR CREATOR
              </h3>
              <Link
                href="/"
                className="flex h-[55px] w-[200px] items-center justify-center rounded-full border border-white text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
              >
                See Inspirations Page
              </Link>
            </div>
            <div
              className="flex h-[300px] w-[450px] flex-col items-center justify-center gap-4 rounded-2xl border bg-gray-300"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h3 className="text-lg font-semibold tracking-wide text-white">
                FOR USER
              </h3>
              <Link
                href="/"
                className="flex h-[55px] w-[200px] items-center justify-center rounded-full border border-white text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
              >
                Discover All Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
