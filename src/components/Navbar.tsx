import { useState } from "react"
import { Play, Loader2, FileText, Share, Check } from "lucide-react"
import { useRuntimes } from "@/hooks/useRuntimes"
import { TooltipProvider } from "./ui/tooltip"
import { useEditorValue } from "@/providers/EditorValueProvider"
import pistonApi from "@/lib/axios"
import { pistonApiExecuteReq, pistonApiExecuteRes } from "@/lib/types"
import NavbarCommand from "./NavbarCommand"
import ExecutionDialog from "./ExecutionDialog"
import { compressToEncodedURIComponent as compress } from "lz-string"
import { useToast } from "./ui/use-toast"

const Navbar = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const { editorValue } = useEditorValue()
    const [exResult, setExResult] = useState<pistonApiExecuteRes | null>(null)
    const [showDialog, setShowDialog] = useState(false)
    const runtimes = useRuntimes(["typescript"])
    const { toast } = useToast()

    const handlePlay = async () => {
        if (!editorValue) {
            toast({
                title: "Error",
                description: "There's no code to execute.",
                duration: 3000
            })
            return
        }
        
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
                        : "Run"
                    }
                />
                <NavbarCommand
                    onClick={() => {
                        setShowDialog(true)
                    }}
                    buttonContent={<FileText className="w-4 h-4" />}
                    tooltipContent="Show last"
                    disabled={!exResult}
                />
                <NavbarCommand
                    onClick={() => {
                        const { origin } = new URL(window.location.href)
                        navigator.clipboard.writeText(`${origin}/?code=${compress(editorValue)}`)
                        setIsCopied(true)
                        setTimeout(() => setIsCopied(false), 3000)
                        toast({
                            title: "Link has been coopied!",
                            description: "Anyone with the link can see the code.",
                            duration: 3000
                        })
                    }}
                    buttonContent={isCopied 
                        ? <Check className="w-4 h-4 "/> 
                        : <Share className="w-4 h-4" />
                    }
                    tooltipContent={isCopied
                        ? "Shared"
                        : "Share"
                    }
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