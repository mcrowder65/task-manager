import uuidv4 from "uuid/v4";

import {MESSAGES_ACTIONS_ADD_MESSAGE, MESSAGES_ACTIONS_REMOVE_MESSAGE} from "./action-types";

export const addMessage = message => {
    return {
        type: MESSAGES_ACTIONS_ADD_MESSAGE,
        message,
        id: uuidv4()
    };
};

export const removeMessage = id => {
    return {
        type: MESSAGES_ACTIONS_REMOVE_MESSAGE,
        id
    };
};