import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/request";

const baseUrl = "http://localhost:3000/api/products";

export const editPet = async (petId, updatedData, accessToken) => {
  try {
    const options = {
      headers: {
        "X-Authorization": accessToken,
      },
    };

    return await request.put(`${baseUrl}/${petId}/edit`, updatedData, options);
  } catch (error) {
    console.error("Error updating pet:", error);
    throw error;
  }
};

export const useWishlistPet = () => {
  const { accessToken } = useAuth();
  const wishlistPet = async (petId) => {
    const options = {
      headers: {
        "X-Authorization": accessToken,
      },
    };

    try {
      const response = await request.get(`${baseUrl}/${petId}/like`, options);
      return response;
    } catch (error) {
      console.error("❌ Error deleting pet:", error);
      throw error;
    }
  };

  return wishlistPet;
};

export const useDeletePet = () => {
  const { accessToken } = useAuth();

  const deletePet = async (petId) => {
    const options = {
      headers: {
        "X-Authorization": accessToken,
      },
    };

    try {
      const response = await request.delete(`${baseUrl}/${petId}`, options);
      return response;
    } catch (error) {
      console.error("❌ Error deleting pet:", error);
      throw error;
    }
  };

  return deletePet;
};

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

export const getPet = (petId) => {
  const { accessToken } = useAuth();
  const [pet, setPet] = useState({});

  useEffect(() => {
    const options = accessToken
      ? { headers: { "X-Authorization": accessToken } }
      : {};

    request.get(`${baseUrl}/${petId}`, options).then(setPet);
  }, [petId, accessToken]);

  return { pet };
};

export const getPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    request.get(baseUrl).then(setPets);
  }, []);

  return { pets };
};
