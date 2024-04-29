import {environmentVariable} from "./environment"

describe("Environment Module", () => {
    describe("environmentVariable()", () => {
        describe("when the environment variable has", () => {
            describe("been set", () => {
                beforeEach(() => {
                    process.env["TEST_VAR"] = 'hello world!'
                })
                it("retrieves the value", () => {
                    expect(environmentVariable('TEST_VAR')).toEqual('hello world!')
                })
            })
            describe("not been set", () => {
                it("raises an error", () => {
                    expect(() => environmentVariable('NON_EXISTENT')).toThrow(`Environment variable NON_EXISTENT is not set`)
                })
            })
        })
    })
})