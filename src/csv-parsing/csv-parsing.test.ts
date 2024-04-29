import {parseAddressCsv} from "./csv-parsing"
import {Address} from "../model/address"

describe("CSV Parsing Module", () => {
    describe("parseAddressCsv()", () => {
        it("parses the CSV file into address objects", () => {
            const csv =
                "Street,City,Zip Code\n"
                + "143 e Maine Street,Columbus,43215\n"
                + "1 Empora St,Title,11111"

            expect(parseAddressCsv(csv)).toEqual(<Address[]>[
                { street: "143 e Maine Street", city: "Columbus", zipCode: "43215"},
                { street: "1 Empora St", city: "Title", zipCode: "11111"},
            ])
        })

        describe("when values have leading and/or trailing whitespace", () => {
            it("removes the whitespace", () => {
                const csv =
                    "Street,City,Zip Code\n"
                    + " 143 e Maine Street , Columbus , 43215 "

                expect(parseAddressCsv(csv)).toEqual(<Address[]>[
                    { street: "143 e Maine Street", city: "Columbus", zipCode: "43215"},
                ])
            })
        })

        describe("when the csv contains a newline at the end of the file", () => {
            it("does not include an empty address", () => {
                const csv =
                    "Street,City,Zip Code\n"
                    + "143 e Maine Street,Columbus,43215\n"

                expect(parseAddressCsv(csv)).toEqual(<Address[]>[
                    { street: "143 e Maine Street", city: "Columbus", zipCode: "43215"},
                ])
            })
        })
    })
})