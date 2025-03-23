import { createContext, useContext } from "react";

export const UserContext = createContext({
  _id: "",
  userId: "",
  imageUrl: "",
  email: "",
  username: "",
  phoneNumber: "",
  address: "",
  accessToken: "",
  userLoginHandler: () => null,
  userLogoutHandler: () => null,
});

export function useUserContext() {
  const data = useContext(UserContext);

  return data;
}
