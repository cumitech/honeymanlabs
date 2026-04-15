"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_LANGUAGES = exports.ROLE_PERMISSIONS = exports.PERMISSIONS = exports.USER_ROLES = void 0;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["ADMIN"] = "admin";
    USER_ROLES["CUSTOMER"] = "customer";
    USER_ROLES["BEEKEEPER"] = "beekeeper";
    USER_ROLES["LAB_STAFF"] = "lab_staff";
})(USER_ROLES || (exports.USER_ROLES = USER_ROLES = {}));
var PERMISSIONS;
(function (PERMISSIONS) {
    PERMISSIONS["READ"] = "read";
    PERMISSIONS["WRITE"] = "write";
    PERMISSIONS["DELETE"] = "delete";
    PERMISSIONS["MANAGE_USERS"] = "manage_users";
    PERMISSIONS["MANAGE_CONTENT"] = "manage_content";
    PERMISSIONS["MANAGE_LAB"] = "manage_lab";
})(PERMISSIONS || (exports.PERMISSIONS = PERMISSIONS = {}));
exports.ROLE_PERMISSIONS = {
    [USER_ROLES.ADMIN]: [
        PERMISSIONS.READ,
        PERMISSIONS.WRITE,
        PERMISSIONS.DELETE,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.MANAGE_CONTENT,
        PERMISSIONS.MANAGE_LAB,
    ],
    [USER_ROLES.CUSTOMER]: [PERMISSIONS.READ],
    [USER_ROLES.BEEKEEPER]: [
        PERMISSIONS.READ,
        PERMISSIONS.WRITE,
        PERMISSIONS.MANAGE_CONTENT,
    ],
    [USER_ROLES.LAB_STAFF]: [
        PERMISSIONS.READ,
        PERMISSIONS.WRITE,
        PERMISSIONS.MANAGE_LAB,
    ],
};
var CONTENT_LANGUAGES;
(function (CONTENT_LANGUAGES) {
    CONTENT_LANGUAGES["EN"] = "en";
    CONTENT_LANGUAGES["FR"] = "fr";
})(CONTENT_LANGUAGES || (exports.CONTENT_LANGUAGES = CONTENT_LANGUAGES = {}));
//# sourceMappingURL=app-contants.js.map