import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import ButtonWIcon from "@/components/button/button-w-icon";
import { FaTelegramPlane } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import ProjectCard from "@/components/cards/project-card";
import { useEffect } from "react";
import { getProfile } from "@/store/user/user.action";
import { selectUser } from "@/store/user/user.selector";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { project } = user;

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <>
      <Head>
        <title>Profile - Mejeng</title>
        <meta name="description" content="Login page Mejeng App " />
      </Head>

      <section className="flex items-start justify-center gap-20">
        <div className="flex flex-1 flex-col items-end justify-center gap-6">
          <div className="avatar">
            <div className="w-[150px] rounded-full">
              <img
                src={
                  user?.profile_image?.includes("avatars")
                    ? user?.profile_image
                    : `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${user?.profile_image}`
                }
              />
            </div>
          </div>
        </div>

        <div className="flex-2">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <div className="my-7 flex items-center justify-start gap-7">
            <div className="flex items-center justify-start gap-1 text-primary">
              <HiOutlineGlobeAsiaAustralia className="h-4 w-4" />
              <p className="text-lg font-medium">
                {user?.country ? user?.country : "your country"}
              </p>
            </div>
            <div className="flex items-center justify-start gap-1 text-primary">
              <HiOutlineLocationMarker className="h-4 w-4" />
              <p className="text-lg font-medium">
                {user?.region ? user?.region : "your region"}
              </p>
            </div>
          </div>
          <p className="text whitespace-pre-line text-lg">
            {user?.description
              ? user?.description
              : "write your profile description here"}
          </p>
        </div>

        <div className="flex flex-1 justify-start gap-5 ">
          <ButtonWIcon
            route="/user/profile/edit"
            icon={<RiUserSettingsLine className="h-6 w-6 " />}
          />
          {user?.is_verify ? (
            <ButtonWIcon
              route="/user/upload-project"
              icon={<FiPlus className="h-6 w-6" />}
              name="Create new post"
            />
          ) : (
            <ButtonWIcon
              route="/user/request-creator"
              icon={<FaTelegramPlane className="h-6 w-6" />}
              name="Request as a creator"
              disabled
            />
          )}
        </div>
      </section>
      <div className="my-16 h-[2px] bg-slate-100"></div>
      <section className="w-full">
        {user?.is_verify ? (
          <>
            {user?.project.length === 0 ? (
              <div className="mx-auto w-5/6 px-20 text-center text-xl font-medium leading-loose text-primary/80">
                <h3>“Your projects is appear here”</h3>
                <p>
                  Come on, share the project you have and start interacting with
                  other users and creators with the results of your project...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-y-6">
                {project.map((project) => {
                  return (
                    <div key={project.id} className="mx-auto">
                      <ProjectCard {...project} />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="mx-auto w-5/6 px-20 text-center text-xl font-medium leading-loose text-primary/80">
            <Link href="/user/request-creator">“Request as creator”</Link>
            <p>
              So you can share your projects that you have here, and interact
              with various creators and exchange ideas to develop your knowledge
              and skills...
            </p>
          </div>
        )}
      </section>
    </>
  );
}
