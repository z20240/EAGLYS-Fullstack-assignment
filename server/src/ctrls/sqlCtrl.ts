import Express from "express";
import { parseSQLService } from "../services/sqlServices";

export const parseSQL = (req: Express.Request, res: Express.Response) => {
  try {
    console.log(
      "🚀 ~ file: sqlCtrl.ts:7 ~ parseSQL ~ req.body.sql:",
      req.body.sql
    );
    const parsed = parseSQLService(req.body.sql);
    res.json(parsed);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};
