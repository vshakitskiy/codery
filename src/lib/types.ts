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