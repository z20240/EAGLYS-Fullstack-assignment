"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSQL = void 0;
const sqlServices_1 = require("../services/sqlServices");
const parseSQL = (req, res) => {
    try {
        console.log("🚀 ~ file: sqlCtrl.ts:7 ~ parseSQL ~ req.body.sql:", req.body.sql);
        const parsed = (0, sqlServices_1.parseSQLService)(req.body.sql);
        res.json(parsed);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
};
exports.parseSQL = parseSQL;
