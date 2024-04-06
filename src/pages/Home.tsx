import CodeEditor from "@/components/CodeEditor"
import Navbar from "@/components/Navbar"

const HomePage = () => {

    return (
        <div className="h-screen bg-[#1b191b]">
            <Navbar />
            <CodeEditor />
        </div>
    )
}

export default HomePage