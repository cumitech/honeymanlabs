export declare enum USER_ROLES {
    ADMIN = "admin",
    CUSTOMER = "customer",
    BEEKEEPER = "beekeeper",
    LAB_STAFF = "lab_staff"
}
export declare enum PERMISSIONS {
    READ = "read",
    WRITE = "write",
    DELETE = "delete",
    MANAGE_USERS = "manage_users",
    MANAGE_CONTENT = "manage_content",
    MANAGE_LAB = "manage_lab"
}
export declare const ROLE_PERMISSIONS: Record<USER_ROLES, PERMISSIONS[]>;
export declare enum CONTENT_LANGUAGES {
    EN = "en",
    FR = "fr"
}
//# sourceMappingURL=app-contants.d.ts.map