import {Address, AddressVerificationResult} from "../model/address"

export const formatAddressVerificationResult = ({inputAddress, verifiedAddress}: AddressVerificationResult): string => {
    return  verifiedAddress === undefined ?
        `${formatAddress(inputAddress)} -> Invalid Address`
        : `${formatAddress(inputAddress)} -> ${formatAddress(verifiedAddress)}`
}

const formatAddress = ({street, city, zipCode}: Address): string => `${street}, ${city}, ${zipCode}`
