import React, { Component} from "react";
import ProtectedRoute from "./ProtectedRoute";

class AppRouter extends Component{
    constructor() {
        super();
    } 

    render()
    {return (
        <Switch>
            <Route exact path={"/login/"} component={Login}/>
            <Route exact path={"/signup/"} component={Signup}/>
            <ProtectedRoute exact path={"/hello/"} component={Hello}/>
            <Route path={"/"} render={() => <div>Home again</div>}/>
        </Switch>
    )
    }
}

export default AppRouter;