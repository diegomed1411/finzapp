const url = "https://3001-azure-swallow-c5iuhp2z.ws-us18.gitpod.io/api";

const getState = ({ getStore, getActions, setStore }) => {
	const urlback = "https://3001-sapphire-alpaca-qpw4sfdc.ws-us18.gitpod.io/api"; // Defino url de peticion de API con 100 resultados

	return {
		store: {
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
			],
			user: {}
		},
		actions: {
			// Use getActions to call a function within a fuction

			sendResetPassword: email => {
				let response;
				fetch(`${url}/send_reset_password`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email })
				})
					.then(resp => resp.json())
					.then()
					.catch();
			},

			resetPassword: (token, new_password) => {
				fetch(`${url}/reset_password`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ token, new_password })
				})
					.then(resp => resp.json())
					.then()
					.catch();
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			signin: (email, password) => {
				const data = { email, password };
				fetch(`${urlback}/login`, {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => response.json())
					.then(result => {
						if (result.access_token) {
							localStorage.setItem("jwt-token", result.access_token);
						} else if (result.message) {
							alert(result.message);
						}
					})
					.catch(error => console.log("error", error));
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
