"use client";

import { useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { brandLogoBoxClassName } from "@/config/brand-logo";
import { cn } from "@/lib/utils";
import {
  useLink,
  useNotification,
  useRegister,
} from "@refinedev/core";

export const SignUpForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { open } = useNotification();

  const Link = useLink();

  const { mutate: register, isPending } = useRegister();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      open?.({
        type: "error",
        message: "Passwords don't match",
        description:
          "Please make sure both password fields contain the same value.",
      });

      return;
    }

    register({
      firstname,
      lastname,
      phone,
      email,
      password,
    });
  };

  const handleSignUpWithAuth0 = () => {
    register({
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
            Sign up
          </CardTitle>
          <CardDescription
            className={cn("text-muted-foreground", "font-medium")}
          >
            Create your Honeyman account to get started.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className={cn("px-0")}>
          <form onSubmit={handleSignUp}>
            <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2")}>
              <div className={cn("flex", "flex-col", "gap-2")}>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  type="text"
                  required
                  disabled={isPending}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className={cn("flex", "flex-col", "gap-2")}>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  type="text"
                  required
                  disabled={isPending}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <div className={cn("flex", "flex-col", "gap-2", "mt-6")}>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                required
                disabled={isPending}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

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
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending}
              />
            </div>

            <div
              className={cn("relative", "flex", "flex-col", "gap-2", "mt-6")}
            >
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <InputPassword
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isPending}
              />
            </div>

            <Button
              type="submit"
              variant="honey"
              size="lg"
              className={cn("w-full", "mt-6")}
              disabled={isPending}
            >
              {isPending ? "Creating account..." : "Sign up"}
            </Button>

            <div className={cn("flex", "items-center", "gap-4", "mt-6")}>
              <Separator className={cn("flex-1")} />
              <span className={cn("text-sm", "text-muted-foreground")}>or</span>
              <Separator className={cn("flex-1")} />
            </div>

            <div className={cn("flex", "flex-col", "gap-4", "mt-6")}>
              <div className={cn("grid grid-cols-1", "gap-6")}>
                <Button
                  variant="outline"
                  className={cn("flex", "items-center", "gap-2")}
                  onClick={handleSignUpWithAuth0}
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
              Have an account?{" "}
            </span>
            <Link
              to="/login"
              className={cn(
                "text-[var(--accent)]",
                "font-semibold",
                "underline"
              )}
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

SignUpForm.displayName = "SignUpForm";
