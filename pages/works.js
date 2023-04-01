import { useState, useEffect } from "react";
import Head from "next/head";
import Error from "./_error";
import ProjectsCard from "../components/card/projects";
import SkeletonCardList from "../components/card/skeletonCardList";

const WorksPage = ({ data, errorCode }) => {
  const [loading, setLoading] = useState(false);

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Works | Onurhan Demir</title>
        <meta name="description" content="see all my projects here" />
        <meta property="og:image" content="/avatar.png" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {loading ? (
            <SkeletonCardList count={data.length} />
          ) : (
            <ProjectsCard projects={data} />
          )}
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://api.github.com/users/onurhan1337/repos");
  const errorCode = res.ok ? false : res.statusCode;
  const data = await res.json();

  return {
    props: {
      errorCode,
      data,
    },
  };
}

export default WorksPage;
