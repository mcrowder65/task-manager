import React from "react";
import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import {mount} from "enzyme";
import {Provider} from "react-redux";

import fetchMock from "fetch-mock";
import rootReducer from "../../../../src/client/reducers/";
import initialState from "../../../../src/client/reducers/initial-state";
import Login from "../../../../src/client/components/login";

describe("src/client/components/login/index.spec.jsx", () => {
    let container;
    let store;
    beforeEach(() => {
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
        container = mount(
            <Provider store={store}>
                <Login/>
            </Provider>);
    });

    afterEach(() => {
        fetchMock.restore();
    });
    it("renders", () => {
        expect(container, "failed to render").to.be.truthy;
    });

    describe("click some buttons", () => {
        beforeEach(() => {
            fetchMock.restore();
        });
        it("clicking login should display matt", () => {
            // fetchMock.post(url,
            //     {headers: {"content-type": "application/json"}, status: 400});
        });
    });
});