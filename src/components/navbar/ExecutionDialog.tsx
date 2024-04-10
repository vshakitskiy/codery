import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { PistonApiExecuteRes } from "@/lib/types"

type ExecutionDialogProps = {
    open: boolean
    setOpen: (open: boolean) => void
    exResult: PistonApiExecuteRes | null
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
                        className={cn("resize-none mt-2 h-32", exResult.run.code === 0 ? "" : "text-secondary-foreground")}
                        id="output"    
                    />
                        
                    {exResult.compile?.output ? (<div className="mt-6">
                        <Label htmlFor="compile">Compiler</Label>
                        <Textarea
                            value={exResult.compile.output}
                            readOnly
                            className="resize-none text-destructive mt-2 h-32"
                            id="compile"
                        />
                    </div>) : null}
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