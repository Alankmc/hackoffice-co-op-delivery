const chai = require("chai");
const { listUsers } = require("./index")

const assert = chai.assert;

describe("User service", () => {
    it("Should return user Joao", () => {
        assert.deepEqual([{ id: 1, name: "João" }], listUsers());
    });
});