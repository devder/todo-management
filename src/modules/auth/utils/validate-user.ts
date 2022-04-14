import { ErrorCode } from "app/lib/error-code";
import { DB } from "app/utils/db-connect";
import { AuthProps } from "../interfaces";
import { IUser } from "../interfaces/IUser";
import { Password } from "./password-util";

// ================== lookup user in DB ==================
export async function validateUser(authProps: AuthProps) {
  const { username, password } = authProps;
  // read users from db
  const usersData = await DB.extractDataFromDb<IUser[]>("auth");

  const existingUser = usersData.find(user => user.username === username);

  if (!existingUser) {
    throw new Error(ErrorCode.NotFound);
  }

  const passwordMatch = await Password.compare(existingUser.password!, password);
  if (!passwordMatch) {
    throw new Error(ErrorCode.NotFound);
  }

  return existingUser;
}
