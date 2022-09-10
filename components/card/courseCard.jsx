const CourseCard = ({ data, cardTitle }) => {
  return (
    <div className="sm:flex-row flex-col mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h3 className="text-sm font-semibold mb-4 underline decoration-wavy underline-offset-4 text-[#0D0E10]">
          {cardTitle}
        </h3>
        {data?.map((work) => (
          <div className="py-4" key={work.company}>
            <div className="flex flex-col mb-5 items-center">
              <span className="text-gray-400 text-sm">{work.date}</span>
              <div className="">
                <div className="flex flex-row">
                  <a
                    href={work.websiteLink}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-sm font-semibold hover:text-black text-gray-700"
                  >
                    {work.title} at {work.company}
                  </a>
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      d="M17.25 15.25V6.75H8.75"
                    ></path>
                    <path stroke="currentColor" d="M17 7L6.75 17.25"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCard;