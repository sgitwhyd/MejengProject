import Head from "next/head";
import Image from "next/image";
import privacy_policy_1 from "@/assets/privacy-policy-1.png";
import privacy_policy_2 from "@/assets/privacy-policy-2.png";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Mejeng</title>
        <meta name="description" content="Privacy Policy - Mejeng Platform" />
      </Head>
      <section className="flex flex-col items-center justify-center">
        <div className="flex h-[60vh] flex-col items-center justify-center">
          <h1 className="pb-10 text-5xl font-bold" data-aos="fade-up">
            Privacy Policy
          </h1>
          <h3
            className="w-1/2 text-center text-lg font-medium"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            At Mejeng, We value user privacy and uphold data security. Our
            privacy policy explains how we collect, use and protect personal
            data belonging to users on our platform.
          </h3>
        </div>
        <div className="flex items-center justify-center gap-16 py-28 px-20 text-[#122341]">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="pb-6 text-[36px] font-bold">
              Privacy & Data Policy
            </h2>
            <p className="break-words text-justify text-xl font-medium leading-loose">
              Mejeng collects user data such as email address, name, and profile
              photo, as well as user location. This data is used to create user
              profiles and enable interaction between other users. We may also
              collect data about user preferences and usage of our platform,
              which is used to improve user experience.
            </p>
          </div>
          <Image
            src={privacy_policy_1}
            alt="term of service 1"
            height={400}
            data-aos="fade-up"
            data-aos-duration="1000"
          />
        </div>
        <div className="flex flex-row-reverse items-center justify-center gap-16 px-20 pt-28 text-[#122341]">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="pb-6 text-[36px] font-bold">
              How we protect your data?
            </h2>
            <p className="break-words text-justify text-xl font-medium leading-loose">
              At Mejeng, We use appropriate technological and physical security
              measures to protect user data on our platform from unauthorized
              access, use, and alteration. We also update our policies regularly
              to ensure optimal data protection.
            </p>
          </div>
          <Image
            src={privacy_policy_2}
            alt="term of service 1"
            height={400}
            data-aos="fade-up"
            data-aos-duration="1000"
          />
        </div>
      </section>
    </>
  );
}
