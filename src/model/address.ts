export type Address = {
    street: string
    city: string
    zipCode: string
}

export type AddressVerificationResult = {
    inputAddress: Address
    verifiedAddress?: Address
}