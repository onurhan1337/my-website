import IconArrowRight from "../icons/arrow-right"
import IconEye from "../icons/eye"
import IconStar from "../icons/star"

const ProjectCard = ({ data }) => {
    return (
        <div className="flex flex-wrap -m-4 lg:justify-start justify-center">
            {data?.map(project => (
                <div key={project.name} className="p-4 lg:w-1/3">
                    <div
                        className="h-full bg-white border-2 border-gray-200 bg-opacity-40 backdrop-blur-md drop-shadow-md dark:bg-[#ffffff0f] dark:border-gray-700
                              max-w-md px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative"
                    >
                        <h2 className="tracking-widest text-xs title-font font-medium bg-green-100 dark:bg-[#ffffff1d] rounded-full inline-block px-4 py-1 text-green-400 mb-1">
                            {!project.language ? "Other" : project.language}
                        </h2>
                        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 dark:text-white mb-3">
                            {!project.name ? null : project.name}
                        </h1>
                        <p className="leading-relaxed mb-3 dark:text-zinc-400">
                            {!project.description ? "This project doesn't have a description" : project.description}
                        </p>
                        <a
                            href={project.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 dark:text-purple-400 inline-flex items-center"
                        >
                            Project details
                            <IconArrowRight />
                        </a>
                        <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                            <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200 dark:border-[#ffffff1f]">
                                <IconStar />
                                {project.stargazers_count}
                            </span>
                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                <IconEye />
                                {project.watchers_count}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProjectCard
