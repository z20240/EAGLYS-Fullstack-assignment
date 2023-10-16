"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sqlCtrl_1 = require("./ctrls/sqlCtrl");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3333;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/parse", sqlCtrl_1.parseSQL);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});