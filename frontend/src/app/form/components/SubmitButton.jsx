import React, {useCallback} from "react";
import * as PropTypes from "prop-types";

const SubmitButton = (props) => {
    const {
        label,
        type,
        color,
        className,
        isLoading,
        loadingLabel
    } = props;

    const onClick = useCallback((e) => {
            const { onClick } = props;
            if (onClick) {
                onClick(e);
            }
        }, [props]
    );

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading}
            className={"btn btn-" + color + " " + className}>
            {isLoading ? loadingLabel : label}
        </button>
    );
}

SubmitButton.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    type: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    loadingLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
        ]),
    onClick: PropTypes.func
};

SubmitButton.defaultProps = {
    loadingLabel: "",
    type: "submit",
    color: "primary"
};

export default SubmitButton;