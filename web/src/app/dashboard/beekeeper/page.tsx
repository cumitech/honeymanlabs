import Link from "next/link";

import { RoleGuard } from "@/components/auth/role-guard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/lib/auth/access-control";

export default function BeekeeperDashboardPage() {
  return (
    <RoleGuard allow={[UserRole.BEEKEEPER]}>
      <section className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Beekeeper Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage apiaries, honey batches, and testing submissions.
            </p>
          </div>
          <Badge variant="secondary" className="h-7 px-3">
            Beekeeper
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Apiaries</CardDescription>
              <CardTitle className="text-2xl">Field Overview</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Monitor apiary locations, conditions, and active production.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Batches</CardDescription>
              <CardTitle className="text-2xl">Production Flow</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Track batch lifecycles from harvest to lab submission.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Verification</CardDescription>
              <CardTitle className="text-2xl">Lab Requests</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Review pending and completed quality verification requests.
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/dashboard/beekeepers" className="block">
            <Card className="transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>Beekeeper Profile</CardTitle>
                <CardDescription>Manage your profile and operation details.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/apiaries" className="block">
            <Card className="transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>Apiaries</CardTitle>
                <CardDescription>Track apiary sites, performance, and outputs.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/honey-batches" className="block">
            <Card className="transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>Honey Batches</CardTitle>
                <CardDescription>Create and update batch records for testing.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </RoleGuard>
  );
}
