import { Button } from "@/components/ui/button"
import { LiveCard } from "./LiveCard"

const arr = Array(3).fill(0).map((_, i) => i + 1);

export const LiveEvent = () => {
    return (
        <div className="border-t p-4 border-gray-500 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Live Events</h1>
                <Button className="bg-green-500 text-white" size="sm">
                    View All
                </Button>
            </div>
            <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {arr.map((elm, i) => (
                    <LiveCard key={i} />
                ))}
            </div>
        </div>
    )
}