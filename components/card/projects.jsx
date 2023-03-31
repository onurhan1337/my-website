import Link from "next/link";
import IconBookmark from "../icons/bookmark";
import IconBranch from "../icons/branch";
import IconStar from "../icons/star";

const ProjectsCard = ({ projects }) => {
  return (
    <div className="flex flex-wrap -m-4 h-full justify-center">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {projects &&
          projects.map(project => (
            <div className="col-span-1 h-full p-6">
              <Link href={project.html_url}>
                <div className="flex w-full h-full items-center justify-between space-x-6 p-8 bg-white border-2 border-gray-200 bg-opacity-40 backdrop-blur-m drop-shadow-md  cursor-pointer hover:shadow-sm hover:shadow-gray-400/30 dark:bg-zinc-950 dark:border-gray-700 max-w-md rounded-lg overflow-hidden text-start relative">
                  <div className="flex text-ellipsis overflow-hidden flex-col items-start justify-between h-full">
                    <div className="flex flex-row items-center gap-x-2">
                      <IconBookmark size={20} />
                      <h1 className="text-base font-bold text-gray-900 dark:text-white title-font">
                        {project.name}
                      </h1>
                      <span className="inline-flex items-center rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        {project.private ? "Private" : "Public"}
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-300 p-1 text-sm mt-1">
                      {project.description
                        ? project.description
                        : "No description"}
                    </p>
                    <div className="flex flex-row items-center gap-x-2 mt-3">
                      {project.language !== null ? (
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black dark:bg-transparent text-white dark:border">
                          {project.language}
                        </span>
                      ) : null}

                      <div className="flex flex-row items-center gap-x-1">
                        <IconStar size={16} color={"grey"} />
                        <span className="text-gray-500 text-sm">
                          {project.stargazers_count}
                        </span>
                      </div>
                      <div className="ml-2 flex flex-row items-center gap-x-1">
                        <IconBranch size={16} color={"grey"} />
                        <span className="text-gray-500 text-sm">
                          {project.forks_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectsCard;
