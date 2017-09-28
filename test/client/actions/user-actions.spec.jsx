import {userSetId} from "../../../src/client/actions/user-actions";

describe("src/client/user-actions.jsx", () => {
    describe("userSetId()", () => {
        it("empty string should throw", () => {
            expect(() => userSetId("")).to.throw();
        });
        it("null should throw", () => {
            expect(() => userSetId(null)).to.throw();
        });
        it("undefined should throw", () => {
            expect(() => userSetId(undefined)).to.throw();
        });
        let num = 1234;
        let val = num;
        it(`${val} should throw`, () => {
            expect(() => userSetId(num)).to.throw();
        });
        val = num = 0;
        it(`${val} should throw`, () => {
            expect(() => userSetId(num)).to.throw();
        });
        val = num = 1;
        it(`${val} should throw`, () => {
            expect(() => userSetId(num)).to.throw();
        });
        val = num = -1;
        it(`${val} should throw`, () => {
            expect(() => userSetId(num)).to.throw();
        });
        it(`${val = "matt"} should not throw`, () => {
            expect(() => userSetId(val)).to.not.throw();
        });
    });
});