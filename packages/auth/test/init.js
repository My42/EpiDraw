"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const db_1 = require("@shared/utils/db");
mocha_1.before(async () => {
    console.log('BEFORE');
    try {
        await db_1.connect('mongodb://database:27017/EpiDrawTest', { useNewUrlParser: true, useUnifiedTopology: true });
    }
    catch (e) {
        console.log('ERROR = ', e);
    }
});
mocha_1.after(async () => {
    console.log('AFTER');
    try {
        await db_1.connection.dropDatabase();
        await db_1.disconnect();
    }
    catch (e) {
        console.log('ERROR = ', e);
    }
});
//# sourceMappingURL=init.js.map