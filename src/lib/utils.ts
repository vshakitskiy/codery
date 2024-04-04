import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { pistonApiRuntimes, runtimes } from "./types"

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const transformRuntimes = (pistonApiRuntimes: pistonApiRuntimes, runtimeNames: string[]) => {
    const runtimes: runtimes = pistonApiRuntimes
        .filter(({ language }) => runtimeNames.includes(language))
        .map(({ language, version }) => ({
            language,
            v: version
        }))

    const filteredRuntimes: runtimes = []

    runtimes.forEach(({ language }) => {
        if (filteredRuntimes.find(({ language: lang }) => language === lang))
            return

        const languageRuntimes = runtimes.filter(({ language: lang }) => language === lang)
        const bestRuntime = languageRuntimes.reduce((prev, curr) => 
            prev.v === curr.v || prev.v > curr.v ? prev : curr
        , languageRuntimes[0])

        filteredRuntimes.push(bestRuntime)
    })

    return filteredRuntimes
}