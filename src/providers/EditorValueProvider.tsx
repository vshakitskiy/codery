import { createContext, useContext, useState } from "react"

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
    const [editorValue, setEditorValue] = useState("const sayHello = (name: string = \"stranger\") => {\r\n    console.log(`Hello, ${name}`)\r\n}\r\n\r\nsayHello(\"Mike\")")

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