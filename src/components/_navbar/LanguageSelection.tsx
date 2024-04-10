import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useEditorOptions } from "@/providers/EditorProvider"
import TypeScript from "../icons/Typescript"
import Javascript from "../icons/Javascript"
import { LanguagesTuple } from "@/lib/types"

const LanguageSelection = () => {
    const { runtimes, selectedLanguage, setSelectedLanguage } = useEditorOptions()

    const iconsConfig: {
        [key in LanguagesTuple]: JSX.Element
    } = {
        "typescript": <TypeScript className="w-5 h-5" />,
        "javascript": <Javascript className="w-5 h-5" />,
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {iconsConfig[selectedLanguage]}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
                <DropdownMenuLabel>
                            Select a language
                </DropdownMenuLabel>
                {runtimes?.map(({ language, v }, i) => (
                    <DropdownMenuItem
                        onSelect={() => {
                            if (language === selectedLanguage) return
                            setSelectedLanguage(language)
                        }}
                        className={cn(
                            "flex justify-between",
                            language === selectedLanguage && "bg-secondary"
                        )}
                        key={`language-${i}`}
                    >
                        <p>{iconsConfig[language]}</p>
                        <p className={cn(language === selectedLanguage && "text-secondary-foreground")}>v {v}</p>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageSelection