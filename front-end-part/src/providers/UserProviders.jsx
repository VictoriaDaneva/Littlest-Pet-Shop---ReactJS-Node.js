import { UserContext } from "../contexts/UserContext";
import usePersistedState from "../hooks/usePersistedState";

export default function UserProvider({ children }) {
  const [authData, setAuthData] = usePersistedState("auth", {});

  const userLoginHandler = (resultData) => {
    if (!resultData || typeof resultData !== "object") {
      console.error("Error: Invalid resultData format!", resultData);
      return;
    }

    if (!("_id" in resultData)) {
      console.error(
        "Error: User ID (_id) is missing in login data!",
        resultData
      );
      return;
    }

    const formattedData = {
      ...resultData,
      userId: resultData._id.toString(),
    };

    setAuthData(formattedData);
  };

  const userLogoutHandler = () => {
    console.log("Logging out...");
    setAuthData({});
  };

  return (
    <UserContext.Provider
      value={{ ...authData, userLoginHandler, userLogoutHandler }}
    >
      {children}
    </UserContext.Provider>
  );
}
