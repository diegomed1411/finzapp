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
			isLoggedIn: false,
			userIncomes: [],
			incomesUSD: 0,
			userOutgoings: [],
			exchangeRate: {},
			outgoingsUSD: 0

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
				fetch(`${process.env.BACKEND_URL}/send_reset_password`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email })
				})
					.then(resp => resp.json())
					.then(result => {
						if (result.message) alert(result.message);
					})
					.catch();
			},

			resetPassword: (token, new_password) => {
				fetch(`${process.env.BACKEND_URL}/reset_password`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ token, new_password })
				})
					.then(resp => resp.json())
					.then(result => {
						if (result.message) alert(result.message);
					})
					.catch();
			},

			login: (email, password) => {
				const data = { email, password };
				fetch(`${process.env.BACKEND_URL}/login`, {
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
				fetch(`${process.env.BACKEND_URL}/signup`, {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => response.json())
					.then(result => {
						if (result.message) {
							alert(result.message);
						}
					})
					.catch(error => console.log("error", error));
			},

			getUserIncomes: () => {
				fetch(`${process.env.BACKEND_URL}/summaryinc`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("jwt-token")
					}
				})
					.then(response => response.json())
					.then(result => {
						if (result.message) {
							alert(result.message);
						} else setStore({ userIncomes: result.incomes });
					});
			},

			getUserOutgoings: () => {
				fetch(`${process.env.BACKEND_URL}/summaryout`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("jwt-token")
					}
				})
					.then(response => response.json())
					.then(result => {
						if (result.message) {
							alert(result.message);
						} else setStore({ userOutgoings: result.outgoings });
					});
			},


			deleteIncome: id => {
				fetch(`${process.env.BACKEND_URL}/incomes/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("jwt-token")

					}
				})
					.then(response => response.json())
					.then(result => {

						if (result.message) {
							alert(result.message);
						} else setStore({ userIncomes: result });
					})
					.catch(error => console.log("error", error));

			},

			deleteOutgoing: id => {
				fetch(`${process.env.BACKEND_URL}/outgoings/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("jwt-token")
					}
				})
					.then(response => response.json())
					.then(result => {
						if (result.message) {
							alert(result.message);
						} else setStore({ userOutgoings: result });
					})
					.catch(error => console.log("error", error));
			}
		}
	};
};

export default getState;
