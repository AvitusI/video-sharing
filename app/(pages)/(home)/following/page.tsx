import { FollowingCard } from "@/app/components/FollowingCard";

const arr = Array(10).fill(0).map((_, i) => i + 1);

export default function FollowingPage() {
  return (
    <div className="flex justify-center mt-16">
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {arr.map((elm, i) => (
          <FollowingCard key={i} />
        ))}
      </div>
    </div>
  )
}
