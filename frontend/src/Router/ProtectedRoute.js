import React, { Component} from "react";
import axiosInstance from "../axiosApi";

class ProtectedRoute extends Component{
    constructor() {
        super();
    } 

    isAuthenticated(token){
        axiosInstance.get('verify_token/', {
            token: token,
        })
    }

    render()
    {return (
        <Route render={() => {
          return isAuthenticated(localStorage.getItem('access_token')) === true
            ? children
            : <Redirect to='/login' />
        }} />
      )
    }
};


export default ProtectedRoute;