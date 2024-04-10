import { createContext, useContext, useEffect, useState } from "react" 
import { decompressFromEncodedURIComponent as decompress } from "lz-string" 
import { useToast } from "@/components/ui/use-toast" 
import { useRuntimes } from "@/hooks/useRuntimes" 
import { isLanguage, Languages, LanguagesTuple, Runtimes } from "@/lib/types" 
import { editorDefaultValue } from "@/lib/constants" 
 
type EditorProviderProps = { 
    children: React.ReactNode, 
    languages: Languages 
} 
 
type EditorState = { 
    editorValue: string 
    setEditorValue: (editorValue: string) => void, 
    runtimes: Runtimes | null, 
    selectedLanguage: LanguagesTuple, 
    setSelectedLanguage: (language: LanguagesTuple) => void 
} 
    
 
const EditorContext = createContext<EditorState>({ 
    editorValue: "", 
    setEditorValue: () => {}, 
    runtimes: [], 
    selectedLanguage: "typescript", 
    setSelectedLanguage: () => {} 
}) 
 
export const EditorProvider = ({ children, languages }: EditorProviderProps) => { 
    const [editorValue, setEditorValue] = useState("") 
    const [selectedLanguage, setSelectedLanguage] = useState<LanguagesTuple>("typescript") 
    const { toast } = useToast() 
    const runtimes = useRuntimes(languages.length ? languages : ["typescript"]) 
     
    useEffect(() => { 
        const urlSearch = window.location.search 
        const params = new URLSearchParams(urlSearch) 
 
        const code = params.get("code") 
        const language = params.get("lang") 
 
        if (isLanguage(language)) 
            setSelectedLanguage(language) 
 
        if (code) { 
            const codeDecompressed = decompress(code) 
 
            if (codeDecompressed) { 
                setTimeout(() => toast({ 
                    title: "Success", 
                    description: "Code was successfully extracted from the URL.", 
                    duration: 3000 
                }), 0) 
                setEditorValue(codeDecompressed) 
                localStorage.setItem("code", codeDecompressed) 
 
                return 
            } 
 
            setTimeout(() => toast({ 
                title: "Error", 
                description: "Unabled to extract the code from the URL.", 
                duration: 3000 
            }), 0) 
        } 
 
        const editorValue = localStorage.getItem("code") 
        setEditorValue(editorValue || editorDefaultValue) 
    }, []) 
 
    return ( 
        <EditorContext.Provider value={{ 
            editorValue, 
            setEditorValue, 
            runtimes, 
            selectedLanguage, 
            setSelectedLanguage 
        }}> 
            {children} 
        </EditorContext.Provider> 
    ) 
} 
 
export const useEditorOptions = () => { 
    const context = useContext(EditorContext) 
 
    if (context === undefined) 
        throw new Error("useEditorValue must be used within a EditorValueProvider") 
  
    return context 
}
