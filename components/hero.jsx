const Hero = (props) => {
    return (
        <div className="container mx-auto items-center py-12 flex flex-col">
            <img
                src="photos/avatar.png"
                alt="avatar"
                className="w-32 h-32 object-contain object-center rounded-full"
            />
            <h1
                className={props.avatarLabel !== 0 ? "text-2xl font-bold py-6" : "hidden"}
            >
                {props.avatarLabel}
            </h1>
            {props.title}
            {props.message}
        </div>
    )
}

export default Hero;
