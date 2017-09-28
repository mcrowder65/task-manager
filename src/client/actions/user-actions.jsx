import {USER_SET_ID} from "./action-types";

export const userSetId = id => {
    if (!id || id.length === 0 || typeof id !== "string") {
        throw Error("id must be non empty string");
    }
    return {
        type: USER_SET_ID,
        id
    };
};