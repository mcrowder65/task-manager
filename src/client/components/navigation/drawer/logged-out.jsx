import React, {Component} from "react";
import {ListItem, ListItemText} from "material-ui/List";
import {withRouter} from "react-router";
import PropTypes from "prop-types";

class LoggedOut extends Component {
    constructor() {
        super();
        this.loggedInClicked = this.loggedInClicked.bind(this);
    }

    loggedInClicked() {
        this.props._setIsDrawerOpen(false);
        this.props.history.push("/login");
    }

    render() {
        return (
            <div>

                <ListItem button onClick={this.loggedInClicked}>
                    <ListItemText primary="Login"/>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Signup"/>
                </ListItem>
            </div>
        );
    }
};

LoggedOut.propTypes = {
    _setIsDrawerOpen: PropTypes.func
};
export default withRouter(LoggedOut);