import { useState } from "react"
import { Play, Loader2, FileText } from "lucide-react"
import { useRuntimes } from "@/hooks/useRuntimes"
import { TooltipProvider } from "./ui/tooltip"
import { useEditorValue } from "@/providers/EditorValueProvider"
import pistonApi from "@/lib/axios"
import { pistonApiExecuteReq, pistonApiExecuteRes } from "@/lib/types"
import NavbarCommand from "./NavbarCommand"
import ExecutionDialog from "./ExecutionDialog"

const Navbar = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const { editorValue } = useEditorValue()
    const [exResult, setExResult] = useState<pistonApiExecuteRes | null>(null)
    const [showDialog, setShowDialog] = useState(false)
    const runtimes = useRuntimes(["typescript"])

    const handlePlay = async () => {
        // todo: toast notify
        if (!editorValue) return
        
        if (!runtimes) return
        setIsPlaying(true)

        const req: pistonApiExecuteReq = {
            language: runtimes[0].language,
            version: runtimes[0].v,
            files: [{
                name: "codery",
                content: editorValue
            }]
        }

        const { data } = await pistonApi.post<pistonApiExecuteRes>("/execute", req)
        console.log(data)
        setExResult(data)

        setIsPlaying(false)
        setShowDialog(true)
    }

    return (
        <TooltipProvider delayDuration={500}>
            <div className="fixed z-20 rounded-bl-lg py-2 px-8 right-0 bg-background flex items-center gap-1">
                <NavbarCommand
                    onClick={handlePlay}
                    buttonContent={isPlaying 
                        ? <Loader2 className="w-4 h-4 animate-spin" /> 
                        : <Play className="w-4 h-4" />
                    }
                    tooltipContent={isPlaying
                        ? "Running..."
                        : "Run code"
                    }
                />
                <NavbarCommand
                    onClick={() => {
                        // todo: toast notify
                        if (!exResult) return

                        setShowDialog(true)
                    }}
                    buttonContent={<FileText className="w-4 h-4" />}
                    tooltipContent="Show last"
                />
            </div>

            <ExecutionDialog
                open={showDialog}
                setOpen={setShowDialog}
                exResult={exResult}
            />
        </TooltipProvider>
    )
}

export default Navbar