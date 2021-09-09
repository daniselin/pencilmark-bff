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
    return {...pick(state.form, [
        "fieldErrors"
    ])};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            update: formActions.update
        }, dispatch)
    };
};

const TextField = (props) => {
    const {
        actions,
        id,
        name,
        defaultValue,
        label,
        className,
        maxLength,
        required,
        disabled,
        placeholder,
        fieldErrors,
        autoFocus,
        type
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
        <FormGroup id={id} fieldErrors={fieldErrors}>
            <Label id={id} label={label} required={required}/>
                <input autoFocus={autoFocus}
                       id={id} name={name || id}
                       type={type}
                       className={"form-control " + className}
                       placeholder={placeholder}
                       defaultValue={defaultValue}
                       onChange={onChange}
                       disabled={disabled} maxLength={maxLength}/>
        </FormGroup>
    );
};

TextField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.object
    ]),
    className: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    type: PropTypes.string
};

TextField.defaultProps = {
    name: "",
    label: "",
    className: "",
    defaultValue: "",
    disabled: false,
    autoFocus: false,
    type: "text"
};

export default connect(mapStateToProps, mapDispatchToProps)(TextField);