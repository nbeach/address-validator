import {verifyAddress} from "./address-verification"
import {AddressVerificationResult} from "../model/address"

describe("Address Verification Module", () => {
    describe(verifyAddress.name, () => {
        describe("when a matching address", () => {
            describe("can be found", () => {
                it("returns the match for the verified address", async () => {
                    const verificationResult = await verifyAddress({
                        street: "143 e Maine Street",
                        city: "Columbus",
                        zipCode: "43215"
                    })

                    expect(verificationResult).toEqual(<AddressVerificationResult>{
                        inputAddress: {street: "143 e Maine Street", city: "Columbus", zipCode: "43215"},
                        verifiedAddress: {street: "143 E Main St", city: "Columbus", zipCode: "43215-5370"}
                    })
                })
            })
            describe("cannot be found", () => {
                it("returns undefined for the verified address", async () => {
                    const verificationResult = await verifyAddress( {
                        street: "1 Empora St",
                        city: "Title",
                        zipCode: "11111"
                    })

                    expect(verificationResult).toEqual(<AddressVerificationResult>{
                        inputAddress: { street: "1 Empora St", city: "Title", zipCode: "11111"},
                        verifiedAddress: undefined
                    })
                })
            })
        })
    })
})