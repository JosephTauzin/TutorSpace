import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Nav = () => (
	<div className="navbar bg-base-100 lg:px-12 xl:px-16">
		<div className="navbar-start">
			<div className="dropdown">
				<label tabIndex={0} className="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/>
					</svg>
				</label>
				<ul
					tabIndex={0}
					className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<Link to={`/`}>Home</Link>
					</li>
					<li>
						<Link to={"/about"}>About</Link>
					</li>
					<li>
						<HashLink to={"/#contact"}>Contact</HashLink>
					</li>
				</ul>
			</div>
			<Link
				to={"/"}
				className="btn btn-ghost normal-case text-xl gap-0 text-primary"
			>
				Tutor<span className="font-bold text-accent">Space</span>
			</Link>
		</div>
		<div className="navbar-center hidden px-1.5 lg:flex">
			<ul className="menu menu-horizontal px-1">
				{/* dont really need the href to home, if they can see the top nav bar, they can see home.*/}
				<li>
					<Link to={`/`}>Home</Link>
				</li>
				<li>
					<Link to={"/about"}>About</Link>
				</li>
				<li>
					<HashLink to={"/#contact"}>Contact</HashLink>
				</li>
			</ul>
		</div>
		<div className="navbar-end">
			<Link to={`/login`} className="btn">
				Log In
			</Link>
		</div>
	</div>
);

export default Nav;
