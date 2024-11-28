
const NavLink = ({ href, icon, label, styles }) => {
    return (
        <a
            href={href}
            className={`transition duration-300 ${styles}`}
        >
            <i className={`fas ${icon} text-xl mb-1 `}></i>
            {label}
        </a>
    )
}

export default NavLink
