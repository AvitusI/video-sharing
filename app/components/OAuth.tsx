"use client";

import {
  createGoogleAuthorizationURL,
  createGithubAuthorizationURL,
} from "../actions/auth.actions";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

export const OAuth = () => {
  const onGoogleSignInClicked = async () => {
    const res = await createGoogleAuthorizationURL();

    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      window.location.href = res.data.toString();
    }
  };

  const onGithubSignInClicked = async () => {
    const res = await createGithubAuthorizationURL();

    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      window.location.href = res.data.toString();
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <div className="w-full">
        <Button
          variant="outline"
          size="custom"
          className="w-full"
          onClick={onGoogleSignInClicked}
        >
          <Image
            src="/images/google.svg"
            alt="Google Icon"
            width={18}
            height={18}
            className="justify-self-end"
          />
          <span className="justify-self-start">Continue with Google</span>
        </Button>
      </div>

      <div className="w-full">
        <Button
          variant="outline"
          size="custom"
          className="w-full"
          onClick={onGithubSignInClicked}
        >
          <Image
            src="/images/github.svg"
            alt="Github Icon"
            width={20}
            height={20}
            className="justify-self-end"
          />
          <span className="justify-self-start">Continue with Github</span>
        </Button>
      </div>

      <div className="w-full">
        <Button variant="outline" size="custom" className="w-full">
          <Image
            src="/images/key.svg"
            alt="Key Icon"
            width={18}
            height={18}
            className="justify-self-end"
          />
          <span className="justify-self-start">Use Magic Link</span>
        </Button>
      </div>
    </div>
  );
};
