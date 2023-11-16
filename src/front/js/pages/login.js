import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = (props) => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [ email, setEmail] = useState("");
	const [ password, setPassword ] = useState("");
	const onSubmit = async (event) => {
		const success = await actions.logIn({
			email: email,
			password: password
		});
		if (success) {
		navigate("/");
		}
	};

	if(store.token && store.token !== "" && store.token !== undefined)	{
		navigate('/');
	}

	return (
		<div className="text-center mt-5">
				<h1>Login</h1>

				{(store.token && store.token !== "" && store.token !== undefined) ? "You are Logged in with this token" + store.token : 
					<div>

					<input 
					type="text" 
					placeholder="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					>
					</input>
					<input 
					type="password" 
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					>
					</input>
					<button
					onClick={onSubmit}
					>
						Login
					</button>
				</div>
				}
		</div>
	);
};
