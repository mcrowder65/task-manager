import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Card, {CardHeader} from "material-ui/Card";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

import {setUsername, setUsernameError, setPassword,
  setPasswordError, validateLoginForm, clearLoginForm} from "../../actions/forms/login";
import {login} from "../../actions/user-actions";
import "../../styles/login";

const Login = props => {
    return (
        <div>
          <Card className="login-card">
          <CardHeader title="Login"/>
          <TextField
            error={props.usernameError !== ""}
            label={props.usernameError === "" ? "Username" : props.usernameError}
            value={props.username}
            onChange={props.setUsername}/>
            <TextField
              type="password"
              error={props.passwordError !== ""}
              label={props.passwordError === "" ? "Password" : props.passwordError}
              value={props.password}
              onChange={props.setPassword}/>
            <Button
              id="login"
              onClick={() => props.login(props.username, props.password)}>
              Click me
            </Button>
          </Card>
        </div>
    );
};

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    setUsername: PropTypes.func,
    setPassword: PropTypes.func,
    id: PropTypes.string,
    login: PropTypes.func
};

const mapStateToProps = state => {
    return {
        username: state.forms.login.username,
        usernameError: state.forms.login.usernameError,
        password: state.forms.login.password,
        passwordError: state.forms.login.passwordError,
        id: state.user.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUsername: evt => {
          dispatch(setUsername(evt.target.value));
          dispatch(setUsernameError(""));
        },
        setPassword: evt => {
          dispatch(setPassword(evt.target.value));
          dispatch(setPasswordError(""));
        },
        login: async (username, password) => {
          const success = dispatch(validateLoginForm(username, password));
          const loginSuccess = success && await dispatch(login(username, password));
          if (loginSuccess) {
             dispatch(clearLoginForm());
          }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
