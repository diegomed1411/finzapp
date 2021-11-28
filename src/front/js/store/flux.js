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
			userIncomes: undefined,
			incomesUSD: 0,
			userOutgoings: [],
			exchangeRate: undefined,
			userOutgoings: undefined,
			outgoingsUSD: 0
		},
		actions: {
			// Use getActions to call a function within a fuction

			getRate: () => {
				fetch(`${urlapi}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => response.json())
					.then(result => setStore({ exchangeRate: result.quotes.USDUYU }));
			},

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
						} else 
						setStore({ userIncomes: result.incomes });
					})
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			getUserIncomesUSD: () =>{
				let incomes = getUserIncomes();
				let USDincomes;
				let exchangeRate = exchangeRate();
				incomes.incomes.forEach(element => {
					if (element.currency == "UYU") {
						element.currency = "USD";
						element.amount = element.amount / exchangeRate;

					}
				});

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

			amendIncome: (id, type, subtype, currency, description, date, amount ) => {
				const data = { type, subtype, currency, description, date, amount };
				fetch(`${process.env.BACKEND_URL}/api/incomes/${id}`, {
					method: "PUT",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => response.json())
					.then(result => {
						if (result.message) {
							alert(result.message);
						} else setStore({ userIncomes: result });
					})
					.catch(error => alert("Ha ocurrido un error, intente mas tarde."));
			},

			amendOutgoing: (id, type, subtype, currency, description, date, amount ) => {
				const data = { type, subtype, currency, description, date, amount };
				fetch(`${process.env.BACKEND_URL}/api/outgoings/${id}`, {
					method: "PUT",
					body: JSON.stringify(data),
					headers: { "Content-Type": "application/json" }
				})
					.then(response => response.json())
					.then(result => {
						if (result.message) {
							alert(result.message);
						} else setStore({ userOutgoings: result });
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
			},

			newIncome: (type, subtype, currency, date, amount, description) => {
				const data = { type, subtype, currency, date, amount, description };
				fetch(`${process.env.BACKEND_URL}/api/incomes`, {
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
					.catch(error => alert("Ha ocurrido un error, intente mas tarde.") //esto no es correcto, funciona pero hay que hablar con pablo
					);
			},

			newOutgoing: (type, subtype, currency, date, amount, description) => {
				const data = { type, subtype, currency, date, amount, description };
				fetch(`${process.env.BACKEND_URL}/api/outgoings`, {
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
					.catch(error => alert("Ha ocurrido un error, intente mas tarde.") //esto no es correcto, funciona pero hay que hablar con pablo
					);
			},


		}
	};
};

export default getState;
