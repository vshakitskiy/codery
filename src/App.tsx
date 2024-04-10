import { ThemeProvider } from "@/providers/ThemeProvider"
import { loader } from "@monaco-editor/react"

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route, 
    RouterProvider
} from "react-router-dom"
import HomePage from "./pages/Home"
import { dracula } from "./dracula"
import { EditorProvider } from "./providers/EditorProvider"
import { languages } from "./lib/constants"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<HomePage />} />
))

const App = () => {
    loader.init().then(async (monaco) => {
        monaco.editor.defineTheme("dracula", dracula)
    })

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <EditorProvider languages={languages}>
                <RouterProvider router={router} />
            </EditorProvider>
        </ThemeProvider>
    )
}

export default App
