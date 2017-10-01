import { setIsDrawerOpen} from "../../../src/client/actions/index";
import {SET_IS_DRAWER_OPEN} from "../../../src/client/actions/action-types";

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
