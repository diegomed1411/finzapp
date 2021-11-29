const getState = ({ getStore, getActions, setStore }) => {
	const urlapi = "http://api.currencylayer.com/live?access_key=a3f96353a3db8d1757a469f86fa0160b&format=1";

	return {
		store: {
			user: {},
			isLoggedIn: false,
			userIncomes: undefined,
			incomesUSD: 0,
			userOutgoings: [],
			exchangeRate: 42,
			userOutgoings: undefined,
			outgoingsUSD: 0
		},
		actions: {
			getRate: () => {
				fetch(urlapi, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(result => setStore({ exchangeRate: result.quotes.USDUYU }));
			},

			sendResetPassword: email => {
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
							setStore({ user: result.user });
						} else if (result.message) {
							alert(result.message);
						}
						//getActions().getRate();
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
						} else {
							setStore({ userIncomes: result.incomes });
							let usd = 0;
							result.incomes.forEach(income => {
								if (income.currency == "UYU") {
									usd += income.amount / getStore().exchangeRate;
								} else usd += income.amount;
							});
							setStore({ incomesUSD: usd });
						}
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
						} else {
							setStore({ userOutgoings: result.outgoings });
							let usd = 0;
							result.outgoings.forEach(outgoing => {
								if (outgoing.currency == "UYU") {
									usd += outgoing.amount / getStore().exchangeRate;
								} else usd += outgoing.amount;
							});
							setStore({ outgoingsUSD: usd });
						}
					})
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			amendIncome: (id, type, subtype, currency, date, amount, description) => {
				const data = { type, subtype, currency, date, amount, description };
				fetch(`${process.env.BACKEND_URL}/api/incomes/${id}`, {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("jwt-token")
					}
				})
					.then(response => response.json())
					.then(result => {
						if (result.message) {
							alert(result.message);
						} else getActions.getUserIncomes();
					})
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			amendOutgoing: (id, type, subtype, currency, date, amount, description) => {
				const data = { type, subtype, currency, date, amount, description };
				fetch(`${process.env.BACKEND_URL}/api/outgoings/${id}`, {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("jwt-token")
					}
				})
					.then(response => response.json())
					.then(result => {
						if (result.message) {
							alert(result.message);
						} else getActions.getUserOutgoings();
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
						} else getActions().getUserIncomes();
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
						} else getActions().getUserOutgoings();
					})
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			newIncome: (type, subtype, currency, date, amount, description) => {
				const data = { type, subtype, currency, date, amount, description };
				fetch(`${process.env.BACKEND_URL}/api/incomes`, {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("jwt-token")
					}
				})
					.then(response => response.json())
					.then(result => {
						if (result.message) {
							alert(result.message);
						}
						getActions().getUserIncomes();
					})
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			newOutgoing: (type, subtype, currency, date, amount, description) => {
				const data = { type, subtype, currency, date, amount, description };
				fetch(`${process.env.BACKEND_URL}/api/outgoings`, {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("jwt-token")
					}
				})
					.then(response => response.json())
					.then(result => {
						if (result.message) {
							alert(result.message);
						}
						getActions().getUserOutgoings();
					})
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			}
		}
	};
};

export default getState;
