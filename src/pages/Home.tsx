import CodeEditor from "@/components/_editor/CodeEditor"
import Navbar from "@/components/_navbar/Navbar"

const HomePage = () => {

    return (
        <div className="h-screen bg-[#1b191b]">
            <Navbar />
            <CodeEditor />
        </div>
    )
}

export default HomePage