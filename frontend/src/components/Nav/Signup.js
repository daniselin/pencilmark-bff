import React, { useState } from "react";
import { useDispatch } from "react-redux";
import store from "../../config/store";

export function Signup (props) {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        username: "",
        password: "",
        email: ""
    });

    const handleChangeUsername = (e) => setForm({...form, username: e.target.value});
    const handleChangePassword = (e) => setForm({...form, password: e.target.value});
    const handleChangeEmail = (e) => setForm({...form, email: e.target.value});

    const handleSignup = (event) => {
        event.preventDefault();
        try {
            store.dispatch(signUpUser);
        } catch (error) {
            console.log(error.stack);
            dispatch({type: "SIGNUP_ERROR", payload: {error: error}});
        }
    }

    return (
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header bg-dark">
                    <h3 className="text-warning">Sign Up</h3>
                </div>
                <div className="card-body bg-warning">
                    <form onSubmit={handleSignup}>
                        <div className="input-group form-group">
                            <label className="form-label">
                                Username:
                                <input name="username"  className="form-control" type="text" value={form.username} onChange={handleChangeUsername}/>
                                { this.state.errors.username ? this.state.errors.username : null}
                            </label>
                        </div>
                        <div className="input-group form-group">
                            <label className="form-label">
                                Email:
                                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChangeEmail}/>
                                { this.state.errors.email ? this.state.errors.email : null}
                            </label>
                        </div>
                        <div className="input-group form-group">
                            <label className="form-label">
                                Password:
                                <input name="password" type="password" className="form-control" value={form.password} onChange={handleChangePassword}/>
                                { this.state.errors.password ? this.state.errors.password : null}
                            </label>
                        </div>
                        <input className="form-control btn btn-dark text-warning" type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;