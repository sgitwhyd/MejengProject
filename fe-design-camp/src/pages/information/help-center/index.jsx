import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import help from "@/assets/help.png";
import { FaQuestionCircle } from "react-icons/fa";
import faq from "@/assets/icons/flat-color-icons_faq.png";
import faq_active from "@/assets/icons/flat-color-icons_faq_active.png";
import guide from "@/assets/icons/ic_round-menu-book.png";
import guide_active from "@/assets/icons/ic_round-menu-book_active.png";
import community from "@/assets/icons/fluent_people-community-24-filled.png";
import community_active from "@/assets/icons/fluent_people-community-24-filled_active.png";

export default function HelpCenter() {
  const [isActive, setIsActive] = useState("FAQs");

  const datas = [
    { name: "FAQs", icon: faq, icon_active: faq_active },
    { name: "Guides", icon: guide, icon_active: guide_active },
    { name: "Community", icon: community, icon_active: community_active },
  ];

  const faqs = [
    {
      question: "What is Mejeng?",
      answer:
        "Mejeng is a website platform that allows Design Creators to showcase their best work and interact with other users interested in design.",
    },
    {
      question: "What are the benefits of joining Mejeng?",
      answer:
        "Joining Mejeng gives Design Creators the opportunity to build their portfolio, find inspiration, and connect with fellow creators and design enthusiasts.",
    },
    {
      question: "How to enroll in Mejeng?",
      answer:
        "To register with Mejeng, visit our website and click the Register button. Fill in the required information and verify your email to start using our platform.",
    },
  ];

  const guides = [
    {
      question: "Create an Attractive Profile",
      answer:
        "This guide provides tips and tricks to create an attractive Mejeng profile that can attract other users.",
    },
    {
      question: "Showcasing Your Best Work",
      answer:
        "This guide discusses the best ways to showcase your best work at Mejeng, including how to create an attractive design gallery.",
    },
    {
      question: "Collaborate with other users in Mejeng",
      answer:
        "You can find new collaboration partners and expand your network by joining creative projects with other users.",
    },
  ];

  const communities = [
    {
      question: "Participate in discussions on Mejeng Platform",
      answer:
        "You can participate in discussions about design and find new inspiration from other users.",
    },
    {
      question: "Network with other creators",
      answer:
        "Joining Mejeng provides the opportunity to network with fellow creators, opening up new opportunities in the design industry.",
    },
    {
      question: "Collaboration with other creators at Mejeng",
      answer:
        "You can find new collaboration partners and expand your network by joining creative projects with other creators.",
    },
  ];
  return (
    <>
      <Head>
        <title>Help Center - Mejeng</title>
        <meta name="description" content="Help Center - Mejeng Platform" />
      </Head>
      <section className="flex flex-col items-center justify-center">
        <div className="flex h-[65vh] flex-col items-center justify-center">
          <h1 className="pb-10 text-5xl font-bold" data-aos="fade-up">
            Help Center
          </h1>
          <Image
            src={help}
            alt="help center"
            width={360}
            className="my-5"
            data-aos="fade-up"
            data-aos-duration="600"
          />
          <p
            className="text-center text-lg font-medium"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Hello, what can we do for you?
          </p>
          <p
            className="text-center text-lg font-medium"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            We can help with your problems using our platform.
          </p>
        </div>
        <div
          className="flex items-center justify-center gap-8 pt-20 pb-6"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {datas.map((data, index) => (
            <div
              key={index}
              onClick={() => setIsActive(data.name)}
              className={`flex h-[150px] w-[150px] cursor-pointer flex-col items-center justify-center rounded-xl  drop-shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                isActive === data.name
                  ? "border border-primary bg-primary text-white"
                  : "border border-gray-100 bg-white"
              }`}
            >
              <Image
                src={isActive === data.name ? data.icon_active : data.icon}
                alt={data.name}
                width={80}
              />
              <p className="text-xl font-semibold">{data.name}</p>
            </div>
          ))}
        </div>

        <div
          className="flex w-[664px] flex-col items-center justify-center gap-3"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {isActive === "FAQs" && (
            <>
              <h2 className="pt-10 pb-6 text-3xl font-bold">FAQs</h2>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="collapse-arrow rounded-box collapse border border-base-300 bg-base-100"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-xl font-medium peer-checked:bg-base-300">
                    {faq.question}
                  </div>
                  <div className="collapse-content">
                    <p className="pt-2">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </>
          )}
          {isActive === "Guides" && (
            <>
              <h2 className="pt-10 pb-6 text-3xl font-bold">Guides</h2>
              {guides.map((guide, index) => (
                <div
                  key={index}
                  className="collapse-arrow rounded-box collapse border border-base-300 bg-base-100"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-xl font-medium peer-checked:bg-base-300">
                    {guide.question}
                  </div>
                  <div className="collapse-content">
                    <p className="pt-2">{guide.answer}</p>
                  </div>
                </div>
              ))}
            </>
          )}
          {isActive === "Community" && (
            <>
              <h2 className="pt-10 pb-6 text-3xl font-bold">Community</h2>
              {communities.map((community, index) => (
                <div
                  key={index}
                  className="collapse-arrow rounded-box collapse border border-base-300 bg-base-100"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-xl font-medium peer-checked:bg-base-300">
                    {community.question}
                  </div>
                  <div className="collapse-content">
                    <p className="pt-2">{community.answer}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}
