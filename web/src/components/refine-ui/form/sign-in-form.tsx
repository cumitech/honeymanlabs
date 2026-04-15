"use client";

import { useState } from "react";

import { CircleHelp } from "lucide-react";
import Image from "next/image";

import { InputPassword } from "@/components/refine-ui/form/input-password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { brandLogoBoxClassName } from "@/config/brand-logo";
import { cn } from "@/lib/utils";
import { useLink, useLogin } from "@refinedev/core";

export const SignInForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Link = useLink();

  const { mutate: login, isPending } = useLogin();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  const handleSignInWithAuth0 = () => {
    login({
      providerName: "auth0",
    });
  };

  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "px-6",
        "py-8",
        "min-h-svh"
      )}
    >
      <div className={cn("flex", "items-center", "justify-center", "gap-3")}>
        <div className={cn("relative", brandLogoBoxClassName)}>
          <Image
            src="/logo.svg"
            alt="Honeyman"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <Card
        className={cn(
          "mt-6 border-[var(--foreground)]/[0.08] bg-[var(--surface-glass)]/90 p-12 shadow-[0_30px_80px_-60px_rgba(255,165,0,0.45)] sm:w-[456px]",
        )}
      >
        <CardHeader className={cn("px-0")}>
          <CardTitle className={cn("text-3xl font-semibold text-[var(--accent)]")}>
            Sign in
          </CardTitle>
          <CardDescription
            className={cn("text-muted-foreground", "font-medium")}
          >
            Welcome back
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className={cn("px-0")}>
          <form onSubmit={handleSignIn}>
            <div className={cn("flex", "flex-col", "gap-2")}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                required
                disabled={isPending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className={cn("relative", "flex", "flex-col", "gap-2", "mt-6")}
            >
              <Label htmlFor="password">Password</Label>
              <InputPassword
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending}
              />
            </div>

            <div
              className={cn(
                "flex items-center justify-between",
                "flex-wrap",
                "gap-2",
                "mt-4"
              )}
            >
              <div className={cn("flex items-center", "space-x-2")}>
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  disabled={isPending}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked === "indeterminate" ? false : checked)
                  }
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Link
                to="/forgot-password"
                className={cn(
                  "text-sm",
                  "flex",
                  "items-center",
                  "gap-2",
                  "text-primary hover:underline",
                  "text-[var(--accent)]"
                )}
              >
                <span>Forgot password</span>
                <CircleHelp className={cn("w-4", "h-4")} />
              </Link>
            </div>

            <Button
              type="submit"
              variant="honey"
              size="lg"
              className={cn("w-full", "mt-6")}
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>

            <div className={cn("flex", "items-center", "gap-4", "mt-6")}>
              <Separator className={cn("flex-1")} />
              <span className={cn("text-sm", "text-muted-foreground")}>or</span>
              <Separator className={cn("flex-1")} />
            </div>

            <div className={cn("flex", "flex-col", "gap-4", "mt-6")}>
              <p className={cn("text-sm", "font-medium")}>Sign in using</p>
              <div className={cn("grid grid-cols-1", "gap-6")}>
                <Button
                  variant="outline"
                  className={cn("flex", "items-center", "gap-2")}
                  onClick={handleSignInWithAuth0}
                  type="button"
                  disabled={isPending}
                >
                  <div>{isPending ? "Redirecting..." : "Continue with Auth0"}</div>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>

        <Separator />

        <CardFooter>
          <div className={cn("w-full", "text-center text-sm")}>
            <span className={cn("text-sm", "text-muted-foreground")}>
              No account?{" "}
            </span>
            <Link
              to="/register"
              className={cn(
                "text-[var(--accent)]",
                "font-semibold",
                "underline"
              )}
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

SignInForm.displayName = "SignInForm";
