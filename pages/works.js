import ProjectsCard from "../components/card/projects";
import Error from "./_error";

const WorksPage = ({ data, errorCode }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <ProjectsCard projects={data} />
      </div>
    </section>
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
