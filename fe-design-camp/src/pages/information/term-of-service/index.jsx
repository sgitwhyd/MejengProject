import Head from "next/head";
import Image from "next/image";
import term_service_1 from "@/assets/term-service-1.png";
import term_service_2 from "@/assets/term-service-2.png";

export default function TermOfService() {
  return (
    <>
      <Head>
        <title>Term Of Service - Mejeng</title>
        <meta name="description" content="Term Of Service - Mejeng Platform" />
      </Head>
      <section className="flex flex-col items-center justify-center">
        <div className="flex h-[60vh] flex-col items-center justify-center">
          <h1 className="pb-10 text-5xl font-bold" data-aos="fade-up">
            Term of Service
          </h1>
          <h3
            className="w-1/2 text-center text-lg font-medium"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            Mejeng is a platform designed to provide a space for Design Creators
            to showcase their work and connect with other users. This Term of
            Service sets out the rules and conditions that govern the use of our
            platform, and it is expected that all users comply with these rules.
          </h3>
        </div>
        <div className="flex items-center justify-center gap-16 py-28 px-20 text-[#122341]">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="pb-6 text-[36px] font-bold">
              DESCRIPTION OF SERVICE
            </h2>
            <p className="break-words text-justify text-xl font-medium leading-loose">
              Mejeng is a design showcase website platform that provides a space
              for Design Creators to showcase their best work and interact with
              other users interested in design. We also provide design gallery
              features, user profiles, and discussion forums to enhance user
              experience.
            </p>
          </div>
          <Image
            src={term_service_1}
            alt="term of service 1"
            height={400}
            data-aos="fade-up"
            data-aos-duration="1000"
          />
        </div>
        <div className="flex flex-row-reverse items-center justify-center gap-16 px-20 pt-28 text-[#122341]">
          <div data-aos="fade-up" data-aos-duration="800">
            <h2 className="pb-6 text-[36px] font-bold">
              By using Mejeng, You agree to the following Terms and Conditions :
            </h2>
            <ol className="list-inside list-decimal break-words text-justify text-xl font-medium leading-loose">
              <li className="py-2">
                You are responsible for the content you share on Mejeng, and you
                warrant that such content does not violate the copyright,
                privacy rights, or intellectual property rights of others.
              </li>
              <li className="py-2">
                Mejeng reserves the right to remove any content deemed to
                violate the Terms and Conditions, and we reserve the right to
                terminate your access to our platform if you violate the Terms
                and Conditions.
              </li>
              <li className="py-2">
                You understand and agree that Mejeng is not responsible for any
                loss or damage that may occur as a result of the use or
                inability to use our platform, including loss or damage arising
                from technical errors or system failures.
              </li>
            </ol>
          </div>
          <Image
            src={term_service_2}
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
