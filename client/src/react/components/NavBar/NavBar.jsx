import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import CartIcon from "../svg/CartIcon";
import AccountIcon from "../svg/AccountIcon";

import "./NavBar.scss";

export default function NavBar() {
	const [toogleMenu, setToogleMenu] = useState(false);

	const handleBurguerClick = (e) => {
		e.preventDefault();
		setToogleMenu(!toogleMenu);
	};

	return (
		<nav className="nav">
			<div className="nav__up">
				<div className="nav__up__left">
					<span className="nav__up__left__burguer" onClick={handleBurguerClick}>
						<span className="nav__up__left__burguer_bar"></span>
						<span className="nav__up__left__burguer_bar"></span>
						<span className="nav__up__left__burguer_bar"></span>
					</span>
					<h1 className="nav__up__left__logo">CLOTHES 22</h1>
				</div>

				<div className="nav__up__features">
					{/* <WishListIcon /> */}
					<NavLink exact to={"/cart"}>
						<CartIcon />
					</NavLink>
					<NavLink exact to={"/account"}>
						<AccountIcon />
					</NavLink>
				</div>
			</div>

			<div className="nav__down">
				<div className={`nav__down__links ${toogleMenu ? "menuActived" : ""}`}>
					<ul>
						<NavLink exact to={"/home"}>
							<li>Home</li>
						</NavLink>
						<NavLink exact to={"/about"}>
							<li>About</li>
						</NavLink>
					</ul>
				</div>
			</div>
		</nav>
	);
}
