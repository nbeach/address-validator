import { execSync } from "child_process"

describe("Address Validator", () => {
    describe("when passed a csv file path", () => {
        it("verifies the addresses", () => {
            const actualOutput = execSync('ts-node src/index.ts src/end-to-end-test-input.csv').toString()

            const expectedOutput =
                "143 e Maine Street, Columbus, 43215 -> 143 E Main St, Columbus, 43215-5370\n"
                + "1 Empora St, Title, 11111 -> Invalid Address\n"

            expect(actualOutput).toEqual(expectedOutput)
        })
    })
})