import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Card from "material-ui/Card";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

import {setUsername, setUsernameError, setPassword, setPasswordError} from "../../actions/forms/login";
import {login} from "../../actions/user-actions";
import "../../styles/login.css";

const Login = props => {
    return (
        <div>
            <Grid container justify="center" align="center">
                <Grid item>
                    <Card className="login-card">
                    <TextField
                      error={props.usernameError !== ""}
                      label={props.usernameError === "" ? "Username" : props.usernameError}
                      value={props.username}
                      onChange={props.setUsername}/>
                      <TextField
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
                </Grid>
            </Grid>
        </div>
    );
};

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    setUsername: PropTypes.func,
    setPassword: PropTypes.func,
    login: PropTypes.func
};

const mapStateToProps = state => {
    return {
        username: state.forms.login.username,
        usernameError: state.forms.login.usernameError,
        password: state.forms.login.password,
        passwordError: state.forms.login.passwordError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUsername: evt => {
          dispatch(setUsername(evt.target.value));
          return dispatch(setUsernameError(""));
        },
        setPassword: evt => {
          dispatch(setPassword(evt.target.value));
          return dispatch(setPasswordError(""));
        },
        login: (username, password) => {
            return dispatch(login(username, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
