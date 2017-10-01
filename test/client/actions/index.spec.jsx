import "isomorphic-fetch";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";

import rootReducer from "../../../src/client/reducers/";
import initialState from "../../../src/client/reducers/initial-state";
import {setUsername, setIsDrawerOpen, asyncCall} from "../../../src/client/actions/index";
import {SET_IS_DRAWER_OPEN, SET_USERNAME} from "../../../src/client/actions/action-types";

describe("src/client/actions/index.jsx", () => {
    describe("function setIsDrawerOpen()", () => {
        const obj = {
            type: SET_IS_DRAWER_OPEN
        };
        const isDrawerOpen = false;
        it(`null should return isDrawerOpen=${isDrawerOpen}`, () => {
            expect(setIsDrawerOpen(null)).eql({...obj, isDrawerOpen});
        });
        it(`undefined should return isDrawerOpen=${isDrawerOpen}`, () => {
            expect(setIsDrawerOpen(undefined)).eql({...obj, isDrawerOpen});
        });

    });
});
