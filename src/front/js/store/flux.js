import { Navigate } from "react-router-dom";

const baseApiUrl = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: undefined,
			token: undefined,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				if(token && token !== "" && token != undefined) setStore({ token: token });
			},

			logIn: async ({email, password}) => {
                const response = await fetch(
                    'https://humble-chainsaw-qj669694jg736xgx-3001.app.github.dev/api/token', {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            password: password
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                const body = await response.json();
                if (response.ok) {
                    setStore({
                        token: body.access_token,
                        user: body.user
                    });
                    sessionStorage.setItem("token", body.access_token);
                    sessionStorage.setItem("user", body.user);
                    return true
                }
            }
,

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({
					token: undefined, 
					user: undefined
				});
				
			},

			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"authorization": "Bearer " + store.token
					}
				}
				try{
					// fetching data from the backend
					const resp = await fetch("https://humble-chainsaw-qj669694jg736xgx-3001.app.github.dev/api/hello", opts)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			signUp: async ({email, password}) => {
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
		}
	};
};

export default getState;
