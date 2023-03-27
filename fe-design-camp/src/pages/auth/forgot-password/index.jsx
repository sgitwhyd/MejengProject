import Head from "next/head";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>Forgot Password - Mejeng</title>
        <meta name="description" content="Forgot account password Mejeng" />
      </Head>

      <div className="flex h-screen items-center justify-center ">
        <form className="flex h-full basis-1/2 flex-col items-start justify-center px-[66px]">
          <Link
            href="/auth/login"
            className="tooltip tooltip-right absolute top-5 left-5 rounded-full bg-black p-2 text-white "
            data-tip="Back to Login Page"
          >
            <BiArrowBack className="h-6 w-6" />
          </Link>

          <h2 className="text-[44px] font-extrabold">Forgot Password</h2>

          <div className="flex w-full flex-col items-start justify-center py-10">
            <label className="pb-3 text-lg font-medium text-[#9F9F9F]">
              Your email address
            </label>
            <input
              type="email"
              placeholder=""
              className="w-full border-b-2 border-[#9F9F9F] p-2 focus:outline-none "
            />
          </div>

          <div className="flex w-full items-center justify-center">
            <button
              type="submit"
              className="rounded-full bg-primary/60 px-[30px] py-[14px] text-xl font-bold text-white transition-all duration-200 hover:bg-primary"
            >
              Process
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
