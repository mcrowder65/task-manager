import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Card, {CardHeader} from "material-ui/Card";
import {Button, TextField, Grid} from "material-ui";

import Center from "../utils/center";
import {
    setUsername, setUsernameError, setPassword,
    setPasswordError, validateLoginForm, clearLoginForm
} from "../../actions/forms/login";
import {login} from "../../actions/user-actions";
import "../../styles/login";

const Login = props => {
    return (
        <div>
            <Center>
                <Card className="login-card">
                    <Grid container justify="center" direction="column" align="center">
                        <Grid item>
                            <CardHeader title="Login"/>
                        </Grid>
                        <Grid item>
                            <TextField
                                error={props.usernameError !== ""}
                                label={props.usernameError === ""
                                    ? "Username" : props.usernameError}
                                value={props.username}
                                onChange={props.setUsername}/>
                        </Grid>
                        <Grid item>
                            <TextField
                                type="password"
                                error={props.passwordError !== ""}
                                label={props.passwordError === ""
                                    ? "Password" : props.passwordError}
                                value={props.password}
                                onChange={props.setPassword}/>
                        </Grid>
                        <Grid item>
                            <Button
                                id="login"
                                color="accent"
                                raised
                                onClick={() => props.login(props.username, props.password)}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Center>
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
