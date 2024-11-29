import { ExploreVideo } from "./ExploreVideo"

interface ExploreContentProps {
    category: string
}

const arr = Array(10).fill(0).map((_, i) => i + 1)

export const ExploreContent = ({
    category
}: ExploreContentProps) => {
    return (
        <div className="flex justify-start m-2 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {arr.map((elm, i) => (
                    <ExploreVideo key={i} />
                ))}
            </div>
        </div>
    )
}