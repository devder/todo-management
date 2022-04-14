import { IUser } from "./IUser";

export enum AuthActionType {
  AUTHENTICATE = "AUTHENTICATE",
  SIGN_OUT = "SIGN_OUT",
}

export interface AuthAction {
  type: AuthActionType;
  payload: IUser | null;
}

export interface AuthProps {
  username: string;
  password: string;
}
