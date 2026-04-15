import { PERMISSIONS, USER_ROLES } from "../constants/app-constants";

export const authorize =
  (...roles: USER_ROLES[]) =>
  (req: any, res: any, next: any) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send("Forbidden");
    }

    next();
  };

export const authorizePermissions =
  (...permissions: PERMISSIONS[]) =>
  (req: any, res: any, next: any) => {
    const userPermissions = req.user?.permissions ?? [];
    const hasAllPermissions = permissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasAllPermissions) {
      return res.status(403).send("Forbidden");
    }

    next();
  };