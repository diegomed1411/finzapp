const getState = ({ getStore, getActions, setStore }) => {
	const urlback = "https://3001-coffee-amphibian-7tw66dph.ws-us17.gitpod.io/api"; // Defino url de peticion de API con 100 resultados
	const urlapi = "http://api.currencylayer.com/live?access_key=a3f96353a3db8d1757a469f86fa0160b&format=1";

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
			user: {
				name: "",
				lastname: "",
				email: "",
				id: ""
			},

			userIncomes: [],
			userOutgoings: [],
			exchangeRate: {}
		},
		actions: {
			// Use getActions to call a function within a fuction

			getUserIncomes: () => {
				fetch(`${urlapi}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(result => setStore({ exchangeRate: result }));
			},

			sendResetPassword: email => {
				let response;
				fetch(`${urlback}/send_reset_password`, {
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
				fetch(`${urlback}/reset_password`, {
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

			signup: (name, lastname, email, password, repeat_password) => {
				const data = { name, lastname, email, password, repeat_password };
				fetch(`${urlback}/signup`, {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => response.json())
					.then(result => {
						alert("hola");
					})
					.catch(error => console.log("error", error));
			},

			getUserIncomes: () => {
				fetch(`${urlback}/summaryinc`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer" + localStorage.getItem("jwt-token")
					}
				})
					.then(response => response.json())
					.then(result => setStore({ userIncomes: result }));
			},

			getUserOutgoings: () => {
				fetch(`${urlback}/summaryout`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer" + localStorage.getItem("jwt-token")
					}
				})
					.then(response => response.json())
					.then(result => setStore({ userOutgoings: result }));
			},

			deleteIncomes: id => {
				fetch(`${urlback}/'/incomes/<int:${id}>'`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer" + localStorage.getItem("jwt-token")
					}
				})
					.then(response => response.json())
					.then(result => {
						setStore({ userIncomes: result });
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
