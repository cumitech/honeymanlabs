import { BRAND_LOGO_PX } from "@/config/brand-logo";
import { UserAvatar } from "@/components/refine-ui/layout/user-avatar";
import { ThemeToggle } from "@/components/refine-ui/theme/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  useActiveAuthProvider,
  useLogout,
} from "@refinedev/core";
import { useAppTranslation } from "@/lib/i18n/translations";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const { isMobile } = useSidebar();

  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};

function DesktopHeader() {
  return (
    <header
      className={cn(
        "sticky",
        "top-0",
        "flex",
        "h-16",
        "shrink-0",
        "items-center",
        "gap-4",
        "border-b",
        "border-border",
        "bg-sidebar",
        "pr-3",
        "justify-end",
        "z-40"
      )}
    >
      <ThemeToggle />
      <UserDropdown />
    </header>
  );
}

function MobileHeader() {
  return (
    <header
      className={cn(
        "sticky",
        "top-0",
        "flex",
        "h-14",
        "shrink-0",
        "items-center",
        "gap-2",
        "border-b",
        "border-border",
        "bg-sidebar",
        "px-2",
        "pr-3",
        "justify-between",
        "z-40",
      )}
    >
      <SidebarTrigger
        className={cn(
          "text-muted-foreground",
          "ml-0.5",
          "size-10 shrink-0 touch-manipulation",
        )}
        aria-label="Open navigation menu"
      />

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-row items-center justify-center gap-2 px-2",
        )}
      >
        <Link
          href="/dashboard"
          className="flex min-w-0 max-w-full items-center justify-center gap-2"
        >
          <Image src="/logo.svg" alt="Honeyman" width={BRAND_LOGO_PX} height={BRAND_LOGO_PX} />
          <h2 className="truncate text-sm font-bold">Honeyman</h2>
        </Link>
      </div>

      <ThemeToggle className={cn("h-9", "w-9", "shrink-0")} />
    </header>
  );
}

const UserDropdown = () => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { t } = useAppTranslation();

  const authProvider = useActiveAuthProvider();

  if (!authProvider?.getIdentity) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
        >
          <LogOutIcon
            className={cn("text-destructive", "hover:text-destructive")}
          />
          <span className={cn("text-destructive", "hover:text-destructive")}>
            {isLoggingOut ? t.loggingOut : t.logout}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Header.displayName = "Header";
MobileHeader.displayName = "MobileHeader";
DesktopHeader.displayName = "DesktopHeader";
