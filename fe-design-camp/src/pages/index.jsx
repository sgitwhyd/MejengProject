import Head from "next/head";
import Link from "next/link";
import ProjectCard from "@/components/cards/project-card";
import LayoutHomeSection from "@/components/layouts/layout-home-section";
import LayoutHomeSectionReverse from "@/components/layouts/layout-home-section-reverse";

export default function Home() {
  const projectDatas = [
    {
      id: 1,
      categoryId: "Mobile Design",
      categoryDesc: "Mobile design innovation for a changing world",
      seeMoreRoute: "/category/mobile-design",
      post: [
        {
          id: 1,
          title: "Booking Application",
          thumbnail: "https://picsum.photos/seed/picsuma/300/325",
          tools: [{ name: "FG" }],
          category: "Mobile Design",
          authorImage: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          author: "Nicko Ilham",
          likePost: 100,
          viewPost: 100,
        },
        {
          id: 2,
          title: "Booking Application",
          thumbnail: "https://picsum.photos/seed/pwma/300/325",
          category: "Mobile Design",
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
          thumbnail: "https://picsum.photos/seed/pi4ma/300/325",
          category: "Mobile Design",
          tools: [{ name: "FG" }, { name: "XD" }],
          authorImage: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          author: "Nicko Ilham",
          likePost: 100,
          viewPost: 100,
        },
      ],
    },
    {
      id: 2,
      categoryId: "Web Design",
      categoryDesc: "Elegant web design and functional for your needs",
      seeMoreRoute: "/category/web-design",
      post: [
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
          thumbnail: "https://picsum.photos/seed/wqa/300/325",
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
          thumbnail: "https://picsum.photos/seed/pife/300/325",
          category: "Web Design",
          tools: [{ name: "FG" }, { name: "XD" }],
          authorImage: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          author: "Nicko Ilham",
          likePost: 100,
          viewPost: 100,
        },
      ],
    },
    {
      id: 3,
      categoryId: "UI Components",
      categoryDesc:
        "Components that make your designs more attractive and captivating",
      seeMoreRoute: "/category/ui-components",
      post: [
        {
          id: 1,
          title: "Booking Application",
          thumbnail: "https://picsum.photos/seed/psda/300/325",
          category: "UI Components",
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
          thumbnail: "https://picsum.photos/seed/cxzma/300/325",
          category: "UI Components",
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
          thumbnail: "https://picsum.photos/seed/qwwa/300/325",
          category: "UI Components",
          tools: [{ name: "FG" }, { name: "XD" }],
          authorImage: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          author: "Nicko Ilham",
          likePost: 100,
          viewPost: 100,
        },
      ],
    },
    {
      id: 4,
      categoryId: "Branding",
      categoryDesc:
        "Bringing brands and consumers together through attractive designs",
      seeMoreRoute: "/category/branding",
      post: [
        {
          id: 1,
          title: "Booking Application",
          thumbnail: "https://picsum.photos/seed/asadma/300/325",

          category: "Branding",
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
          thumbnail: "https://picsum.photos/seed/amvdaa/300/325",
          category: "Branding",
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
          thumbnail: "https://picsum.photos/seed/a11ma/300/325",
          category: "Branding",
          tools: [{ name: "FG" }, { name: "XD" }],
          authorImage: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          author: "Nicko Ilham",
          likePost: 100,
          viewPost: 100,
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Mejeng</title>
        <meta
          name="description"
          content="Mejeng adalah platform untuk para desain creator berbagi karya dan pamer karya!"
        />
      </Head>

      <section className="flex flex-col items-center justify-center pb-20">
        <h1 className="pb-3 text-5xl font-extrabold text-primary">
          Find Creative Inspiration
        </h1>
        <h3 className="text-2xl font-semibold text-secondary">
          Your Brilliant Design Ideas
        </h3>
      </section>
      <div className="flex flex-col gap-16">
        {projectDatas.map((projectData) => {
          if (projectData.id % 2 === 0) {
            return (
              <LayoutHomeSectionReverse
                key={projectData.id}
                categoryTitle={projectData.categoryId}
                categoryDesc={projectData.categoryDesc}
                seeMoreRoute={projectData.seeMoreRoute}
              >
                {projectData.post.map((post) => {
                  return <ProjectCard key={post.id} {...post} />;
                })}
              </LayoutHomeSectionReverse>
            );
          } else {
            return (
              <LayoutHomeSection
                key={projectData.id}
                categoryTitle={projectData.categoryId}
                categoryDesc={projectData.categoryDesc}
                seeMoreRoute={projectData.seeMoreRoute}
              >
                {projectData.post.map((post) => {
                  return (
                    <ProjectCard key={post.id} tools={post.tools} {...post} />
                  );
                })}
              </LayoutHomeSection>
            );
          }
        })}
      </div>
    </>
  );
}
