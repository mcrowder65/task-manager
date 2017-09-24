import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Card from "material-ui/Card";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";

import {asyncCall} from "../../actions/index";
import ViewUsername from "../view-username";
import "../../styles/login.css";

const Login = props => {
    return (
        <div>
            <Grid container justify="center" align="center">
                <Grid item>
                    <Card className="login-card">
                        <ViewUsername username={props.username}/>
                        <Button id="login" onClick={props.asyncCall}>Click me</Button>
                    </Card>
                </Grid>
            </Grid>
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