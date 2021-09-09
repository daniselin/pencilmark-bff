import React, { useState } from "react";
import store from "../../config/store";
import { loginUser } from "../../reducers/UserReducer";

export function Login (props) {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChangeUsername = (e) => setForm({...form, username: e.target.value});
    const handleChangePassword = (e) => setForm({...form, password: e.target.value});

    const handleLogin = (event) => {
        event.preventDefault();
        try {
            store.dispatch(loginUser);
            props.history.push('/hello/');
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header bg-dark">
                    <h3 className="text-warning">Sign In</h3>
                </div>
                <div className="card-body bg-warning">
                    <form onSubmit={handleLogin}>
                        <div className="input-group form-group">
                            <label className="form-label">
                                Username:
                                <input  className="form-control" name="username" type="text" value={form.username} onChange={handleChangeUsername}/>
                            </label>
                        </div>
                        <div className="input-group form-group">
                            <label className="form-label">
                                Password:
                                <input className="form-control" name="password" type="password" value={form.password} onChange={handleChangePassword}/>
                            </label>
                        </div>
                        <input className="btn btn-dark text-warning"type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        </div>
        )
    }
export default Login;