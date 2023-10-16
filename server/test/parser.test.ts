import { parseSQLService } from "../src/services/sqlServices"; // 請根據你的文件結構修改這個路徑

describe("parseSQLService function", () => {
  it("should correctly transform SELECT statement and provide a mapping", () => {
    const sql = "SELECT a, b FROM test WHERE a = 5";
    const result = parseSQLService(sql);

    // Modify this assertion based on your hash function's output
    expect(result.modifiedSQL).toBe(
      "SELECT `0cc175b9c0f1b6a831c399e269772661`, `92eb5ffee6ae2fec3ad71c777531578f` FROM `test` WHERE `0cc175b9c0f1b6a831c399e269772661` = 5"
    );
    expect(result.map).toEqual({
      a: "0cc175b9c0f1b6a831c399e269772661",
      b: "92eb5ffee6ae2fec3ad71c777531578f",
    });
  });

  it("should throw an error for an invalid SQL", () => {
    const sql = "INVALID SQL";
    expect(() => parseSQLService(sql)).toThrow(Error);
  });

  it("should throw error for invalid SQL", () => {
    const sql = "SELECT FROM INVALID SQL;";

    expect(() => parseSQLService(sql)).toThrow();
  });

  it("should handle empty SQL", () => {
    const sql = "";

    expect(() => parseSQLService(sql));
  });
});
