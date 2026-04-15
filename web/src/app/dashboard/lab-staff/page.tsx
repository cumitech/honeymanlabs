import Link from "next/link";

import { RoleGuard } from "@/components/auth/role-guard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/lib/auth/access-control";

export default function LabStaffDashboardPage() {
  return (
    <RoleGuard allow={[UserRole.LAB_STAFF]}>
      <section className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Lab Staff Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Execute assigned tests, publish validated outcomes, and monitor quality.
            </p>
          </div>
          <Badge variant="secondary" className="h-7 px-3">
            Lab Staff
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Assigned Tests</CardDescription>
              <CardTitle className="text-2xl">In Queue</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Process active test requests based on lab priority and SLA.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Published Results</CardDescription>
              <CardTitle className="text-2xl">Validated</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Confirm and publish reliable outcomes for downstream use.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Quality Metrics</CardDescription>
              <CardTitle className="text-2xl">Lab Health</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Watch throughput and consistency across testing operations.
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/dashboard/lab-tests" className="block">
            <Card className="transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>Lab Tests</CardTitle>
                <CardDescription>
                  Manage incoming test requests and assignment flow.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/lab-results" className="block">
            <Card className="transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>Lab Results</CardTitle>
                <CardDescription>
                  Publish and maintain approved test results.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </RoleGuard>
  );
}
