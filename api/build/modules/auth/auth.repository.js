"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const user_model_1 = require("../../database/models/user.model");
class AuthRepository {
    async findByEmail(email) {
        return user_model_1.User.findOne({ where: { email } });
    }
    async createUser(data) {
        return user_model_1.User.create(data);
    }
    async findById(id) {
        return user_model_1.User.findByPk(id);
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map