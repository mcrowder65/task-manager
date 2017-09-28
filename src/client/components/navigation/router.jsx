import React from "react";
import {
    BrowserRouter,
    browserHistory
} from "react-router-dom";
import {
    Route
} from "react-router";

import Login from "../login/";
import Home from "../home";
import Drawer from "./drawer";

const Router = props => (
    <BrowserRouter history={browserHistory}>
        <div>
            <Drawer {...props}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
        </div>
    </BrowserRouter>

);


export default Router;
