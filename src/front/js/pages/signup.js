import React, { useContext, useState } from "react";


export const SignUp = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
  
    const signup = async () => {
        const resp = await fetch('https://humble-chainsaw-qj669694jg736xgx-3001.app.github.dev/api/sign-up', {
					method: "POST",
					body: JSON.stringify({
							email: email,
							password: password
						}),
					headers: {
						"Content-Type": "application/json"
					}
				});
				const body = await response.json();
					if(response.ok) {
						setStore({
							user: body.user,
							token: body.access_token
							});
							
						sessionStorage.setItem("token", body.token);
						sessionStorage.setItem("user", JSON.stringify(body.user));
				}
    }

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <h1 className="m-5">Sign up Below</h1>
            <input 
            placeholder="email" 
            className="m-2"
            onChange={(e) => setEmail(e.target.value)}
            />  
            <input 
            placeholder="password" 
            className="m-2" 
            onChange={(e) => setPassword(e.target.value)}
            />
            <button 
            className="btn btn-success"
            onClick={() => signup(email, password)}
            >
                Submit
            </button>

        </div>
    )
}