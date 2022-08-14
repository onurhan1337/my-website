import TimelineItem from "./timelineItem";

const Index = () => {
    const experiences = [
        {
            id: 1,
            company: "Rosso Agency",
            companyLogo: "photos/rosso-agency.png",
            link: "https://rosso.agency/",
            title: "Front-end Developer",
            date: "July 2022 - Present",
        },
        {
            id: 2,
            company: "Insepter",
            companyLogo: "photos/insepter.png",
            link: "https://insepter.com/",
            title: "Front-end Team Lead",
            date: "May 2022 - July 2022",
        },
        {
            id: 3,
            company: "freeCodeCamp",
            companyLogo: "photos/freecodecamp.png",
            link:
                "https://www.freecodecamp.org/certification/onurhan/front-end-development-libraries",
            title: "Front-end Development Libraries",
            date: "June 2022",
        },
        {
            id: 4,
            company: "BTK Akademi",
            companyLogo: "photos/btk-akademi.png",
            link: "https://www.btkakademi.gov.tr/",
            title: "React ile Web Programcılığı",
            date: "August 2021",
        },
        {
            id: 5,
            company: "Udemy",
            companyLogo: "photos/udemy.png",
            link:
                "https://www.udemy.com/certificate/UC-ba323a34-20aa-4edf-9fdd-3791a8e1fc46/",
            title: "İleri Seviye Modern Javascript Dersleri ES7+",
            date: "July 2021",
        },
    ];
    return (
        <section className="text-gray-600 body-font flex container mx-auto">
                <TimelineItem experiences={experiences} />
        </section>
    )
}

export default Index;