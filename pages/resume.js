import Timeline from "../components/timeline/index";

const ResumePage = () => {

  return (
    <div>
      <Timeline />
      <div className="flex flex-col items-center justify-center space-x-3 space-y-3 mb-6">
        <p  className="text-normal text-center text-wrap px-3">
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
