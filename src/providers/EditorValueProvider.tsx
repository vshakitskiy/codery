import { createContext, useContext, useEffect, useState } from "react"
import { decompressFromEncodedURIComponent as decompress } from "lz-string"
import { useToast } from "@/components/ui/use-toast"

type EditorValueProviderProps = {
    children: React.ReactNode
}

type EditorValueState = {
    editorValue: string
    setEditorValue: (editorValue: string) => void
}
   

const EditorValueContext = createContext<EditorValueState>({
    editorValue: "",
    setEditorValue: () => {}
})

export const EditorValueProvider = ({ children }: EditorValueProviderProps) => {
    const [editorValue, setEditorValue] = useState("")
    const { toast } = useToast()
    
    useEffect(() => {
        const urlSearch = window.location.search
        const params = new URLSearchParams(urlSearch)

        const code = params.get("code")
        if (code) {
            const codeDecompressed = decompress(code)
            if (!codeDecompressed)
                setTimeout(() => toast({
                    title: "Error",
                    description: "Unabled to extract the code.",
                    duration: 3000
                }), 0)
            setEditorValue(codeDecompressed ? codeDecompressed : "const sayHello = (name: string = \"stranger\") => {\r\n    console.log(`Hello, ${name}`)\r\n}\r\n\r\nsayHello(\"Mike\")")
        } else {
            setEditorValue("const sayHello = (name: string = \"stranger\") => {\r\n    console.log(`Hello, ${name}`)\r\n}\r\n\r\nsayHello(\"Mike\")")
        }
    }, [])

    return (
        <EditorValueContext.Provider value={{ editorValue, setEditorValue }}>
            {children}
        </EditorValueContext.Provider>
    )
}

export const useEditorValue = () => {
    const context = useContext(EditorValueContext)

    if (context === undefined)
        throw new Error("useEditorValue must be used within a EditorValueProvider")
 
    return context
}