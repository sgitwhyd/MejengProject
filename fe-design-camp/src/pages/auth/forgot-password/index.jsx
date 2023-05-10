import Head from "next/head";
import { BiArrowBack } from "react-icons/bi";
import forgotPasswordHero from "@/assets/auth/forgot-password-hero.png";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/store/auth/auth.action";
import { SuccessToast, ErrorToast } from "@/components/toast/alert-taost";
import { selectAuth } from "@/store/auth/auth.selector";
import Sidebar from "../sidebar";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { loading } = useSelector(selectAuth);

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword({ email })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        SuccessToast("Check your email for reset password link");
      } else {
        ErrorToast(res.payload.message);
      }

      setEmail("");
    });
  };

  return (
    <>
      <Head>
        <title>Forgot Password - Mejeng</title>
        <meta name="description" content="Forgot account password Mejeng" />
      </Head>

      <div className="flex h-screen w-full items-center justify-center">
        <Sidebar
          title="Fix your account problem"
          href="/auth/login"
          icon={<BiArrowBack className="h-6 w-6" />}
          tooltip="Back to login page"
          image={{
            src: forgotPasswordHero,
            alt: "bg-image-forgot-password",
          }}
        />
        <form
          className="flex h-full w-full flex-col items-start justify-center px-12 md:basis-1/2 lg:px-[66px]"
          onSubmit={handleOnSubmit}
        >
          <Link
            href="/auth/login"
            className="absolute top-5 right-5 block rounded-full border bg-white p-2 text-black hover:text-black md:hidden"
            data-tip="Back to home"
          >
            <BiArrowBack className="h-6 w-6" />
          </Link>
          <h2 className="pb-5 text-3xl font-extrabold lg:text-4xl">
            Forgot Password ?
          </h2>
          <h3 className="pb-8 text-base lg:pb-12 lg:text-xl">
            Reset your password
          </h3>

          <div className="flex w-full flex-col items-start justify-center pb-10">
            <label className="pb-2 text-base font-medium text-[#9F9F9F] lg:pb-3 lg:text-lg">
              Your email address
            </label>
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={handleOnChange}
              className="w-full border-b-2 border-[#9F9F9F] p-2 text-sm focus:outline-none lg:text-base"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={`btn-primary btn text-xl font-bold  capitalize text-white ${
              loading ? "loading cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Process
          </button>
        </form>
      </div>
    </>
  );
}
