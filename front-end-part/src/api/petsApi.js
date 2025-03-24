import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/request";

const baseUrl = "http://localhost:3000/api/products";

export const createPet = () => {
  const { accessToken } = useAuth();

  return async (petData) => {
    try {
      const options = {
        headers: {
          "X-Authorization": accessToken,
        },
      };

      const response = await request.post(baseUrl, petData, options);
      return response;
    } catch (error) {
      console.error("Error creating pet:", error);
      throw error;
    }
  };
};

export const getPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    request.get(baseUrl).then(setPets);
  }, []);

  return { pets };
};
