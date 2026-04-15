import { RoleGuard } from "@/components/auth/role-guard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/lib/auth/access-control";

export default function AdminDashboardPage() {
  return (
    <RoleGuard allow={[UserRole.ADMIN]}>
      <section className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Oversee platform content, users, and lab operations from one place.
            </p>
          </div>
          <Badge variant="secondary" className="h-7 px-3">
            Administrator
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Platform Health</CardDescription>
              <CardTitle className="text-2xl">99.9% Uptime</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Stable services across auth, dashboard, and content surfaces.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Quality Queue</CardDescription>
              <CardTitle className="text-2xl">12 Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Lab and content submissions awaiting administrative decisions.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>User Growth</CardDescription>
              <CardTitle className="text-2xl">+18% This Month</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Increased onboarding across customers, beekeepers, and lab staff.
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Operational Snapshot</CardTitle>
              <CardDescription>Critical areas to monitor today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span>Active lab tests</span>
                <span className="font-medium text-foreground">34</span>
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span>New beekeeper submissions</span>
                <span className="font-medium text-foreground">7</span>
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span>Orders pending fulfillment</span>
                <span className="font-medium text-foreground">15</span>
              </div>
              <div className="flex items-center justify-between rounded-md border px-3 py-2">
                <span>Content pending moderation</span>
                <span className="font-medium text-foreground">9</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Notes</CardTitle>
              <CardDescription>High-impact priorities and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="rounded-md border px-3 py-2">
                Review overdue lab result approvals before 5:00 PM.
              </div>
              <div className="rounded-md border px-3 py-2">
                Validate taxonomy updates requested by editorial team.
              </div>
              <div className="rounded-md border px-3 py-2">
                Audit role assignment changes from the last 24 hours.
              </div>
              <div className="rounded-md border px-3 py-2">
                Check onboarding quality for new beekeeper applications.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </RoleGuard>
  );
}
