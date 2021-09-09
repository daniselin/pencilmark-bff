import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import store from "../../config/store";

const selectUser = state => state.user

export function Navbar(props) {
    
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            store.dispatch(blacklistToken);
            props.history.push('/login/');
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <nav className="navbar bg-warning">
            <Link className={"navbar-brand text-dark"} to={"/"}>Pencilmark</Link>
            {user.isLoggedIn
                ? <div className="navbar nav">
                    <button className={"btn btn-dark text-warning"} onClick={handleLogout}>Logout</button>
                    <Link className={"btn btn-dark text-warning"} to={"/hello/"}>Hello</Link>
                    <Link className={"btn btn-dark text-warning"} to={"/puzzle/create/"}>Create Puzzle</Link>
                </div>
                : <div className="navbar nav">
                    <Link className={"btn btn-dark text-warning"} to={"/login/"}>Login</Link>
                    <Link className={"btn btn-dark text-warning"} to={"/signup/"}>Signup</Link>
                </div>}
        </nav>
    );
}