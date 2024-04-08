import MonacoEditor from "@monaco-editor/react"
import { useRef } from "react"
import EditorSkeleton from "./EditorSkeleton"
import { editor } from "monaco-editor"
import { useEditorValue } from "@/providers/EditorValueProvider"

const CodeEditor = () => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>()
    const { editorValue, setEditorValue } = useEditorValue()

    return (
        <div>
            <MonacoEditor
                options={{
                    minimap: {
                        enabled: false
                    },
                    fontSize: 16,
                    fontFamily: "monospace",
                    scrollBeyondLastLine: false,
                    lineNumbersMinChars: 3,
                    
                }}
                height="100vh"
                theme="dracula"
                loading={<EditorSkeleton />}
                defaultValue={editorValue}
                language="typescript"
                onMount={editor => {
                    editorRef.current = editor
                    editor.focus()
                }}
                value={editorValue}
                onChange={(value) => {
                    setEditorValue(value as string)
                    localStorage.setItem("code", value as string)
                }}
            />
        </div>
    )
}

export default CodeEditor