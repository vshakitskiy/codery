import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

type NavbarCommandProps = {
    onClick: () => void
    buttonContent: JSX.Element
    tooltipContent: string
}

const NavbarCommand = ({ onClick , buttonContent, tooltipContent }: NavbarCommandProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline" className="h-9 w-9" size="icon" onClick={onClick}>
                    {buttonContent}
                </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>
                <p>{tooltipContent}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default NavbarCommand