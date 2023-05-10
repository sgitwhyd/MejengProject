import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import forgotPasswordHero from "@/assets/auth/forgot-password-hero.png";
import MejengLogo from "@/assets/mejeng-logo-white.svg";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { ErrorToast, SuccessToast } from "@/components/toast/alert-taost";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/store/auth/auth.action";
import Sidebar from "../../sidebar";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = (e) => {
    if (e.target.id === "password") {
      setShowPassword(!showPassword);
    } else if (e.target.id === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      ErrorToast("password doesn't match");
      return;
    }

    await dispatch(
      forgotPassword({
        email: null,
        new_password: password,
        token,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        ErrorToast(res.payload.error.message);
      } else {
        SuccessToast("Password reset successfully");
        router.push("/auth/login");
      }
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
          onSubmit={handleSubmit}
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

          <div className="mx-auto mb-6 flex w-full flex-col items-start justify-center">
            <label className="pb-3 text-lg font-medium text-[#9F9F9F]">
              New Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                name="password"
                value={password}
                onChange={(e) => handleOnChange(e)}
                className="w-full border-b-2 border-[#9F9F9F] p-2 focus:outline-none"
                required
              />
              <div className="absolute right-0 top-0 cursor-pointer">
                {showPassword ? (
                  <BsFillEyeFill
                    id="password"
                    onClick={(e) => {
                      handleShowPassword(e);
                    }}
                    size={30}
                  />
                ) : (
                  <BsFillEyeSlashFill
                    id="password"
                    onClick={(e) => {
                      handleShowPassword(e);
                    }}
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mx-auto mb-6 flex w-full flex-col items-start justify-center">
            <label className="pb-3 text-lg font-medium text-[#9F9F9F]">
              Confirm Your New Password
            </label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder=""
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleOnChange(e)}
                className="w-full border-b-2 border-[#9F9F9F] p-2 focus:outline-none"
                required
              />
              <div className="absolute right-0 top-0">
                {showConfirmPassword ? (
                  <BsFillEyeFill
                    id="confirmPassword"
                    className="cursor-pointer"
                    onClick={(e) => {
                      handleShowPassword(e);
                    }}
                    size={30}
                  />
                ) : (
                  <BsFillEyeSlashFill
                    id="confirmPassword"
                    className="cursor-pointer"
                    onClick={(e) => {
                      handleShowPassword(e);
                    }}
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary btn mx-auto mt-28 w-fit text-xl capitalize"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;
