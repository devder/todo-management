import { readFile, writeFile } from "fs/promises";
import path from "path";

type DbModelType = "todos" | "auth";
export class DB {
  // dynamically retrieve the path to the file storage
  static getDbPath = (model: string): string => {
    return path.join(process.cwd(), "src", "pages", "api", model, "db", `${model}.json`);
  };

  static extractDataFromDb = async <T>(model: DbModelType): Promise<T> => {
    const filePath = this.getDbPath(model);

    // read and parse the data in the storage
    const fileData = await readFile(filePath, { encoding: "utf8" });
    const data = JSON.parse(fileData) as T;
    return data;
  };

  static writeDataToDb = async <T>(model: DbModelType, data: T) => {
    const filePath = this.getDbPath(model);

    await writeFile(filePath, JSON.stringify(data));
  };
}
