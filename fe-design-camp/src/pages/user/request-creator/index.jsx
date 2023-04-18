import Head from "next/head";
import Button from "@/components/button/button";

export default function RequestCreator() {
  return (
    <>
      <Head>
        <title>Request Creator - Mejeng</title>
        <meta name="description" content="Request Creator" />
      </Head>
      <section className="flex flex-col items-center justify-center">
        <h1>Rules to become a creator in Mejeng</h1>
        <ol className="list-decimal">
          <li>
            Having a suitable design that can be showcased on Mejeng platform.
          </li>
          <li>
            Willing to collaborate and interact with others on the Mejeng
            platform.
          </li>
          <li>
            Having a valid and active account on the Mejeng platform. Not
            copying or
          </li>
          <li>
            using other people's work without permission. Maintaining the
            quality of
          </li>
          <li>
            the showcased work and staying creative in designing. Providing
            valid
          </li>
          <li>and accurate information on your Mejeng profile.</li>
        </ol>
        <p>
          We reserve the right to reject a request to become a Creator on Mejeng
          and terminate your account if the above criteria are not met or if
          there is any violation of ethics or applicable rules on your part.
        </p>
        <div className="flex w-full items-center justify-end gap-3">
          <Button route="/user/profile" name="Back" />
          <Button route="" name="Request as a creator" />
        </div>
      </section>
    </>
  );
}
