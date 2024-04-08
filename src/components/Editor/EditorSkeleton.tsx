import { Skeleton } from "../ui/skeleton"

const EditorSkeleton = () => {
    return (
        <div className="fixed left-[52px] top-0">
            {[...Array(30)].map((_, i) =>
                <Skeleton
                    className="h-[18px] bg-[#27272a]"
                    style={{ 
                        width: `${Math.floor(Math.random() * 400) + 100}px`, 
                        marginTop: `${Math.random() * 100 > 30 ? "3" : "16"}px`
                    }}
                    key={`skeleton-${i}`}
                />
            )}
        </div>
    )
}

export default EditorSkeleton