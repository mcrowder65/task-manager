import initialState from "../initial-state";
import {USER_SET_ID} from "../../actions/action-types";

const user = (state = initialState.user, action) => {
    switch (action.type) {
        case USER_SET_ID: {
            return {
                ...state, id: action.id
            };
        }
        default:
            return state;
    }
};

export default user;