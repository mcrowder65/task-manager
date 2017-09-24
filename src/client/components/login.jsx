import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {asyncCall} from "../actions/index";
import ViewUsername from "./view-username";

const Login = props => {
    return (
        <div>
            <ViewUsername username={props.username}/>
            <button onClick={props.asyncCall}>Click me</button>
        </div>
    );
};

Login.propTypes = {
    asyncCall: PropTypes.func,
    username: PropTypes.string
};

const mapStateToProps = state => {
    return {
        username: state.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        asyncCall: () => {
            return dispatch(asyncCall());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);