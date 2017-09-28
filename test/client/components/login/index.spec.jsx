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
    let login;
    beforeEach(() => {
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
        container = mount(
            <Provider store={store}>
                <Login/>
            </Provider>);
        login = container.find("Login");
    });

    describe("click some buttons", () => {
        afterEach(() => {
            fetchMock.restore();
        });
        it("clicking login should display matt", async () => {
            const button = login.find("#login");
            const body = "matt";
            fetchMock.post("http://localhost:3000/login",
                {body, headers: {"content-type": "text/html"}, status: 200});
            await button.simulate("click");
            const oneSecond = 1000;
            setTimeout(() => {
                //TODO is there a better way to do this?
                expect(login.prop("username")).eql("matt");
            }, oneSecond);
        });
    });
});