import PropTypes from "prop-types"
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

    {/* I'm not sure of the correctness of the following codes. It will be like this until I find a better method. */}

      {props.avatarLabel}
      {props.title}
      {props.message}
      
    </div>
  );
};

Hero.propTypes = {
  avatarLabel: PropTypes.any,
  message: PropTypes.any,
  title: PropTypes.any
}

export default Hero;