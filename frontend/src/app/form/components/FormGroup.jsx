import React from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {pick} from "lodash";

const mapStateToProps = (state) => {
    return {...pick(state.form, [
        "fieldErrors"
        ])};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({}, dispatch)
    };
};

const FormGroup = (props) => {
    const {
        children,
        id,
        showError,
        fieldErrors
    } = props;

    const fieldError = fieldErrors && fieldErrors[id];
    return (
        <div className={"form-group" + (fieldError ? " has-error": "")}>
            {children}
            {showError && <span className="app-field-error">{fieldError}</span>}
        </div>
    );
};

FormGroup.propTypes = {
    showError: PropTypes.bool,
    id: PropTypes.string.isRequired
};

FormGroup.defaultProps = {
    showError: true
};

export default connect(mapStateToProps, mapDispatchToProps)(FormGroup);