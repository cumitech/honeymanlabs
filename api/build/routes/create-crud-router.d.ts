import { PERMISSIONS } from "../common/constants/app-contants";
type CrudModel = {
    findAndCountAll: (options?: Record<string, unknown>) => Promise<{
        rows: unknown[];
        count: number;
    }>;
    findByPk: (id: string) => Promise<any>;
    create: (data: Record<string, unknown>) => Promise<any>;
};
type CrudRouterConfig = {
    resourceName: string;
    model: CrudModel;
    readPermissions: PERMISSIONS[];
    writePermissions: PERMISSIONS[];
    deletePermissions: PERMISSIONS[];
};
export declare function createCrudRouter(config: CrudRouterConfig): import("express-serve-static-core").Router;
export {};
//# sourceMappingURL=create-crud-router.d.ts.map