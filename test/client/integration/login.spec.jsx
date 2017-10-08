/*eslint no-unused-expressions: "off"*/
import React from "react";
import {mount} from "enzyme";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "../../../src/client/reducers";
import initialState from "../../../src/client/reducers/initial-state";
import Login from "../../../src/client/components/login";

describe("login integration tests", () => {
    let container;
    let store;
    const getLogin = () => (container.find("Login").props());

    beforeEach(() => {
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
        container = mount(
            <Provider store={store}>
                <Login/>
            </Provider>);
    });
    it("Container should be truthy", () => {
        expect(!!container).to.be.true;
    });

    it("setUsername", () => {
        const value = "asdf";
        getLogin().setUsername({target: {value}});
        expect(getLogin().username).eql(value);
        expect(getLogin().usernameError).eql("");
    });

    it("setPassword", () => {
        const value = "asdf";
        getLogin().setPassword({target: {value}});
        expect(getLogin().password).eql(value);
        expect(getLogin().passwordError).eql("");
    });

    describe("try to login with bad forms", () => {
        it("no username or password", () => {
            getLogin().login();
            expect(getLogin().usernameError).eql("Username is required");
            expect(getLogin().passwordError).eql("Password is required");
        });

        it("username but no password", () => {
            const username = "asdf";
            const password = "";
            getLogin().login(username, password);
            expect(getLogin().usernameError).eql("");
            expect(getLogin().passwordError).eql("Password is required");
        });

        it("no username but there is a password", () => {
            const username = "";
            const password = "asdf";
            getLogin().login(username, password);
            expect(getLogin().usernameError).eql("Username is required");
            expect(getLogin().passwordError).eql("");
        });
    });

    it("login with good forms but incorrect username/password combo", async () => {
        const username = "one";
        const password = "two";
        await getLogin().login(username, password);
        expect(store.getState().messages[0].message).eql("Failed to login");
    });

    it("login with good forms and correct username/password combo", async () => {
        const username = "test";
        const password = "user";
        await getLogin().login(username, password);
        expect(store.getState().user.id).not.eql("");
    });
});
