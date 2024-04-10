import { useCallback, useEffect, useState } from "react"
import pistonApi from "@/lib/axios"
import { PistonApiRuntimes, Runtimes } from "@/lib/types"
import { transformRuntimes } from "@/lib/utils"

export const useRuntimes = (runtimeNames: string[]) => {
    const [runtimes, setRuntimes] = useState<Runtimes | null>(null)

    const updateRuntimes = useCallback(async () => {
        const { data } = await pistonApi.get<PistonApiRuntimes>("/runtimes")
        setRuntimes(transformRuntimes(data, runtimeNames))
    }, [])

    useEffect(() => {
        try {
            updateRuntimes()
        }
        catch (error) {
            console.log("Something went wrong when trying to fetch runtimes.\n", error)
        }
    }, [updateRuntimes])

    return runtimes
}