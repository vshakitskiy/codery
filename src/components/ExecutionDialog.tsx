import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { pistonApiExecuteRes } from "@/lib/types"

type ExecutionDialogProps = {
    open: boolean
    setOpen: (open: boolean) => void
    exResult: pistonApiExecuteRes | null
}

const ExecutionDialog = ({ open, setOpen, exResult }: ExecutionDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Execution result
                    </DialogTitle>
                </DialogHeader>
                <div>{exResult ? (<>
                    <Label htmlFor="output">Output</Label>
                    <Textarea 
                        value={exResult.run.code === 0 ? exResult.run.output : `Program exited with code ${exResult.run.code}.`} 
                        readOnly 
                        className={cn("resize-none mt-2", exResult.run.code === 0 ? "" : "text-secondary-foreground")}
                        id="output"    
                    />
                        
                    {exResult.compile?.output ? (<>
                        <Label htmlFor="compile">Compiler</Label>
                        <Textarea
                            value={exResult.compile.output}
                            readOnly
                            className="resize-none text-destructive mt-2"
                            id="compile"
                        />
                    </>) : null}
                </>) : null}</div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                                Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ExecutionDialog