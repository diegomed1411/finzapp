import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Incomes from "./pages/Incomes";
import Outgoings from "./pages/Outgoings";
import NotFound from "./pages/NotFound";
import injectContext, { Context } from "./store/appContext";

//create your first component
const Layout = () => {
	const { store } = useContext(Context);

	const PrivateRoute = ({ children: Component, ...rest }) => {
		return <Route {...rest}>{store.isLoggedIn ? Component : <Redirect to="/signup" />}</Route>;
	};

	const PublicRoute = ({ children: Component, ...rest }) => {
		return <Route {...rest}>{store.isLoggedIn ? <Redirect to="/home" /> : Component}</Route>;
	};

	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Switch>
						<Route exact path="/">
							<Redirect to="/signup" />
						</Route>
						<PublicRoute exact path="/signup">
							<SignUp />
						</PublicRoute>
						<PublicRoute exact path="/login">
							<LogIn />
						</PublicRoute>
						<Route exact path="/forgot_password">
							<ForgotPassword />
						</Route>
						<Route exact path={`/reset_password/:token`}>
							<ResetPassword />
						</Route>
						<PrivateRoute exact path="/home">
							<Dashboard />
						</PrivateRoute>
						<PrivateRoute exact path="/incomes">
							<Incomes />
						</PrivateRoute>
						<PrivateRoute exact path="/outgoings">
							<Outgoings />
						</PrivateRoute>
						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route>
							<NotFound />
						</Route>
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
