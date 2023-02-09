const Button = ({ children, onClick, className, disabled, ...props }) => {
    return (
        <button
            className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : "button"}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
            >
            {children}
            </button>
    )
}

export default Button;