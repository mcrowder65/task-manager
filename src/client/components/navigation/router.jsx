import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, browserHistory} from "react-router-dom";
import {Route} from "react-router";
import { CircularProgress } from "material-ui/Progress";
import PropTypes from "prop-types";

import Login from "../login/";
import Home from "../home";
import Drawer from "./drawer";

const Router = props => (
    <BrowserRouter history={browserHistory}>
        <div>
          {props.isFetching ?
            <CircularProgress/> :
            <div>
              <Drawer {...props}/>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
            </div>
          }
        </div>
    </BrowserRouter>

);

Router.propTypes = {
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isFetching: state.fetchCount > 0
  };
};

export default connect(mapStateToProps)(Router);
