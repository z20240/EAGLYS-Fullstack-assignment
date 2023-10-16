"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSQLService = void 0;
const node_sql_parser_1 = require("node-sql-parser");
const crypto = __importStar(require("crypto"));
function hashColumnName(columnName) {
    return crypto.createHash("md5").update(columnName).digest("hex");
}
const parseSQLService = (sql) => {
    const parser = new node_sql_parser_1.Parser();
    const parsed = parser.astify(sql, { database: "postgresql" });
    const columnMap = {};
    // Handle if parsed is an array of statements or a single statement
    const modifyStatement = (stmt) => {
        if (stmt.type === "select") {
            stmt.columns.forEach((col) => {
                if (col.expr && col.expr.column) {
                    const originalName = col.expr.column;
                    const hashedName = hashColumnName(originalName);
                    col.expr.column = hashedName;
                    columnMap[originalName] = hashedName;
                }
            });
            if (stmt.where && stmt.where.left && stmt.where.left.column) {
                const originalName = stmt.where.left.column;
                const hashedName = hashColumnName(originalName);
                stmt.where.left.column = hashedName;
                columnMap[originalName] = hashedName;
            }
        }
        return stmt;
    };
    let modifiedAst;
    if (Array.isArray(parsed)) {
        modifiedAst = parsed.map(modifyStatement);
    }
    else {
        modifiedAst = modifyStatement(parsed);
    }
    const modifiedSQL = parser.sqlify(modifiedAst);
    return {
        modifiedSQL,
        map: columnMap,
    };
};
exports.parseSQLService = parseSQLService;
