"use client";

import {
  createGoogleAuthorizationURL,
  createGithubAuthorizationURL,
} from "../actions/auth.actions";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
    <div className="flex flex-col gap-2">
      <div className="w-full flex items-center justify-center">
        <Button
          variant="outline"
          className="w-full"
          onClick={onGoogleSignInClicked}
        >
          Sign in with Google
        </Button>
      </div>

      <div className="w-full flex items-center justify-center">
        <Button
          variant="outline"
          className="w-full"
          onClick={onGithubSignInClicked}
        >
          Sign in with Github
        </Button>
      </div>
    </div>
  );
};
