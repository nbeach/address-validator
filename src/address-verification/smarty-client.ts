import {core, usStreet} from "smartystreets-javascript-sdk"
import {configuration} from "../configuration"
import {withLocalFilesystemMemoization} from "../utility/test/memoization"
import Batch = core.Batch
import Lookup = usStreet.Lookup

const credentials = new core.StaticCredentials(configuration.smarty.authId, configuration.smarty.authToken)
const client = new core.ClientBuilder(credentials).buildUsStreetApiClient()

const baseSend = (lookup: usStreet.Lookup): Promise<Batch<Lookup>> => {
    return client.send(lookup)
}

const localFilesystemMemoizedSend = withLocalFilesystemMemoization(baseSend)

export const send: (lookup: usStreet.Lookup) => Promise<Batch<Lookup>> =
    process.env['USE_LOCAL_SMARTY_CACHE'] === 'true' ? localFilesystemMemoizedSend : baseSend
