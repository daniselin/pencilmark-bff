import * as PropTypes from "prop-types";
import React from "react";

const Label = (props) => {
    const {
        id,
        label,
        required
    } = props;

    if (!label) {
        return false;
    }

    return (
        <label className={required ? "is-required" : undefined} htmlFor={id}> {label}</label>
    );
};

Label.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.object
    ]).isRequired,
    required: PropTypes.bool
};

Label.defaultProps = {
    required: false
};

export default Label;