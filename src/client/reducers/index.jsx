import {combineReducers} from "redux";

import user from "./user";
import forms from "./forms";
import initialState from "./initial-state";
import {SET_IS_DRAWER_OPEN} from "../actions/action-types";
const isDrawerOpen = (state = initialState.isDrawerOpen, action) => {
    if (action.type === SET_IS_DRAWER_OPEN) {
        return action.isDrawerOpen;
    }
    return state;
};
export default combineReducers({
    forms,
    isDrawerOpen,
    user
});
