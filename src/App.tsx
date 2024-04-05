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
import { EditorValueProvider } from "./providers/EditorValueProvider"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<HomePage />} />
))

const App = () => {
    loader.init().then(async (monaco) => {
        monaco.editor.defineTheme("dracula", dracula)
    })

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <EditorValueProvider>
                <RouterProvider router={router} />
            </EditorValueProvider>
        </ThemeProvider>
    )
}

export default App
