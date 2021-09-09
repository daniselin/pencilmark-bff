import connect from "react-redux";
import * as PropTypes from "prop-types";
import Header from "./Header";
import React from "react";
import SuccessMessage from "../messages/components/SuccessMessage";
import ErrorMessage from "../messages/components/ErrorMessage";
import FatalErrorMessage from "../messages/components/FatalErrorMessage";
import NavigationLink from "./NavigationLink";
import {pick} from "lodash";
import Loading from "./Loading";
import BuildPuzzle from "../../components/BuildPuzzle/BuildPuzzle";

const mapStateToProps = (state) => {
    return {
        ...pick(state.messages, [
            "fatalErrorMessage"
        ]),
        token: {...pick(state.token, [
            "accessToken",
            "refreshToken"
        ])},
        user: {
            ...pick(state.user, [
                "username",
                "email",
                "hasAuthenticated"
            ])
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({}, dispatch)
    };
};

const MainContainer = (props) => {
    const {
        children,
        section,
        secondarySection,
        title,
        fatalErrorMessage,
        user
    } = props;

    return (
        <div>
                <Header userName={user["username"]}>
                    {user["hasAuthenticated"]} ?
                    <>
                        <NavigationLink title="Home" link={"/user" + user["username"]} active={section === "home"}/>
                        <NavigationLink title="Build Puzzle" link="/puzzle/build" active={section === "build-puzzle"}/>
                    </>
                    :
                    <>
                        <NavigationLink title="Login/Signup" link="/login" active={section === "login"}/>
                    </>
                </Header>

            <>
                {section === "home" &&
                <Home secondarySection={secondarySection} username={user["username"]}/>
                }
                {section === "build-puzzle &&" &&
                <BuildPuzzle />
                }
                {section === "login &&" &&
                <Login />
                }
            </>

            <div className="container-fluid">
                <div className="row util-padding-top-20">
                    <div className="col-xl-10 col-xl-offset-1 app-main-container">
                        {fatalErrorMessage ?
                            <FatalErrorMessage/>
                            :
                            (user["hasAuthenticated"] ?
                                    <div>
                                        {title}
                                        <SuccessMessage/>
                                        <ErrorMessage/>
                                        {children}
                                    </div>
                                    :
                                    <Loading />
                            )
                        }
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

MainContainer.propTypes = {
    children: PropTypes.node.isRequired,
    section: PropTypes.oneOf(["notFound","home", "build-puzzle", "login"]).isRequired,
    secondarySection: PropTypes.string,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);