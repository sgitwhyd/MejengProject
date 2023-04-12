import { useState, useEffect } from "react";
import ProjectCard from "@/components/cards/project-card";

const getPosts = async () => {
  const res = await fetch("http://localhost:5000/data", { cache: "no-cache" });
  return await res.json();
};

export default function Inspiration() {
  const [isPosts, setIsPosts] = useState("All");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  //   const filterPosts = posts.filter((post) => {
  //     if (isPosts === "All") {
  //       return post.All;
  //     } else if (isPosts === "mobile_design") {
  //       return post.mobile_design;
  //     } else if (isPosts === "web_design") {
  //       return post.web_design;
  //     } else if (isPosts === "ui_components") {
  //       return post.ui_components;
  //     } else if (isPosts === "branding") {
  //       return post.branding;
  //     }
  //   });

  return (
    <>
      <div className="flex items-center justify-center gap-10 pb-20 font-medium">
        <button
          onClick={() => setIsPosts("All")}
          className={isPosts === "All" ? "text-primary" : "text-black"}
        >
          All
        </button>
        <button
          onClick={() => setIsPosts("mobile_design")}
          className={
            isPosts === "mobile_design" ? "text-primary" : "text-black"
          }
        >
          Mobile Design
        </button>
        <button
          onClick={() => setIsPosts("web_design")}
          className={isPosts === "web_design" ? "text-primary" : "text-black"}
        >
          Web Design
        </button>
        <button
          onClick={() => setIsPosts("ui_components")}
          className={
            isPosts === "ui_components" ? "text-primary" : "text-black"
          }
        >
          UI Components
        </button>
        <button
          onClick={() => setIsPosts("branding")}
          className={isPosts === "branding" ? "text-primary" : "text-black"}
        >
          Branding
        </button>
      </div>
      <div className="mt-5 flex flex-wrap gap-10 text-black">
        {posts.map((post) => {
          return (
            <ProjectCard
              key={post.id}
              altPostImage={post.title}
              srcPostImage={post.thumbnail_project_image.replace(
                "images\\",
                ""
              )}
              altAvatarPost={post.user_name}
              srcAvatarPost={post.user_image.replace("images\\", "")}
              {...post}
              authorPost={post.user_name}
              likePost={post.total_likes}
              viewPost={post.total_views}
            />
          );
        })}
      </div>
    </>
  );
}
