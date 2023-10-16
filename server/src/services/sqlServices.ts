import { Parser } from "node-sql-parser";
import * as crypto from "crypto";

function hashColumnName(columnName: string): string {
  return crypto.createHash("md5").update(columnName).digest("hex");
}

export const parseSQLService = (sql: string) => {
  const parser = new Parser();
  const parsed = parser.astify(sql, { database: "postgresql" });

  const columnMap: Record<string, string> = {};
  // Handle if parsed is an array of statements or a single statement
  const modifyStatement = (stmt: any) => {
    if (stmt.type === "select") {
      stmt.columns.forEach((col: any) => {
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
  } else {
    modifiedAst = modifyStatement(parsed);
  }

  const modifiedSQL = parser.sqlify(modifiedAst);
  return {
    modifiedSQL,
    map: columnMap,
  };
};
