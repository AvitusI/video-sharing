import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OAuth } from "@/app/components/OAuth";

export default function Auth() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <Tabs defaultValue="signin" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">Sign In form goes here.</TabsContent>
          <TabsContent value="signup">Sign Up form goes here.</TabsContent>
        </Tabs>
        <div className="w-full grid grid-cols-3 items-center gap-2">
          <span></span>
          <span className="text-xl">OR</span>
          <span></span>
        </div>
        <OAuth />
      </div>
    </div>
  );
}
