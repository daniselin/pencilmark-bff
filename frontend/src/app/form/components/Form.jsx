import React, {useCallback} from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {actions as formActions} from "../index";
import {bindActionCreators} from "redux";
import {pick} from "lodash";

const mapStatesToProps = (state) => {
    return {...pick(state.form, [
        "values",
        "fieldErrors",
        "focus"
    ])};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            resetFocus: formActions.resetFocus
        }, dispatch)
    };
};

const Form = (props) => {
    const {
        className,
        children
    } = props;

    const submit = useCallback((event) => {
        event.preventDefault();
        if (props.onSubmit) {
            props.onSubmit({...props.value});
        }
    }, [props]);

    return (
        <form className={className || "form"} onSubmit={() => submit}>
            {children}
        </form>
    );
};

Form.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onSubmit: PropTypes.func
};

Form.defaultProps = {
    className: ""
};

export default connect(mapStatesToProps, mapDispatchToProps)(Form);