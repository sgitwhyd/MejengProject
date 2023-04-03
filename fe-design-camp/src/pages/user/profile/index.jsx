import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { RiUserSettingsLine } from "react-icons/ri";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile - Mejeng</title>
        <meta name="description" content="Login page Mejeng App " />
      </Head>
      <section className="flex items-start justify-center gap-20 border-b-2 pb-16">
        <div className="flex flex-1 items-center justify-end">
          <Image
            src="https://picsum.photos/seed/200/300"
            height={150}
            width={150}
            className="h-[150px] w-[150px] rounded-full"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Nicko Ilham</h1>
          <p className="text whitespace-pre-line py-10 text-lg">
            Graphic Designer contact my email : 📩 nickoilham@gmail.com enjoy my
            design guys, thank you😁
          </p>
          <button className="flex items-center justify-center gap-3 rounded-xl bg-primary px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-primary/80">
            <FiPlus className="h-6 w-6" /> Create new post
          </button>
        </div>
        <div className="flex-1">
          <button className="rounded-xl bg-primary px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-primary/80">
            <Link
              href="/user/profile/edit"
              className="flex items-center justify-center gap-3"
            >
              <RiUserSettingsLine className="h-6 w-6" /> Edit Profile
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}
