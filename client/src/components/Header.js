import { Link } from "react-router-dom";

const navItems = [{  name: "Главная", href: "/" },{ name: "Аккаунт", href: "/account" },{ name: "Люди", href: "/people" }  ];

export const Header = ()  => {
	return (
		<header>
			<div className="container">
                <nav>
                    <ul>
					{navItems.map(({ name, href }) => (
						<li
						>
							<Link to={href}>{name}</Link>
						</li>
					))}
				    </ul>
                </nav>
				
			</div>
		</header>
	);
}
