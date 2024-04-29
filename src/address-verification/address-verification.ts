import {Address, AddressVerificationResult} from "../model/address"
import {usStreet} from "smartystreets-javascript-sdk"
import {send} from "./smarty-client"
import Lookup = usStreet.Lookup

export const verifyAddress = async (address: Address): Promise<AddressVerificationResult> => ({
    inputAddress: address,
    verifiedAddress: await matchAddress(address)
})

const matchAddress = async (address: Address): Promise<Address | undefined> => {
    const lookup = createLookupForAddress(address)
    const result = await send(lookup)
    const firstMatchCandidate = result.lookups[0]?.result[0]

    return firstMatchCandidate === undefined ? undefined : <Address>{
        street: firstMatchCandidate.deliveryLine1,
        city: firstMatchCandidate.components.cityName,
        zipCode: `${firstMatchCandidate.components.zipCode}-${firstMatchCandidate.components.plus4Code}`
    }
}

const createLookupForAddress = (address: Address): Lookup => {
    const lookup = new usStreet.Lookup()
    lookup.maxCandidates = 1
    lookup.match = "strict"
    lookup.street = address.street
    lookup.city = address.city
    lookup.zipCode = address.zipCode
    return lookup
}