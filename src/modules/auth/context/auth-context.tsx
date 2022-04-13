import { fetcher } from "app/utils/fetcher";
import { AuthActionType, AuthProps } from "modules/auth/interfaces";
import { authReducer } from "modules/auth/reducers/auth-reducer";
import { createContext, useReducer } from "react";
import { IUser } from "../interfaces/IUser";

const initialState: IUser | null = null;

type InitialStateType = {
  user: IUser | null;
  signUp: (authProps: AuthProps) => Promise<void>;
  signIn: (authProps: AuthProps) => Promise<void>;
  signOut: () => Promise<void>;
};

export const UserContext = createContext<InitialStateType>({
  user: initialState,
  signUp: () => new Promise<void>((_, __) => {}),
  signIn: () => new Promise<void>((_, __) => {}),
  signOut: () => new Promise<void>((_, __) => {}),
});

interface TodosProviderProps {
  children: React.ReactNode;
  value: IUser;
}
export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, initialState);

  const signIn = async (authProps: AuthProps) => {
    try {
      const { data, status } = await fetcher<IUser>("/api/auth/sign-in", "POST", { authProps });

      if (status) {
        dispatch({ type: AuthActionType.SIGN_IN, payload: data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (authProps: AuthProps) => {
    try {
      const { data, status } = await fetcher<IUser>("/api/auth/sign-up", "POST", { authProps });

      if (status) {
        // dispatch({ type: AuthActionType.SIGN_IN, payload: [data] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      const { data, status } = await fetcher<IUser>("/api/auth/sign-up", "POST");

      if (status) {
        // dispatch({ type: AuthActionType.SIGN_IN, payload: [data] });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <UserContext.Provider value={{ user, signIn, signUp, signOut }}>{children}</UserContext.Provider>;
};
