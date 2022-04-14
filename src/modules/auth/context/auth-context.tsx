import { fetcher } from "app/utils/fetcher";
import { AuthActionType, AuthProps } from "modules/auth/interfaces";
import { authReducer } from "modules/auth/reducers/auth-reducer";
import { createContext, useReducer } from "react";
import { IUser } from "../interfaces/IUser";

const initialState: IUser | null = null;

type InitialStateType = {
  user: IUser | null;
  setUser: (user: IUser) => Promise<void>;
  signUp: (authProps: AuthProps) => Promise<{ status?: boolean; message?: string }>;
  signIn: (authProps: AuthProps) => Promise<{ status?: boolean; message?: string }>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<InitialStateType>({
  user: initialState,
  setUser: () => new Promise<void>((_, __) => {}),
  signUp: () => new Promise<{}>((_, __) => {}),
  signIn: () => new Promise<{}>((_, __) => {}),
  signOut: () => new Promise<void>((_, __) => {}),
});

interface AuthProviderProps {
  children: React.ReactNode;
  value: IUser;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, initialState);

  const setUser = async (user: IUser) => {
    dispatch({ type: AuthActionType.AUTHENTICATE, payload: user });
  };

  const signIn = async (authProps: AuthProps) => {
    try {
      const { data, status, message } = await fetcher<IUser>("/api/auth/sign-in", "POST", { authProps });

      if (status) {
        dispatch({ type: AuthActionType.AUTHENTICATE, payload: data });
      }
      return { status, message };
    } catch (error) {
      console.error(error);
      return { status: false, message: "Something went wrong" };
    }
  };

  const signUp = async (authProps: AuthProps) => {
    try {
      const { data, status, message } = await fetcher<IUser>("/api/auth/sign-up", "POST", { authProps });

      if (status) {
        dispatch({ type: AuthActionType.AUTHENTICATE, payload: data });
      }
      return { status, message };
    } catch (error) {
      console.error(error);
      return { status: false, message: "Something went wrong" };
    }
  };

  const signOut = async () => {
    try {
      const { status } = await fetcher("/api/auth/sign-out");

      if (status) {
        dispatch({ type: AuthActionType.SIGN_OUT, payload: null });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <AuthContext.Provider value={{ user, setUser, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
};
