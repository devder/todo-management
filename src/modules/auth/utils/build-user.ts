import { ErrorCode } from "app/lib/error-code";
import { DB } from "app/utils/db-connect";
import { v4 as uuidv4 } from "uuid";
import { AuthProps } from "../interfaces";
import { IUser } from "../interfaces/IUser";
import { Password } from "./password-util";

export const buildUser = async (authProps: AuthProps) => {
  const { username, password } = authProps;

  // read users from db
  const usersData = await DB.extractDataFromDb<IUser[]>("auth");

  const existingUser = usersData.find(user => user.username === username);

  if (existingUser) {
    throw new Error(ErrorCode.AlreadyExists);
  }

  const hashedPassword = await Password.toHash(password);

  const newUser: IUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  usersData.push(newUser);
  await DB.writeDataToDb("auth", usersData);

  delete newUser.password;
  return newUser;
};
