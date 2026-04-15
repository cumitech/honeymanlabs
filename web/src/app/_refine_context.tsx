"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  Beaker,
  Newspaper,
  Boxes,
  FlaskConical,
  LayoutDashboard,
  Package,
  ShieldCheck,
  ShoppingBag,
  TestTube,
  Users,
} from "lucide-react";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import "@/app/globals.css";
import { Toaster } from "@/components/refine-ui/notification/toaster";
import { useNotificationProvider } from "@/components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "@/components/refine-ui/theme/theme-provider";
import { Permission, UserRole } from "@/lib/auth/access-control";
import { useAppTranslation } from "@/lib/i18n/translations";
import { authProvider } from "@/providers/auth-provider";
import { dataProvider } from "@providers/data-provider";

type RefineContextProps = {
  children: React.ReactNode;
};

export const RefineContext = ({ children }: RefineContextProps) => {
  const notificationProvider = useNotificationProvider();
  const { t } = useAppTranslation();

  return (
    <RefineKbarProvider>
      <ThemeProvider>
        <Refine
          dataProvider={dataProvider}
          authProvider={authProvider}
          notificationProvider={notificationProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "admin_dashboard",
              list: "/dashboard/admin",
              meta: {
                label: t.adminDashboard,
                icon: <ShieldCheck className="h-4 w-4" />,
                allowedRoles: [UserRole.ADMIN],
                requiredPermissions: [Permission.READ],
              },
            },
            {
              name: "customer_dashboard",
              list: "/dashboard/customer",
              meta: {
                label: t.customerDashboard,
                icon: <Users className="h-4 w-4" />,
                allowedRoles: [UserRole.CUSTOMER],
                requiredPermissions: [Permission.READ],
              },
            },
            {
              name: "beekeeper_dashboard",
              list: "/dashboard/beekeeper",
              meta: {
                label: t.beekeeperDashboard,
                icon: <LayoutDashboard className="h-4 w-4" />,
                allowedRoles: [UserRole.BEEKEEPER],
                requiredPermissions: [Permission.READ, Permission.WRITE],
              },
            },
            {
              name: "lab_staff_dashboard",
              list: "/dashboard/lab-staff",
              meta: {
                label: t.labDashboard,
                icon: <FlaskConical className="h-4 w-4" />,
                allowedRoles: [UserRole.LAB_STAFF],
                requiredPermissions: [Permission.READ, Permission.MANAGE_LAB],
              },
            },
            {
              name: "articles",
              list: "/dashboard/articles",
              create: "/dashboard/articles/create",
              edit: "/dashboard/articles/edit/:id",
              show: "/dashboard/articles/show/:id",
              meta: {
                label: t.articles,
                icon: <Newspaper className="h-4 w-4" />,
                canDelete: true,
                allowedRoles: [UserRole.ADMIN],
                requiredPermissions: [Permission.READ, Permission.MANAGE_CONTENT],
              },
            },
            {
              name: "article_categories",
              list: "/dashboard/article-categories",
              create: "/dashboard/article-categories/create",
              edit: "/dashboard/article-categories/edit/:id",
              show: "/dashboard/article-categories/show/:id",
              meta: {
                label: t.articleCategories,
                icon: <Package className="h-4 w-4" />,
                canDelete: true,
                allowedRoles: [UserRole.ADMIN],
                requiredPermissions: [Permission.READ, Permission.MANAGE_CONTENT],
              },
            },
            {
              name: "lab_tests",
              list: "/dashboard/lab-tests",
              create: "/dashboard/lab-tests/create",
              edit: "/dashboard/lab-tests/edit/:id",
              show: "/dashboard/lab-tests/show/:id",
              meta: {
                label: t.labTests,
                icon: <TestTube className="h-4 w-4" />,
                canDelete: true,
                allowedRoles: [UserRole.ADMIN, UserRole.LAB_STAFF],
                requiredPermissions: [Permission.READ, Permission.MANAGE_LAB],
              },
            },
            {
              name: "lab_results",
              list: "/dashboard/lab-results",
              create: "/dashboard/lab-results/create",
              edit: "/dashboard/lab-results/edit/:id",
              show: "/dashboard/lab-results/show/:id",
              meta: {
                label: t.labResults,
                icon: <Beaker className="h-4 w-4" />,
                canDelete: true,
                allowedRoles: [UserRole.ADMIN, UserRole.LAB_STAFF],
                requiredPermissions: [Permission.READ, Permission.MANAGE_LAB],
              },
            },
            {
              name: "beekeepers",
              list: "/dashboard/beekeepers",
              create: "/dashboard/beekeepers/create",
              edit: "/dashboard/beekeepers/edit/:id",
              show: "/dashboard/beekeepers/show/:id",
              meta: {
                label: t.beekeepers,
                icon: <Users className="h-4 w-4" />,
                canDelete: true,
                allowedRoles: [UserRole.ADMIN, UserRole.BEEKEEPER],
                requiredPermissions: [Permission.READ, Permission.WRITE],
              },
            },
            {
              name: "apiaries",
              list: "/dashboard/apiaries",
              create: "/dashboard/apiaries/create",
              edit: "/dashboard/apiaries/edit/:id",
              show: "/dashboard/apiaries/show/:id",
              meta: {
                label: t.apiaries,
                icon: <Boxes className="h-4 w-4" />,
                canDelete: true,
                allowedRoles: [UserRole.ADMIN, UserRole.BEEKEEPER],
                requiredPermissions: [Permission.READ, Permission.WRITE],
              },
            },
            {
              name: "honey_batches",
              list: "/dashboard/honey-batches",
              create: "/dashboard/honey-batches/create",
              edit: "/dashboard/honey-batches/edit/:id",
              show: "/dashboard/honey-batches/show/:id",
              meta: {
                label: t.honeyBatches,
                icon: <Package className="h-4 w-4" />,
                canDelete: true,
                allowedRoles: [UserRole.ADMIN, UserRole.BEEKEEPER],
                requiredPermissions: [Permission.READ, Permission.WRITE],
              },
            },
            {
              name: "products",
              list: "/dashboard/products",
              create: "/dashboard/products/create",
              edit: "/dashboard/products/edit/:id",
              show: "/dashboard/products/show/:id",
              meta: {
                label: t.products,
                icon: <ShoppingBag className="h-4 w-4" />,
                canDelete: true,
                allowedRoles: [UserRole.ADMIN, UserRole.CUSTOMER],
                requiredPermissions: [Permission.READ],
              },
            },
            {
              name: "product_images",
              meta: {
                label: "Product images",
                hideFromMenu: true,
                allowedRoles: [UserRole.ADMIN, UserRole.CUSTOMER],
                requiredPermissions: [Permission.READ],
              },
            },
            {
              name: "orders",
              list: "/dashboard/orders",
              create: "/dashboard/orders/create",
              edit: "/dashboard/orders/edit/:id",
              show: "/dashboard/orders/show/:id",
              meta: {
                label: t.orders,
                icon: <Package className="h-4 w-4" />,
                canDelete: true,
                allowedRoles: [UserRole.ADMIN, UserRole.CUSTOMER],
                requiredPermissions: [Permission.READ],
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          {children}
          <Toaster />
          <RefineKbar />
        </Refine>
      </ThemeProvider>
    </RefineKbarProvider>
  );
};
