import { Model } from "sequelize-typescript";

export class BaseRepository<T extends Model> {
    constructor(private model: any) {}

    async findAll(): Promise<T[]> {
        return this.model.findAll();
    }
    async findById(id: number): Promise<T | null> {
        return this.model.findByPk(id);
    }
    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }
    async update(id: number, data: Partial<T>): Promise<T | null> {
        const entity = await this.model.findByPk(id);
        if (!entity) return null;
        return entity.update(data);
    }
    async delete(id: number): Promise<boolean> {
        const entity = await this.model.findByPk(id);
        if (!entity) return false;
        await entity.destroy();
        return true;
    }
}