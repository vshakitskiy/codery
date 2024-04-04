import { useCallback, useEffect, useState } from "react"
import instance from "@/lib/axios"
import { pistonApiRuntimes, runtimes } from "@/lib/types"
import { transformRuntimes } from "@/lib/utils"

export const useRuntimes = (runtimeNames: string[]) => {
    const [runtimes, setRuntimes] = useState<runtimes | null>(null)

    const updateRuntimes = useCallback(async () => {
        const { data } = await instance.get<pistonApiRuntimes>("/runtimes")
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