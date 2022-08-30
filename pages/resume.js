import Timeline from "../components/timeline/index";

const ResumePage = () => {

  return (
    <div>
      <section className="text-gray-600 body-font px-4 md:px-16 mx-auto max-w-screen-md">
        <Timeline />
      </section>
      <div className="flex flex-col items-center justify-center space-x-3 space-y-3 mb-6">
        <p  className="text-normal text-center text-wrap px-3 dark:text-zinc-300">
          You can visit my linkedin account for my tech stack and other skills.
        </p>
        <a
          href="https://www.linkedin.com/in/onurhan-demir/"
          target="_blank"
          rel="noreferrer"
          className="contact-btn"
        >
          Linkedin
        </a>
      </div>
    </div>
  );
};

export default ResumePage;
