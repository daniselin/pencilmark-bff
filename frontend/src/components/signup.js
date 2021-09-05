import React, { Component } from "react";

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email:"",
            errors: {
                response: {}
            }
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header bg-dark">
                        <h3 className="text-warning">Sign Up</h3>
                    </div>
                    <div className="card-body bg-warning">
                        <form onSubmit={e => {
                            e.preventDefault();
                            this.props.handleSignup(e, this.state)}}>
                            <div className="input-group form-group">
                                <label className="form-label">
                                    Username:
                                    <input name="username"  className="form-control" type="text" value={this.state.username} onChange={this.handleChange}/>
                                    { this.state.errors.username ? this.state.errors.username : null}
                                </label>
                            </div>
                            <div className="input-group form-group">
                                <label className="form-label">
                                    Email:
                                    <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange}/>
                                    { this.state.errors.email ? this.state.errors.email : null}
                                </label>
                            </div>
                            <div className="input-group form-group">
                                <label className="form-label">
                                    Password:
                                    <input name="password" type="password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
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
}
export default Signup;