import { useState, useEffect } from "react"

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const updateIsMobile = () => {
            setIsMobile(window.innerWidth < 800)
        }
    
        updateIsMobile()
        window.addEventListener("resize", updateIsMobile)
    
        return () => {
            window.removeEventListener("resize", updateIsMobile)
        }
    }, [])

    return isMobile
}