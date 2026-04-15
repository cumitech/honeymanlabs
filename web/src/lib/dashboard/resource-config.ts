import { Permission, UserRole } from "@/lib/auth/access-control";

export type DashboardResourceConfig = {
  segment: string;
  resource: string;
  label: string;
  allowedRoles: UserRole[];
  requiredPermissions: Permission[];
};

export const DASHBOARD_RESOURCE_CONFIG: DashboardResourceConfig[] = [
  {
    segment: "lab-tests",
    resource: "lab_tests",
    label: "Lab Tests",
    allowedRoles: [UserRole.ADMIN, UserRole.LAB_STAFF],
    requiredPermissions: [Permission.READ, Permission.MANAGE_LAB],
  },
  {
    segment: "lab-results",
    resource: "lab_results",
    label: "Lab Results",
    allowedRoles: [UserRole.ADMIN, UserRole.LAB_STAFF],
    requiredPermissions: [Permission.READ, Permission.MANAGE_LAB],
  },
  {
    segment: "beekeepers",
    resource: "beekeepers",
    label: "Beekeepers",
    allowedRoles: [UserRole.ADMIN, UserRole.BEEKEEPER],
    requiredPermissions: [Permission.READ, Permission.WRITE],
  },
  {
    segment: "apiaries",
    resource: "apiaries",
    label: "Apiaries",
    allowedRoles: [UserRole.ADMIN, UserRole.BEEKEEPER],
    requiredPermissions: [Permission.READ, Permission.WRITE],
  },
  {
    segment: "honey-batches",
    resource: "honey_batches",
    label: "Honey Batches",
    allowedRoles: [UserRole.ADMIN, UserRole.BEEKEEPER],
    requiredPermissions: [Permission.READ, Permission.WRITE],
  },
  {
    segment: "products",
    resource: "products",
    label: "Products",
    allowedRoles: [UserRole.ADMIN, UserRole.CUSTOMER],
    requiredPermissions: [Permission.READ],
  },
  {
    segment: "orders",
    resource: "orders",
    label: "Orders",
    allowedRoles: [UserRole.ADMIN, UserRole.CUSTOMER],
    requiredPermissions: [Permission.READ],
  },
];

export function getDashboardResourceConfig(segment: string) {
  return DASHBOARD_RESOURCE_CONFIG.find((item) => item.segment === segment);
}
