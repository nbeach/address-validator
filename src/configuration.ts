import {environmentVariable} from "./utility/environment"

export const configuration = {
    smarty: {
        authId: environmentVariable('SMARTY_AUTH_ID'),
        authToken: environmentVariable('SMARTY_AUTH_TOKEN')
    }
}