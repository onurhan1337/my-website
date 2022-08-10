import Image from "next/image";

const Hero = (props) => {
  return (
    <div className="site-container flex flex-col">
      <Image
        src="/photos/avatar.png"
        alt="avatar"
        width={128}
        height={128}
        className="w-32 h-32 object-contain object-center rounded-full"
      />
      <h5
        className={
          props.avatarLabel !== 0 ? "title" : "hidden"
        }
      >
        {props.avatarLabel}
      </h5>

      <h1 className="title">{props.title}</h1>
     <p className="text-black px-5">{props.message}</p>
    </div>
  );
};

export default Hero;
