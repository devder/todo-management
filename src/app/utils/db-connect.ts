import path from "path";
import fs from "fs";

export const getDbPath = (model: string): string => {
  const filePath = path.join(process.cwd(), "src", "pages", "api", model, "db", `${model}.json`);
  return filePath;
};

export const extractDataFromDb = <T>(filePath: string): T => {
  const fileData = fs.readFileSync(filePath, { encoding: "utf8" });
  const data = JSON.parse(fileData) as T;
  return data;
};
