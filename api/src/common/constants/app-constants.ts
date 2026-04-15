export enum USER_ROLES {
  ADMIN = "admin",
  CUSTOMER = "customer",
  BEEKEEPER = "beekeeper",
  LAB_STAFF = "lab_staff",
}

export enum PERMISSIONS {
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
  MANAGE_USERS = "manage_users",
  MANAGE_CONTENT = "manage_content",
  MANAGE_LAB = "manage_lab",
}

export const ROLE_PERMISSIONS: Record<USER_ROLES, PERMISSIONS[]> = {
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.READ,
    PERMISSIONS.WRITE,
    PERMISSIONS.DELETE,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.MANAGE_LAB,
  ],
  [USER_ROLES.CUSTOMER]: [PERMISSIONS.READ],
  [USER_ROLES.BEEKEEPER]: [
    PERMISSIONS.READ,
    PERMISSIONS.WRITE,
    PERMISSIONS.MANAGE_CONTENT,
  ],
  [USER_ROLES.LAB_STAFF]: [
    PERMISSIONS.READ,
    PERMISSIONS.WRITE,
    PERMISSIONS.MANAGE_LAB,
  ],
};

export enum CONTENT_LANGUAGES {
  EN = "en",
  FR = "fr",
}

export * from "./cameroon-locations";
