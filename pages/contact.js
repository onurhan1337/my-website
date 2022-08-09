import Hero from "../components/hero";

const ContactPage = () => {
  const title = (
    <h2 className="text-3xl sm:text-6xl leading-tight font-semibold text-center">
      <span className="sketch-highlight">Hello!</span> I've
      <br />
      waiting for you.
    </h2>
  );

  const message = (
    <p className="text-center pt-6">
      Contact to me in superpeer or{" "}
      <a
        href="mailto:onurhandtr@gmail.com"
        className="underline underline-offset-2 font-semibold"
      >
        Send me an email
      </a>
    </p>
  );

  return (
    <div className="container mx-auto items-center flex flex-col">
      <Hero title={title} message={message} />
      <a
        href="https://superpeer.com/onurhan"
        className="w-48 h-16 flex flex-none items-center justify-around gap-x-1.5 cursor-pointer leading-none transition-all delay-100 font-medium px-4 py-2.5 text-lg rounded-lg bg-[#1C1C1C] hover:bg-black shadow-xs text-white border border-gray-400 border-opacity-30 hover:border-opacity-50 hover:shadow-sm undefined"
      >
        superpeer
        <img
          className="w-8 h-8"
          src="photos/superpeer_logo.svg"
          alt="superpeer logo"
        />
      </a>
    </div>
  );
};

export default ContactPage;
