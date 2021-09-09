import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import AppRouter from "../Router/AppRouter";
import { Navbar } from "./Nav/Navbar";
import store from "../config/store";
import { initialLoginUser } from "../reducers/UserReducer";

const getAccessToken = state => state.accessToken

export function App(props){
    
    const accessToken = useSelector(getAccessToken);
    accessToken && store.dispatch(initialLoginUser);
    return (
        <div className="site">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous"></link>
            <Navbar/>
            <main>
                <AppRouter/>
            </main>
        </div>
    );
}

export default withRouter(App);