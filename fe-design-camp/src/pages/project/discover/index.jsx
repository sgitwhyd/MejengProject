import { useState } from "react";
import ProjectCard from "@/components/cards/project-card";
import { BiSearch } from "react-icons/bi";
import { TbFilter, TbFilterOff } from "react-icons/tb";
import Head from "next/head";

export default function Discover() {
  const [isPosts, setIsPosts] = useState("All");
  const [posts, setPosts] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  //Checkbox Tools
  const [checkedTools, setCheckedTools] = useState([]);
  console.log(checkedTools);

  const datasTools = [
    { label: "Photoshop", value: "Photoshop" },
    { label: "Figma", value: "Figma" },
    { label: "Adobe XD", value: "Adobe XD" },
    { label: "Sketch", value: "Sketch" },
    { label: "Invision", value: "Invision" },
  ];

  const handleCheck = (event) => {
    const toolValue = event.target.value;
    if (event.target.checked) {
      setCheckedTools([...checkedTools, toolValue]);
    } else {
      setCheckedTools(checkedTools.filter((tool) => tool !== toolValue));
    }
  };

  const datas = [
    "All",
    "Mobile Design",
    "Web Design",
    "UI Components",
    "Branding",
  ];

  const project = [
    {
      id: 1,
      title: "Booking Application",
      thumbnail: "https://picsum.photos/seed/picsumaa/300/325",
      category: "Web Design",
      tools: [{ name: "FG" }, { name: "XD" }],
      authorImage: "https://ui-avatars.com/api/?background=random",
      altAvatarPost: "Avatar",
      author: "Nicko Ilham",
      likePost: 100,
      viewPost: 100,
    },
    {
      id: 2,
      title: "Booking Application",
      thumbnail: "https://picsum.photos/seed/picsumaa/300/325",
      category: "Web Design",
      tools: [{ name: "FG" }, { name: "XD" }],
      authorImage: "https://ui-avatars.com/api/?background=random",
      altAvatarPost: "Avatar",
      author: "Nicko Ilham",
      likePost: 100,
      viewPost: 100,
    },
    {
      id: 3,
      title: "Booking Application",
      thumbnail: "https://picsum.photos/seed/picsumaa/300/325",
      category: "Web Design",
      tools: [{ name: "FG" }, { name: "XD" }],
      authorImage: "https://ui-avatars.com/api/?background=random",
      altAvatarPost: "Avatar",
      author: "Nicko Ilham",
      likePost: 100,
      viewPost: 100,
    },
    {
      id: 4,
      title: "Booking Application",
      thumbnail: "https://picsum.photos/seed/picsumaa/300/325",
      category: "Web Design",
      tools: [{ name: "FG" }, { name: "XD" }],
      authorImage: "https://ui-avatars.com/api/?background=random",
      altAvatarPost: "Avatar",
      author: "Nicko Ilham",
      likePost: 100,
      viewPost: 100,
    },
    {
      id: 5,
      title: "Booking Application",
      thumbnail: "https://picsum.photos/seed/picsumaa/300/325",
      category: "Web Design",
      tools: [{ name: "FG" }, { name: "XD" }],
      authorImage: "https://ui-avatars.com/api/?background=random",
      altAvatarPost: "Avatar",
      author: "Nicko Ilham",
      likePost: 100,
      viewPost: 100,
    },
  ];

  return (
    <>
      <Head>
        <title>Discover - Mejeng</title>
        <meta
          name="description"
          content="Find best showcase project design here"
        />
      </Head>
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-primary">
          Find inspiration from the{" "}
          <span className="text-secondary">Design Category</span> for your
          project
        </h1>

        <div className="mt-8 mb-4 flex items-center justify-center gap-8 font-medium">
          {datas.map((data, index) => {
            return (
              <button
                key={index}
                onClick={() => setIsPosts(data)}
                className={
                  isPosts === data
                    ? "rounded-lg bg-primary/10 px-3 py-2 text-primary"
                    : "rounded-lg px-3 py-2 text-black transition-all hover:bg-primary/10 hover:text-primary"
                }
              >
                {data}
              </button>
            );
          })}
          <button
            className={`tooltip tooltip-right rounded-lg border border-primary/60 p-2 text-primary/60 transition-all duration-300 hover:border-primary/0 hover:bg-primary/10 hover:text-primary ${
              isFilter && "border-primary/0 bg-primary/10 text-primary"
            }`}
            data-tip={isFilter ? "Remove Filters" : "Filters"}
            onClick={() => (isFilter ? setIsFilter(false) : setIsFilter(true))}
          >
            {isFilter ? (
              <TbFilterOff className="h-6 w-6" />
            ) : (
              <TbFilter className="h-6 w-6" />
            )}
          </button>
        </div>

        {isFilter ? (
          <div className="flex flex-col items-center justify-center gap-5 pb-10">
            <div className="flex items-center justify-center gap-8">
              {datasTools.map((tools) => (
                <button
                  className="flex items-center justify-center gap-1"
                  key={tools.value}
                >
                  <input
                    type="checkbox"
                    className="checkbox"
                    value={tools.value}
                    onChange={handleCheck}
                  />
                  {tools.label}
                </button>
              ))}
            </div>
            <div>
              <div className="flex h-12 w-96 items-center justify-between rounded-lg bg-[#F0F1F2] pl-3 pr-3 text-[#9F9F9F]">
                <BiSearch size={25} />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-10 grid grid-cols-4 gap-8 text-black">
          {project.map((post) => {
            return (
              <ProjectCard
                key={post.id}
                thumbnail={post.thumbnail}
                title={post.title}
                tools={post.tools.map((tool) => tool.name)}
                category={post.category}
                authorImage={post.authorImage}
                author={post.author}
                likePost={post.likePost}
                viewPost={post.viewPost}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
