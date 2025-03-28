import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/request";

const baseUrl = "http://localhost:3000/api/products";
const profileUrl = "http://localhost:3000/api/users/profile";

export const searchPets = async (query) => {
  try {
    const response = await fetch(
      `${baseUrl}/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useLatestThreePets = () => {
  const [latestPets, setLatestPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await request.get(baseUrl);
        const latestThree = response.slice(-3).reverse();
        setLatestPets(latestThree);
      } catch (error) {
        console.error("❌ Error fetching latest pets:", error);
      }
    };

    fetchPets();
  }, []);

  return { latestPets };
};

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

export const getWishlistPet = async (accessToken) => {
  if (!accessToken) {
    console.error("❌ Error: No access token provided.");
    throw new Error("No access token provided");
  }

  const options = {
    headers: {
      "X-Authorization": accessToken,
    },
  };

  try {
    const response = await request.get(`${profileUrl}/wishlist`, options);
    return response;
  } catch (error) {
    console.error("❌ Error fetching wishlist:", error);
    throw error;
  }
};

export const useUnsubscribePet = () => {
  const { accessToken } = useAuth();
  const unsubscribePet = async (petId) => {
    const options = {
      headers: {
        "X-Authorization": accessToken,
      },
    };

    try {
      const response = await request.get(
        `${baseUrl}/${petId}/like/unsub`,
        options
      );
      return response;
    } catch (error) {
      console.error("❌ Error unsubscribing from pet:", error);
      throw error;
    }
  };

  return unsubscribePet;
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
