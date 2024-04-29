import {parseAddressCsv} from "./csv-parsing/csv-parsing"
import {verifyAddress} from "./address-verification/address-verification"
import {formatAddressVerificationResult} from "./output-formatting/format-address"
import {readFileSync} from "fs"

(async () => {
    const file = process.argv[2]
    const csv = readFileSync(file).toString()
    const addressVerificationRequests = parseAddressCsv(csv).map(verifyAddress)
    const addressVerificationsResults = await Promise.all(addressVerificationRequests)
    addressVerificationsResults.map(formatAddressVerificationResult).forEach(output => process.stdout.write(output + '\n') )
})().then()
