export type runtimes = {
    language: string,
    v: string
}[]

export type pistonApiRuntimes = {
    language: string,
    version: string,
    aliases: string[],
    runtime?: string
}[]

export type pistonApiExecuteRes = {
    language: string
    version: string
    run: {
        stdout: string
        stderr: string
        code: number
        output: string
    },
    compile?: {
        stdout: string
        stderr: string
        code: number
        output: string
    }
}

export type pistonApiExecuteReq = {
    language: string,
    version: string,
    files: {
        name?: string
        content: string
    }[]
}