import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Card from "material-ui/Card";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

import {login} from "../../actions/user-actions";
import ViewUsername from "../view-username";
import "../../styles/login.css";

const Login = props => {
    return (
        <div>
            <Grid container justify="center" align="center">
                <Grid item>
                    <Card className="login-card">
                        <ViewUsername username={props.username}/>
                        <Button id="login" onClick={props.login}>Click me</Button>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func,
    username: PropTypes.string
};

const mapStateToProps = state => {
    return {
        username: state.user.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: () => {
            return dispatch(login());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
