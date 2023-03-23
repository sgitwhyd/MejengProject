import Head from "next/head";
import Link from "next/link";
import ProjectCard from "@/components/main/cards/project-card";
import LayoutHomeSection from "@/components/main/layouts/layout-home-section";
import LayoutHomeSectionReverse from "@/components/main/layouts/layout-home-section-reverse";

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
          srcPostImage: "https://picsum.photos/seed/picsuma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Nicko Ilham",
          likePost: 100,
          viewPost: 100,
        },
        {
          id: 2,
          srcPostImage: "https://picsum.photos/seed/icsuma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Rizky Bilar",
          likePost: 100,
          viewPost: 780,
        },
        {
          id: 3,
          srcPostImage: "https://picsum.photos/seed/paicsuma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Gito Leslar",
          likePost: 666,
          viewPost: 9999,
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
          srcPostImage: "https://picsum.photos/seed/picsuma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Web Design",
          likePost: 100,
          viewPost: 100,
        },
        {
          id: 2,
          srcPostImage: "https://picsum.photos/seed/picsuma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Rizky Bilar",
          likePost: 100,
          viewPost: 780,
        },
        {
          id: 3,
          srcPostImage: "https://picsum.photos/seed/picsura/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Gito Leslar",
          likePost: 666,
          viewPost: 9999,
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
          srcPostImage: "https://picsum.photos/seed/piuma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "UI Components",
          likePost: 100,
          viewPost: 100,
        },
        {
          id: 2,
          srcPostImage: "https://picsum.photos/seed/piuma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Rizky Bilar",
          likePost: 100,
          viewPost: 780,
        },
        {
          id: 3,
          srcPostImage: "https://picsum.photos/seed/piuma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Gito Leslar",
          likePost: 666,
          viewPost: 9999,
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
          srcPostImage: "https://picsum.photos/seed/puma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Branding",
          likePost: 100,
          viewPost: 100,
        },
        {
          id: 2,
          srcPostImage: "https://picsum.photos/seed/puma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Rizky Bilar",
          likePost: 100,
          viewPost: 780,
        },
        {
          id: 3,
          srcPostImage: "https://picsum.photos/seed/puma/300/325",
          altPostImage: "gambar",
          srcAvatarPost: "https://ui-avatars.com/api/?background=random",
          altAvatarPost: "Avatar",
          authorPost: "Gito Leslar",
          likePost: 666,
          viewPost: 9999,
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
                  return (
                    <ProjectCard
                      key={post.id}
                      srcPostImage={post.srcPostImage}
                      srcAvatarPost={post.srcAvatarPost}
                      {...post}
                    />
                  );
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
                    <ProjectCard
                      key={post.id}
                      srcPostImage={post.srcPostImage}
                      srcAvatarPost={post.srcAvatarPost}
                      {...post}
                    />
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
