import CodeEditor from "@/components/Editor/CodeEditor"
import Navbar from "@/components/Navbar/Navbar"

const HomePage = () => {

    return (
        <div className="h-screen bg-[#1b191b]">
            <Navbar />
            <CodeEditor />
        </div>
    )
}

export default HomePage