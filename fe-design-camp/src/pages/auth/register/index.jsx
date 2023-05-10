import Head from "next/head";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { authRegister } from "@/store/auth/auth.action";
import { ErrorToast, SuccessToast } from "@/components/toast/alert-taost";
import { useRouter } from "next/router";
import bgRegister from "@/assets/bg-register.webp";
import Sidebar from "../sidebar";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [registerPayload, setRegisterPayload] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setRegisterPayload({
      ...registerPayload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(authRegister(registerPayload)).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        ErrorToast(res.payload.error.message);
        setRegisterPayload({
          email: "",
          name: "",
          password: "",
        });
      } else {
        SuccessToast(res.payload.message);
        setRegisterPayload({
          email: "",
          name: "",
          password: "",
        });
        router.push("/auth/login");
      }
    });
  };

  return (
    <>
      <Head>
        <title>Register - Mejeng</title>
        <meta name="description" content="Login page Mejeng App " />
      </Head>

      <div className="flex h-screen w-full items-center justify-center ">
        <Sidebar
          title="Welcome to"
          href="/"
          icon={<FaHome className="h-6 w-6" />}
          tooltip="Back to home"
          image={{
            src: bgRegister,
            alt: "bg-image-register",
          }}
        />

        <form
          className="flex h-full w-full flex-col items-start justify-center px-12 md:basis-1/2 lg:px-[66px]"
          onSubmit={handleSubmit}
        >
          <Link
            href="/"
            className="absolute top-5 right-5 block rounded-full border bg-white p-2 text-black hover:text-black md:hidden"
            data-tip="Back to home"
          >
            <FaHome className="h-6 w-6" />
          </Link>
          <h2 className="pb-2 text-3xl font-extrabold lg:text-[44px]	">
            Register
          </h2>
          <h3 className="pb-8 text-base lg:pb-14 lg:text-xl">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="underline-animation text-primary hover:text-primary"
            >
              here
            </Link>
          </h3>

          <div className="flex w-full flex-col items-start justify-center">
            <label className="pb-2 text-base font-medium text-[#9F9F9F] lg:pb-3 lg:text-lg">
              Your email address
            </label>
            <input
              type="email"
              placeholder=""
              name="email"
              value={registerPayload.email}
              onChange={handleOnChange}
              className="w-full border-b-2 border-[#9F9F9F] p-2 text-sm focus:outline-none lg:text-base"
            />
          </div>

          <div className="flex w-full flex-col items-start justify-center py-7 lg:py-10">
            <label className="pb-2 text-base font-medium text-[#9F9F9F] lg:pb-3 lg:text-lg">
              Your username
            </label>
            <input
              type="text"
              placeholder=""
              name="name"
              value={registerPayload.name}
              onChange={handleOnChange}
              className="w-full border-b-2 border-[#9F9F9F] p-2 text-sm focus:outline-none lg:text-base"
            />
          </div>

          <div className="flex w-full flex-col justify-center pb-16 lg:pb-24">
            <label className="pb-2 text-base font-medium text-[#9F9F9F] lg:pb-3 lg:text-lg">
              Your password
            </label>
            <div className="flex w-full items-center justify-between pb-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                name="password"
                value={registerPayload.password}
                onChange={handleOnChange}
                className="w-full border-b-2 border-[#9F9F9F] p-2 text-sm focus:outline-none lg:text-base"
              />
              {showPassword ? (
                <FaEye
                  className="h-6 w-6 cursor-pointer text-[#9F9F9F]  lg:h-8 lg:w-8"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEyeSlash
                  className="h-6 w-6 cursor-pointer text-[#9F9F9F]  lg:h-8 lg:w-8"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              type="submit"
              className="rounded-full bg-primary/60 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-primary lg:py-[14px] lg:px-[30px] lg:text-xl"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
