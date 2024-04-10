import { useState } from "react"
import { Play, Loader2, FileText, Share, Check } from "lucide-react"
import { TooltipProvider } from "../ui/tooltip"
import { useEditorOptions } from "@/providers/EditorProvider"
import pistonApi from "@/lib/axios"
import { PistonApiExecuteReq, PistonApiExecuteRes } from "@/lib/types"
import NavbarCommand from "./NavbarCommand"
import ExecutionDialog from "./ExecutionDialog"
import { compressToEncodedURIComponent as compress } from "lz-string"
import { useToast } from "../ui/use-toast"
import LanguageSelection from "./LanguageSelection"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/useIsMobile"

const Navbar = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const { editorValue, runtimes, selectedLanguage } = useEditorOptions()
    const [exResult, setExResult] = useState<PistonApiExecuteRes | null>(null)
    const [showDialog, setShowDialog] = useState(false)
    const { toast } = useToast()
    const isMobile = useIsMobile()

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

        const runtime = runtimes.find(({ language }) => language === selectedLanguage)
        if (!runtime) return

        setIsPlaying(true)

        const req: PistonApiExecuteReq = {
            language: runtime.language,
            version: runtime.v,
            files: [{
                name: "codery",
                content: editorValue
            }]
        }

        const { data } = await pistonApi.post<PistonApiExecuteRes>("/execute", req)
        setExResult(data)

        setIsPlaying(false)
        setShowDialog(true)
    }

    return (
        <TooltipProvider delayDuration={500}>
            <div className={cn("fixed z-20 right-0 py-2 bg-background flex items-center gap-1", isMobile ? "bottom-0 rounded-tl-lg flex-col px-2" : "top-0 rounded-bl-lg px-8")}>
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
                <LanguageSelection />
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
                        navigator.clipboard.writeText(`${origin}/?lang=${selectedLanguage}&code=${compress(editorValue)}`)
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