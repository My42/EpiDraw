"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("faker");
const db_1 = require("@shared/utils/db");
const createUser = (user = {}) => {
    const _id = db_1.Types.ObjectId();
    return Object.assign({ _id, id: _id.toHexString(), email: faker_1.internet.email(), password: faker_1.internet.password(6), username: faker_1.internet.userName() }, user);
};
exports.default = createUser;
//# sourceMappingURL=createUser.js.map