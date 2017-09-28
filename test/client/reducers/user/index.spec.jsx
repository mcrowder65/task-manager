import userReducer from "../../../../src/client/reducers/user/index";
import {USER_SET_ID} from "../../../../src/client/actions/action-types";
import initialState from "../../../../src/client/reducers/initial-state";

describe("src/client/reducers/user/index.jsx", () => {
    describe("user()", () => {
        let newId;
        it(`${USER_SET_ID} should return a user with id: ${newId = "asdf1234"}`, () => {
            const newUser = userReducer(undefined, {type: USER_SET_ID, id: newId});
            expect(newUser).eql({id: newId});
        });
        it(`${USER_SET_ID} should return a user with id: ${newId = "431asdf"}`, () => {
            const newUser = userReducer(undefined, {type: USER_SET_ID, id: newId});
            expect(newUser).eql({id: newId});
        });
        it(`no action type should return initialState`, () => {
            const newUser = userReducer(undefined, {});
            expect(newUser).eql(initialState.user);
        });
    });
});