import {actions} from "../index";
import {connect} from "react-redux";
import MessageDismissButton from "./MessageDismissButton";

const mapStateToProps = (state) => {
    if (state.messages && state.messages.successMessage) {
        return {
            successMessage: state.messages.successMessage
        };
    }
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            resetSuccessMessage: actions.resetSuccessMessage
        }, dispatch)
    };
};

const SuccessMessage = (props) => {
    const {actions, successMessage} = props;
    const {resetSuccessMessage} = actions;

    useEffect(() => {
        return () => resetSuccessMessage;
    }, [resetSuccessMessage]);

    if (!successMessage) {
        return false
    };

    return (
        <div className="alert alert-danger alert-icon" role="alert">
            <MessageDismissButton/>
            {successMessage}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessMessage);