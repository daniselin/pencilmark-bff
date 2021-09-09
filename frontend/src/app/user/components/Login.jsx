import {pick} from "lodash";

const mapStateToProps = (state) => {
    return {
        token: {...pick(state.token, [
                "accessToken",
                "refreshToken"
            ])}
    };
};