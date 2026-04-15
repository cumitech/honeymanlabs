import type { RequestHandler } from "express";
type CrudModel = {
    findAndCountAll: (options?: Record<string, unknown>) => Promise<{
        rows: any[];
        count: number;
    }>;
    findByPk: (id: string) => Promise<any | null>;
    create: (data: Record<string, unknown>) => Promise<any>;
};
type HandlerOptions<T = any> = {
    resourceName: string;
    mapRequest?: (body: Record<string, unknown>) => Record<string, unknown>;
    mapResponse?: (item: T) => unknown;
};
export declare function listHandler<T = any>(model: CrudModel, options: HandlerOptions<T>): RequestHandler;
export declare function getByIdHandler<T = any>(model: CrudModel, options: HandlerOptions<T>): RequestHandler;
export declare function createHandler<T = any>(model: CrudModel, options: HandlerOptions<T>): RequestHandler;
export declare function updateHandler<T = any>(model: CrudModel, options: HandlerOptions<T>): RequestHandler;
export declare function deleteHandler(model: CrudModel, options: HandlerOptions): RequestHandler;
export {};
//# sourceMappingURL=crud-handlers.d.ts.map