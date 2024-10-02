"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export function SignIn() {
  return (
    <Button
      onClick={() => signIn("google", { redirectTo: "/" })}
      className="w-full"
    >
      Sign In with Google
    </Button>
  );
}
