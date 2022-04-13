import { IUser } from "./IUser";

export enum AuthActionType {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

export interface AuthAction {
  type: AuthActionType;
  payload: IUser;
}

export interface AuthProps {
  username: string;
  password: string;
}
