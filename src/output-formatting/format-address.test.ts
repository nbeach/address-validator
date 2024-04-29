import {formatAddressVerificationResult} from "./format-address"

describe("Address Format Module", () => {
    describe(formatAddressVerificationResult.name, () => {

        describe("when a matched address is", () => {
            describe("present", () => {
                it("displays both addresses", () => {
                    const formatted = formatAddressVerificationResult({
                        inputAddress: { street: "143 e Main St", city: "columbus", zipCode: "43215"},
                        verifiedAddress: { street: "143 E Main St", city: "Columbus", zipCode: "43215-1234"}
                    })
                    expect(formatted).toEqual("143 e Main St, columbus, 43215 -> 143 E Main St, Columbus, 43215-1234")
                })
            })
            describe("not present", () => {
                it("displays that the address is invalid", () => {
                    const formatted = formatAddressVerificationResult({
                        inputAddress: { street: "143 e Main St", city: "columbus", zipCode: "43215"},
                    })
                    expect(formatted).toEqual("143 e Main St, columbus, 43215 -> Invalid Address")
                })
            })
        })
    })
})