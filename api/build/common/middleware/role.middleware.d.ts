import { PERMISSIONS, USER_ROLES } from "../constants/app-contants";
export declare const authorize: (...roles: USER_ROLES[]) => (req: any, res: any, next: any) => any;
export declare const authorizePermissions: (...permissions: PERMISSIONS[]) => (req: any, res: any, next: any) => any;
//# sourceMappingURL=role.middleware.d.ts.map