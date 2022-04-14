import { AuthAction, AuthActionType } from "modules/auth/interfaces";
import { IUser } from "../interfaces/IUser";

export const authReducer = (state: IUser | null, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.AUTHENTICATE:
      return action.payload;
    case AuthActionType.SIGN_OUT:
      return action.payload;
    default:
      return state;
  }
};
