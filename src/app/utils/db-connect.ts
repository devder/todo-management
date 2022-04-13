import { readFile, writeFile } from "fs/promises";
import path from "path";

type DbModelType = "todos" | "users";

export const getDbPath = (model: string): string => {
  // dynamically retrieve the path to the file storage
  return path.join(process.cwd(), "src", "pages", "api", model, "db", `${model}.json`);
};

export const extractDataFromDb = async <T>(model: DbModelType): Promise<T> => {
  const filePath = getDbPath(model);

  // read and parse the data in the storage
  const fileData = await readFile(filePath, { encoding: "utf8" });
  const data = JSON.parse(fileData) as T;
  return data;
};

export const writeDataToDb = async <T>(model: DbModelType, data: T) => {
  const filePath = getDbPath(model);

  await writeFile(filePath, JSON.stringify(data));
};
