import { languages } from "./constants"

// Languages Types
export type Languages = typeof languages
export type LanguagesTuple = typeof languages[number]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isLanguage = (str: any): str is LanguagesTuple => languages.includes(str)

// Runimes Types
export type Runtimes = {
    language: LanguagesTuple,
    v: string
}[]

export type PistonApiRuntimes = {
    language: LanguagesTuple,
    version: string,
    aliases: string[],
    runtime?: string
}[]

// Execute Types
export type PistonApiExecuteReq = {
    language: LanguagesTuple,
    version: string,
    files: {
        name?: string
        content: string
    }[]
}

type ExecuteRes = {
    stdout: string
    stderr: string
    code: number
    output: string
}

export type PistonApiExecuteRes = {
    language: LanguagesTuple
    version: string
    run: ExecuteRes,
    compile?: ExecuteRes
}