import {actions} from "../index";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    if (state.messages && state.messages.errorMessage) {
        return {
            errorMessage: state.messages.errorMessage
        };
    }
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            resetErrorMessage: actions.resetErrorMessage
        }, dispatch)
    };
};

const ErrorMessage = (props) => {
    const {actions, errorMessage} = props;
    const {resetErrorMessage} = actions;

    useEffect(() => {
        return () => resetErrorMessage;
    }, [resetErrorMessage]);

    if (!errorMessage) {
        return false
    };

    return (
        <div className="alert alert-danger alert-icon" role="alert">
            {errorMessage}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);