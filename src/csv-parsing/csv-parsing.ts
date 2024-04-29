import {Address} from "../model/address"
import {parse} from "papaparse"

export const parseAddressCsv = (csv: string): Address[] => {
    const [_header, ...rest] = parse(csv.trim(), { transform: (value) => value.trim() }).data as string[][]
    return rest.map(([street, city, zipCode]: string[]) => ({street, city, zipCode}))
}