import React from "react";
import * as PropTypes from "prop-types";

const Header = (props) => {

    const {
        children,
        username
    } = props;

    const logoutUrl = API_URL + "/logout";

    return (
        <header>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#pencilmark-nav-collapse" aria-expanded="false">
                            <span className="sr-only">ToggleNavigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand" href="#">Pencilmark</a>
                    </div>

                    <div className="collapsed navbar-collapse" id="pencilmark-nav-collapse">
                        <ul className="nav navbar-nav">
                            {children}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <span>{username}</span>
                                    <i className="fa fa-angle-down"/>
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li><a href={logoutUrl}>Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

Header.propTypes = {
    children: PropTypes.node.isRequired
};

export default Header;