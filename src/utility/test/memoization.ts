import {createHash} from "crypto"
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs"
import { join } from "path"

type PromiseFunction<T extends unknown[], R> =  (...args: T) => Promise<R>

const md5 = (value: string): string => createHash('md5').update(value).digest("hex")

export const withLocalFilesystemMemoization = <T extends unknown[], R>(func: PromiseFunction<T, R>) => {
    return async (...args: T) => {
        const cachedOutputFolder = join(process.cwd(), 'test_cache')
        if(!existsSync(cachedOutputFolder)) mkdirSync(cachedOutputFolder)

        const hashedArguments = md5(JSON.stringify(args))
        const cachedOutputFile = join(cachedOutputFolder, `${hashedArguments}.json`)

        if(existsSync(cachedOutputFile)) {
            return JSON.parse(readFileSync(cachedOutputFile).toString())
        } else {
            const output = await func(...args)
            writeFileSync(cachedOutputFile, JSON.stringify(output, undefined, 3))
            return output
        }
    }
}

