import { Model } from "sequelize-typescript";
export declare class BaseRepository<T extends Model> {
    private model;
    constructor(model: any);
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=base.repository.d.ts.map