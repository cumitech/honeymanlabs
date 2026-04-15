"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        return this.model.findAll();
    }
    async findById(id) {
        return this.model.findByPk(id);
    }
    async create(data) {
        return this.model.create(data);
    }
    async update(id, data) {
        const entity = await this.model.findByPk(id);
        if (!entity)
            return null;
        return entity.update(data);
    }
    async delete(id) {
        const entity = await this.model.findByPk(id);
        if (!entity)
            return false;
        await entity.destroy();
        return true;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map