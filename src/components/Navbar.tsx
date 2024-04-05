import { useState } from "react"
import { Button } from "./ui/button"
import { Play, Loader2 } from "lucide-react"

const sleep = (m: number) => new Promise(r => setTimeout(r, m))

const Navbar = () => {
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlay = async () => {
        setIsPlaying(true)
        // todo: implement running code
        await sleep(2000)
        setIsPlaying(false)
    }

    return (
        <div className="fixed z-20 rounded-bl-lg py-2 px-4 right-0 bg-background">
            <Button variant="outline" className="h-9 w-9" size="icon" onClick={handlePlay}>
                {isPlaying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            </Button>
        </div>
    )
}

export default Navbar