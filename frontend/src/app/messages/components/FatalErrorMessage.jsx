import {actions} from "../index";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    if (state.messages && state.messages.fatalErrorMessage) {
        return {
            fatalErrorMessage: state.messages.fatalErrorMessage
        };
    }
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            resetFatalErrorMessage: actions.resetFatalErrorMessage
        }, dispatch)
    };
};

const FatalErrorMessage = (props) => {
    const {actions, fatalErrorMessage} = props;
    const {resetFatalErrorMessage} = actions;

    useEffect(() => {
        return () => resetFatalErrorMessage;
    }, [resetFatalErrorMessage]);

    if (!fatalErrorMessage) {
        return false
    };

    return (
        <div className="bg-warning util-padding-30">
            <section className="util-padding-top-20 util-padding-bottom-10">
                <div className="text-center">
                    <p>Internal Error</p>
                    <p>{fatalErrorMessage}</p>
                </div>
            </section>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FatalErrorMessage);