import Link from "next/link";

import { RoleGuard } from "@/components/auth/role-guard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/lib/auth/access-control";

export default function CustomerDashboardPage() {
  return (
    <RoleGuard allow={[UserRole.CUSTOMER]}>
      <section className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Customer Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Track purchases, product traceability, and account activity.
            </p>
          </div>
          <Badge variant="secondary" className="h-7 px-3">
            Customer
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Orders</CardDescription>
              <CardTitle className="text-2xl">Current Status</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Keep up with delivery progress and shipment milestones.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Traceability</CardDescription>
              <CardTitle className="text-2xl">Batch Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Verify source and quality history of purchased products.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Account</CardDescription>
              <CardTitle className="text-2xl">Profile Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Review contact details and notification preferences.
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/dashboard/products" className="block">
            <Card className="transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Browse available products and review traceability details.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/dashboard/orders" className="block">
            <Card className="transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Track active and past orders with full status updates.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </RoleGuard>
  );
}
