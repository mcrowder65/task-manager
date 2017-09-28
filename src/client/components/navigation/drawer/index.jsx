import React from "react";
import MuiDrawer from "material-ui/Drawer";
import List from "material-ui/List";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {setIsDrawerOpen} from "../../../actions/index";
import LoggedOut from "./logged-out";
import LoggedIn from "./logged-in";

const Drawer = props => {
    return (
        <div>
            <MuiDrawer
                open={props.isDrawerOpen}
                onRequestClose={() => props.setIsDrawerOpen(false)}>
                <List>
                    {props.isLoggedIn ? <LoggedIn/> :
                        <LoggedOut _setIsDrawerOpen={props.setIsDrawerOpen}/>}
                </List>
            </MuiDrawer>
        </div>
    );
};

Drawer.propTypes = {
    isDrawerOpen: PropTypes.bool.isRequired,
    setIsDrawerOpen: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool
};
const mapStateToProps = state => {
    return {
        isDrawerOpen: state.isDrawerOpen,
        isLoggedIn: state.user.id.length > 0
    };
};

const mapDispatchToProps = dispatch => ({
    setIsDrawerOpen: isDrawerOpen => dispatch(setIsDrawerOpen(isDrawerOpen))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);