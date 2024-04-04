import MonacoEditor from "@monaco-editor/react"
import { useRef } from "react"
import EditorSkeleton from "./EditorSkeleton"
import { editor } from "monaco-editor"

const CodeEditor = () => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>()

    return (
        <div>
            <MonacoEditor
                options={{
                    minimap: {
                        enabled: false
                    },
                    fontSize: 16,
                    fontFamily: "mono",
                    
                }}
                height="100vh"
                theme="dracula"
                loading={<EditorSkeleton />}
                language="typescript"
                onMount={editor => {
                    editorRef.current = editor
                    editor.focus()
                }}
            />
        </div>
    )
}

export default CodeEditor