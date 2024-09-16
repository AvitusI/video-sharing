"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter(); // This works with client components

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <span className="text-3xl font-bold tracking-wide">
          This is the Main Page
        </span>
        <Button size="lg" onClick={() => router.push("/home")}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
