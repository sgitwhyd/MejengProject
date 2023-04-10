import Head from "next/head";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import bgLogin from "@/assets/bg-login.webp";
import Sidebar from "../sidebar";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Head>
        <title>Login - Mejeng</title>
        <meta name="description" content="Login page Mejeng App " />
      </Head>

      <div className="flex h-screen items-center justify-center ">
        <Sidebar
          title="Welcome back to"
          image={{
            src: bgLogin,
            alt: "bg-image-register",
          }}
        />

        <form className="flex h-full basis-1/2 flex-col items-start justify-center px-[66px]">
          <h2 className="pb-2 text-[44px] font-extrabold">Login</h2>
          <h3 className="pb-24 text-xl">
            New user?{" "}
            <Link
              href="/auth/register"
              className="underline-animation text-primary hover:text-primary"
            >
              Create an account
            </Link>
          </h3>

          <div className="flex w-full flex-col items-start justify-center pb-10">
            <label className="pb-3 text-lg font-medium text-[#9F9F9F]">
              Your email address
            </label>
            <input
              type="email"
              placeholder=""
              className="w-full border-b-2 border-[#9F9F9F] p-2 focus:outline-none "
            />
          </div>

          <div className="flex w-full flex-col items-start justify-center pb-24">
            <label className="pb-3 text-lg font-medium text-[#9F9F9F]">
              Your password
            </label>
            <div className="flex w-full items-center justify-between pb-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                className="w-full border-b-2 border-[#9F9F9F] p-2 focus:outline-none "
              />
              {showPassword ? (
                <FaEye
                  className="h-8 w-8  cursor-pointer text-[#9F9F9F]"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEyeSlash
                  className="h-8 w-8 cursor-pointer text-[#9F9F9F]"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <Link
              href="/auth/forgot-password"
              className="flex w-full justify-end text-primary"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              type="submit"
              className="rounded-full bg-primary/60 px-[72px] py-[14px] text-xl font-bold text-white transition-all duration-200 hover:bg-primary"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
