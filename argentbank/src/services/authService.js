const API_URL = "http://localhost:3001/api/v1/user/login";
const API_PROFILE = "http://localhost:3001/api/v1/user/profile";

export const loginUser = async (email, password) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Échec de la connexion");
  }

  return response.json();
};

export const getUserProfile = async (token) => {
  const response = await fetch(API_PROFILE, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      "Échec de la récupération des informations de l'utilisateur"
    );
  }

  return response.json();
};

// Vérification du token
export const verifyToken = async (token) => {
  try {
    const response = await fetch(API_PROFILE, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Token verification failed", error);
    return false;
  }
};
