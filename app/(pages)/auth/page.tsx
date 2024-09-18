import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

import { SignInForm } from "@/app/components/SignInForm";
import { SignUpForm } from "@/app/components/SignUpForm";
import { OAuth } from "@/app/components/OAuth";

export default function Auth() {
  return (
    <div className="min-h-screen flex justify-center p-2">
      <div className="w-[360px]">
        <div className="flex justify-center items-center p-2 mb-4">
          <Image src="/images/logo.png" width={100} height={100} alt="logo" />
        </div>

        <div className="flex flex-col gap-4">
          <Tabs defaultValue="signin">
            <TabsList>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
          <div className="mt-4 mb-4 grid grid-cols-3 items-center text-green-500 w-full">
            <hr className="border-green-500" />
            <p className="text-center">OR</p>
            <hr className="border-green-500" />
          </div>
          <OAuth />
        </div>
      </div>
    </div>
  );
}
