import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const onSubmit = async (event) => {
		const success = await actions.logout();
		Navigate('/');
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!store.token ?
						<Link to="/login">
						<button className="btn btn-primary">Login</button>
						</Link>
						:
						<button 
						onClick={onSubmit} 
						className="btn btn-primary">
							Logout
							</button>
					}
				</div>
			</div>
		</nav>
	);
};
