import { useContext, useEffect } from "react";
import useSWR from "swr";
import { AuthContext } from "../context/auth-context";
import { IUser } from "../interfaces/IUser";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export const useUser = (): IUser | null => {
  const { setUser } = useContext(AuthContext);
  const { data, error } = useSWR("/api/auth/get-user", fetcher);
  const user = data?.data as IUser;

  useEffect(() => {
    if (user) {
      setUser(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return error ? null : user;
};
