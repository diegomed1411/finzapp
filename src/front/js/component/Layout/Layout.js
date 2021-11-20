import React from "react";
import { any } from "prop-types";

import "./styles.scss";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
	return (
		<div className="layout">
			<nav className="menu-container">
				<nav className="menu">
					<section className="user">
						<div className="information-row">
							<i className="far fa-user user-info" />
							<h4 className="user-info">Nombre Apellido</h4>
						</div>
						<h6 className="user-info">useremail@mail.com</h6>
					</section>
					<Link to="/home" style={{ textDecoration: "none" }}>
						<div className="menu-button information-row">
							<i className="fas fa-chart-pie title user-info" />
							<h5 className="title">Dashboard</h5>
						</div>
					</Link>
					<Link to="/incomes" style={{ textDecoration: "none" }}>
						<div className="menu-button information-row">
							<i className="fas fa-chevron-up title user-info" />
							<h5 className="title">Ingresos</h5>
						</div>
					</Link>
					<Link to="/outgoings" style={{ textDecoration: "none" }}>
						<div className="menu-button information-row">
							<i className="fas fa-chevron-down title" />
							<h5 className="title">Egresos</h5>
						</div>
					</Link>
				</nav>
				<div className="menu-button information-row leave">
					<h5 className="title">Cerrar sesión</h5>
					<i className="fas fa-sign-out-alt title" />
				</div>
			</nav>
			<div className="layout-container">{children}</div>
		</div>
	);
};

Layout.propTypes = {
	children: any
};

export default Layout;
