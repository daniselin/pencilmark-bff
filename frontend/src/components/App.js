import React, { Component} from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Hello from "./hello";
import axiosInstance from "../axiosApi";

class App extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        };
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('access_token')) {
            this.setState({isLoggedIn: true});
        };
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            this.setState({isLoggedIn: false});
            this.props.history.push('/login/');
            return response;
        }
        catch (e) {
            console.log(e);
        }
};

    async isAuthenticated(token){
        const response = await axiosInstance.post('/token/verify/', {
            "token": token,
        });
        this.state.isAuthenticated = response.data.isVerified;
    };

    async handleLogin(event, data) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/token/obtain/', {
                "username": data.username,
                "password": data.password
                });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            this.setState({isLoggedIn: true});
            this.props.history.push('/hello/');
            return response;
        } catch (error) {
            throw error;
        }
    }

    async handleSignup(event, data) {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/user/create/', {
                "username": data.username,
                "password": data.password,
                "email": data.email
            });
            this.props.history.push('/hello/');
            return response;
        } catch (error) {
            console.log(error.stack);
            this.setState({
                errors:error.response.data
            });
        }
    }

    render() {
        
        return (
            <div className="site">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossOrigin="anonymous"></link>
                <nav className="navbar bg-warning">
                    <Link className={"navbar-brand text-dark"} to={"/"}>Pencilmark</Link>
                    {this.state.isLoggedIn
                    ? <div className="navbar nav">
                        <button className={"btn btn-dark text-warning"}onClick={this.handleLogout}>Logout</button>
                        <Link className={"btn btn-dark text-warning"} to={"/hello/"}>Hello</Link>
                    </div>
                    : <div className="navbar nav">
                        <Link className={"btn btn-dark text-warning"} to={"/login/"}>Login</Link>
                        <Link className={"btn btn-dark text-warning"} to={"/signup/"}>Signup</Link>
                    </div>}

                </nav>
          <main>
              <h1 className="text-justify">Welcome to Pencilmark!</h1>

              <Switch>
                  <Route exact path={"/login/"} render={() => (<Login handleLogin={this.handleLogin}/>)}/>
                  <Route exact path={"/signup/"} render={() => (<Signup handleSignup={this.handleSignup}/>)}/>
                  <Route exact path={"/hello/"} component={Hello}/>
                  <Route path={"/"} render={() => <div>Home again</div>}/>
              </Switch>
          </main>
      </div>
        );
    }
}

export default withRouter(App);