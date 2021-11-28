const getState = ({ getStore, getActions, setStore }) => {
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
			userIncomes: undefined,
			incomesUSD: 0,
			userOutgoings: undefined,
			outgoingsUSD: 0
		},
		actions: {
			// Use getActions to call a function within a fuction

			sendResetPassword: email => {
				let response;
				fetch(`${process.env.BACKEND_URL}/api/send_reset_password`, {
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
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			resetPassword: (token, new_password) => {
				fetch(`${process.env.BACKEND_URL}/api/reset_password`, {
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
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			login: (email, password) => {
				const data = { email, password };
				fetch(`${process.env.BACKEND_URL}/api/login`, {
					method: "POST",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => response.json())
					.then(result => {
						if (result.access_token) {
							localStorage.setItem("jwt-token", result.access_token);
							setStore({ isLoggedIn: true });
						} else if (result.message) {
							alert(result.message);
						}
					})
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			signup: (name, lastname, email, password, repeat_password) => {
				const data = { name, lastname, email, password, repeat_password };
				fetch(`${process.env.BACKEND_URL}/api/signup`, {
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
					.catch(error => {
						getActions().login(email, password); //esto no es correcto, funciona pero hay que hablar con pablo
					});
			},

			getUserIncomes: () => {
				fetch(`${process.env.BACKEND_URL}/api/summaryinc`, {
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
					})
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			getUserOutgoings: () => {
				fetch(`${process.env.BACKEND_URL}/api/summaryout`, {
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
					})
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			deleteIncome: id => {
				fetch(`${process.env.BACKEND_URL}/api/incomes/${id}`, {
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
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			deleteOutgoing: id => {
				fetch(`${process.env.BACKEND_URL}/api/outgoings/${id}`, {
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
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			}
		}
	};
};

export default getState;
