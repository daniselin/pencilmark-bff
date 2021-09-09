import {Link} from "react-router-dom";
import React from "react";
import * as PropTypes from "prop-types";

const NavigationLink = (props) => {
    const {
        title,
        link,
        active
    } = props

    return (
        <li role="presentation" className={active ? "active" : ""}>
            <Link to={link}>{title}</Link>
        </li>
    )
}

NavigationLink.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    active: PropTypes.bool
};

NavigationLink.defaultProps = {
    active: false
};

export default NavigationLink;