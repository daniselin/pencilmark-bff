import { ConnectedRouter } from "connected-react-router";
import { Switch } from "react-router";
import {history} from "./store";
import { Redirect, Route, Switch } from "react-router";
import Login from "../components/Nav/Login";
import Signup from "../components/Nav/Signup";

export default (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/login/" component={Login}/>
            <Route exact path="/signup/" component={Signup}/>
            <Route component={NotFound}/>

        </Switch>
    </ConnectedRouter>
)