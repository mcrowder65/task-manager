import initialState from "../initial-state";
import {MESSAGES_ACTIONS_ADD_MESSAGE, MESSAGES_ACTIONS_REMOVE_MESSAGE} from "../../actions/action-types";

const messages = (state = initialState.messages, action) => {
    switch (action.type) {
        case MESSAGES_ACTIONS_REMOVE_MESSAGE: {
            return state.filter(m => m.id !== action.id);
        }
        case MESSAGES_ACTIONS_ADD_MESSAGE: {
            return [...state, {...action, type: undefined}];
        }
        default:
            return state;
    }
};

export default messages;