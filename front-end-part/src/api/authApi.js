import { useEffect, useState } from "react";
import { useContext } from "react";
import request from "../utils/request";
import { UserContext, useUserContext } from "../contexts/UserContext";

const baseUrl = "http://localhost:3000/api";

export const useProfile = () => {
  const { userId, accessToken, userLoginHandler } = useUserContext();

  const fetchProfile = async () => {
    if (!userId || !accessToken) {
      console.warn("Skipping fetchProfile(): Missing userId or accessToken", {
        userId,
        accessToken,
      });
      return null;
    }

    try {
      const options = {
        headers: {
          "X-Authorization": accessToken,
        },
      };

      const profileData = await request.get(
        `${baseUrl}/users/profile/${userId}`,
        options
      );

      console.log("Fetched profile data:", profileData);

      if (!profileData || !profileData._id) {
        console.warn("Skipping userLoginHandler(): Missing _id", profileData);
        return;
      }

      userLoginHandler({ ...profileData, accessToken });

      return profileData;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      return null;
    }
  };

  return { fetchProfile };
};

export const useLogin = () => {
  const login = async (email, password) =>
    request.post(`${baseUrl}/login`, { email, password });

  return {
    login,
  };
};

export const useRegister = () => {
  const register = (
    username,
    email,
    phoneNumber,
    imageUrl,
    address,
    password
  ) =>
    request.post(`${baseUrl}/register`, {
      username,
      email,
      phoneNumber,
      imageUrl,
      address,
      password,
    });

  return {
    register,
  };
};

export const useLogout = () => {
  const { accessToken, userLogoutHandler } = useContext(UserContext);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const options = {
      headers: {
        "X-Authorization": accessToken,
      },
    };

    request.post(`${baseUrl}/logout`, null, options).then(userLogoutHandler);
  }, [accessToken, userLogoutHandler]);

  return {
    isLoggedOut: !!accessToken,
  };
};
