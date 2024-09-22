import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import { signOut } from "@/app/actions/auth.actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { CustomButton } from "@/app/components/CustomButton";

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/auth");
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[400px] flex flex-col items-center">
        <Image
          src={user?.profile_picture_url}
          width={200}
          height={200}
          className="rounded-full"
          alt="avatar"
        />
        <div>
          <h1 className="text-2xl font-light text-center mt-4">
            Welcome {user.username}
          </h1>
          <p className="text-center text-gray-700">
            You have the role: {user.role}
          </p>
        </div>
        <div className="w-full p-2 flex justify-between">
          <CustomButton type="photo" />
          <CustomButton type="video" />
        </div>
        <div className="mt-4">
          <form action={signOut}>
            <Button type="submit" className="w-full">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
