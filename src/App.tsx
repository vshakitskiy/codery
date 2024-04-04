import { ThemeProvider } from "@/components/themeProvider"
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route, 
    RouterProvider
} from "react-router-dom"
import HomePage from "./pages/Home"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<HomePage />} />
))

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App
