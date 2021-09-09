import {actions} from "../index";
import {connect} from "react-redux";
import {useCallback} from "react";

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            resetSuccessMessage: actions.resetSuccessMessage
        }, dispatch)
    };
};

const MessageDismissButton = (props) => {
    const {actions} = props;
    const {resetSuccessMessage} = actions;

    const onResetSuccessMessage = useCallback((event) => {
        event.preventDefault();
        resetSuccessMessage();
    }, [resetSuccessMessage]
    );

    return (
        <button type="button" className="close" onClick={onResetSuccessMessage}>
            <span aria-hidden="true">&times;</span>
        </button>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageDismissButton);