import CourseCard from "../components/card/courseCard";
import WorkCard from "../components/card/workCard";

const ResumePage = () => {
  const workCardTitle = "Work Experience";
  const courseCardTitle = "Finished Courses";

  const workExperiences = [
    {
      company: "Rosso Agency",
      websiteLink: "https://rosso.agency/",
      title: "Front-end Developer",
      date: "July 2022 - Present",
    },
    {
      company: "Insepter",
      websiteLink: "https://insepter.com/",
      title: "Front-end Team Lead",
      date: "May 2022 - July 2022",
    },
  ];

  const courseExperience = [
    {
      company: "freeCodeCamp",
      documentLink:
        "https://www.freecodecamp.org/certification/onurhan/front-end-development-libraries",
      title: "Front-end Development Libraries",
      date: "June 2022",
    },
    {
      company: "BTK Akademi",
      documentLink: "https://www.btkakademi.gov.tr/",
      title: "React ile Web Programcılığı",
      date: "August 2021",
    },
    {
      company: "Udemy",
      documentLink:
        "https://www.udemy.com/certificate/UC-ba323a34-20aa-4edf-9fdd-3791a8e1fc46/",
      title: "İleri Seviye Modern Javascript Dersleri ES7+",
      date: "July 2021",
    },
  ];

  return (
    <div>
      <div className="container mx-auto px-5 py-24 flex flex-col sm:flex-row justify-around">
        <WorkCard data={workExperiences} cardTitle={workCardTitle} />
        <CourseCard data={courseExperience} cardTitle={courseCardTitle} />
      </div>
      <div className="flex flex-col items-center justify-center space-x-3 space-y-3">
        <p>
          You can visit my linkedin account for my tech stack and other skills.
        </p>
        <a
          href="https://www.linkedin.com/in/onurhan-demir/"
          target="_blank"
          className="w-48 h-16 flex flex-none items-center justify-around gap-x-1.5 cursor-pointer leading-none transition-all delay-100 font-medium px-4 py-2.5 text-lg rounded-lg bg-[#1C1C1C] hover:bg-black shadow-xs text-white border border-gray-400 border-opacity-30 hover:border-opacity-50 hover:shadow-sm undefined"
        >
          Linkedin
        </a>
      </div>
    </div>
  );
};

export default ResumePage;
