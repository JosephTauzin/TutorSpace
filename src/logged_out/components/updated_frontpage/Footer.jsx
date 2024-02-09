import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer = () => (
	<footer className="footer p-16 bg-accent text-neutral-content">
		<nav>
			<header className="footer-title text-secondary opacity-90">
				TutorSpace
			</header>
			<a className="link link-hover text-secondary ">
				<Link to={"/about"}>About Us</Link>
			</a>{" "}
			<a className="link link-hover text-secondary">
				<Link to={`/login`}>Log In</Link>
			</a>
			<a className="link link-hover text-secondary">
				<HashLink to={"/#contact"}>Contact</HashLink>
			</a>
		</nav>
	</footer>
);

export default Footer;
