import { useContext, useEffect } from "react";
import useSWR from "swr";
import { AuthContext } from "../context/auth-context";
import { IUser } from "../interfaces/IUser";

const customSWRfetcher = (url: string) => fetch(url).then(r => r.json());

export const useUser = () => {
  const { setUser, clearUser } = useContext(AuthContext);
  const { data } = useSWR("/api/auth/get-user", customSWRfetcher);
  const user = data?.data as IUser;

  const isLoading = !data;

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return [user, isLoading];
};
