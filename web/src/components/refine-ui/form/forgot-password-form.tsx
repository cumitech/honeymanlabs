"use client";

import { useState } from "react";

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
import { useForgotPassword, useLink, useRefineOptions } from "@refinedev/core";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const Link = useLink();
  const { title } = useRefineOptions();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword({ email });
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
        "min-h-svh",
      )}
    >
      <div className={cn("flex", "items-center", "justify-center")}>
        {title.icon && (
          <div
            className={cn(
              "flex items-center justify-center text-foreground",
              brandLogoBoxClassName,
              "[&>svg]:size-full",
            )}
          >
            {title.icon}
          </div>
        )}
      </div>

      <Card className={cn("sm:w-[456px]", "p-12", "mt-6")}>
        <CardHeader className={cn("px-0")}>
          <CardTitle className={cn("text-3xl", "font-semibold")}>
            Forgot password
          </CardTitle>
          <CardDescription className={cn("text-muted-foreground", "font-medium")}>
            Enter your email and we will send reset instructions.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className={cn("px-0")}>
          <form onSubmit={onSubmit}>
            <div className={cn("flex", "flex-col", "gap-2")}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                disabled={isPending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className={cn("w-full", "mt-6")}
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Send reset link"}
            </Button>
          </form>
        </CardContent>

        <Separator />

        <CardFooter>
          <div className={cn("w-full", "text-center text-sm")}>
            <span className={cn("text-sm", "text-muted-foreground")}>
              Remembered your password?{" "}
            </span>
            <Link to="/login" className={cn("font-semibold", "underline")}>
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

ForgotPasswordForm.displayName = "ForgotPasswordForm";
