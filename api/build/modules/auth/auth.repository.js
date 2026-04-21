"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const user_model_1 = require("../../database/models/user.model");
class AuthRepository {
    async findByEmail(email) {
        return user_model_1.User.findOne({ where: { email } });
    }
    async findByGoogleSub(googleSub) {
        return user_model_1.User.findOne({ where: { google_sub: googleSub } });
    }
    async findByFacebookId(facebookId) {
        return user_model_1.User.findOne({ where: { facebook_id: facebookId } });
    }
    async createUser(data) {
        return user_model_1.User.create(data);
    }
    async createOAuthUser(data) {
        return user_model_1.User.create({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password_hash: null,
            phone: data.phone,
            avatar_url: data.avatar_url,
            google_sub: data.google_sub,
            facebook_id: data.facebook_id,
        });
    }
    async findById(id) {
        return user_model_1.User.findByPk(id);
    }
    async updateUser(id, fields) {
        const user = await user_model_1.User.findByPk(id);
        if (!user)
            return null;
        await user.update(fields);
        return user.reload();
    }
    async recordSignIn(userId, row) {
        const user = await user_model_1.User.findByPk(userId);
        if (!user)
            return;
        await user.increment("sign_in_count");
        await user.update({
            last_sign_in_at: new Date(),
            last_sign_in_method: row.method,
            last_sign_in_client: row.clientKind,
            last_sign_in_device_label: row.deviceLabel,
            last_sign_in_user_agent: row.userAgent,
            last_sign_in_ip: row.ipAddress,
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map