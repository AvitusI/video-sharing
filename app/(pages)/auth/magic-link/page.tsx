import { MagicLinkForm } from "@/app/components/MagicLinkForm";

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[360px] flex flex-col gap-4 p-2">
        <span className="text-2xl font-light text-center">
          One Time Sign In
        </span>
        <MagicLinkForm />
      </div>
    </div>
  );
}
