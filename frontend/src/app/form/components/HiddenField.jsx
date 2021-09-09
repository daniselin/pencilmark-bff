import has from "lodash/has";
import { pick } from "lodash"
import React, { useCallback } from "react";
import {actions as formActions} from "../index";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as PropTypes from "prop-types";
import FormGroup from "./FormGroup";
import Label from "./Label";

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            update: formActions.update
        }, dispatch)
    };
};

const HiddenField = (props) => {
    const {
        actions,
        id,
        defaultValue,
    } = props;

    const {update} = actions;

    const onChange = useCallback((event) => {
            if (!has(props, "storeUpdatedValue") ||props["storedUpdatedValue"]) {
                update(event.target.id, event.target.value);
            }
            const {onChange} = props;
            if (onChange) {
                onChange({
                    id: event.target.id,
                    value: event.target.value,
                    event: event
                });
            }
        }, [props, update]
    );

    return (
        <input
           id={id}
           type="hidden"
           defaultValue={defaultValue}
           onChange={onChange}/>
    );
};

HiddenField.propTypes = {
    id: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    onChange: PropTypes.func,
};

HiddenField.defaultProps = {
    name: "",
    label: "",
    className: "",
    defaultValue: "",
    disabled: false,
    autoFocus: false,
    type: "text"
};

export default connect(mapStateToProps, mapDispatchToProps)(HiddenField);