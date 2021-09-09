import {pick} from "lodash";
import {bindActionCreators} from "redux";

const mapStateToProps = (state) => {
    return {
        ...pick(state.form, [
            "values"
        ])
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            actions: bindActionCreators({
                actions:
            })
        }
    }

}
