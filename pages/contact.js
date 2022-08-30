import Hero from '../components/hero';
import SuperpeerLogo from '../public/photos/superpeer_logo.svg';

const ContactPage = () => {
  const title = (
    <h2 className="text-3xl sm:text-6xl leading-tight dark:text-white font-semibold text-center">
      <span className="sketch-highlight">Hello!</span> I've 
      <br /> waiting for you.
    </h2>
  );

  const message = (
    <p className="text-center text-black dark:text-zinc-500 pt-2">
      Contact to me in superpeer or{" "}
      <a
        href="mailto:onurhandtr@gmail.com"
        className="underline underline-offset-2 font-semibold dark:text-zinc-300"
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
        className="contact-btn"
      >
        superpeer
        <SuperpeerLogo
          className="w-8 h-8"
          src="photos/superpeer_logo.svg"
          alt="superpeer logo"
        />
      </a>
    </div>
  );
};

export default ContactPage;
