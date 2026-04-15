export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
  BEEKEEPER = "beekeeper",
  LAB_STAFF = "lab_staff",
}

export enum Permission {
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
  MANAGE_USERS = "manage_users",
  MANAGE_CONTENT = "manage_content",
  MANAGE_LAB = "manage_lab",
}

export type AuthUser = {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar_url?: string | null;
  role: UserRole;
  permissions: Permission[];
};

export const DASHBOARD_HOME_BY_ROLE: Record<UserRole, string> = {
  [UserRole.ADMIN]: "/dashboard/admin",
  [UserRole.CUSTOMER]: "/dashboard/customer",
  [UserRole.BEEKEEPER]: "/dashboard/beekeeper",
  [UserRole.LAB_STAFF]: "/dashboard/lab-staff",
};

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrator",
  [UserRole.CUSTOMER]: "Customer",
  [UserRole.BEEKEEPER]: "Beekeeper",
  [UserRole.LAB_STAFF]: "Lab Staff",
};

export const hasPermission = (
  user: Pick<AuthUser, "permissions"> | null | undefined,
  permission: Permission,
): boolean => {
  if (!user) return false;
  return user.permissions.includes(permission);
};
