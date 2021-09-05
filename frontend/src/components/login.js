import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "", 
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            username: "", 
            password: ""
        })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header bg-dark">
                    <h3 className="text-warning">Sign In</h3>
                </div>
                <div className="card-body bg-warning">
                    <form onSubmit={e => {
                        e.preventDefault();
                        this.props.handleLogin(e, this.state);
                        }}>
                        <div className="input-group form-group">
                            <label className="form-label">
                                Username:
                                <input className="form-control" name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                            </label>
                        </div>
                        <div className="input-group form-group">
                            <label className="form-label">
                                Password:
                                <input className="form-control" name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                            </label>
                        </div>
                        <input className="btn btn-dark text-warning"type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}
export default Login;