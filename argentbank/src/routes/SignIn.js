import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  selectAuthError,
  selectIsAuthenticated,
} from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3001/api/v1/user/login";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Redirection si déjà authentifié
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  // Gestion du Remember Me
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
      }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de la connexion");
      }

      const data = await response.json();
      console.log("Data reçu de l'api", data);

      // Gestion du Remember Me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      }

      // Obtenir le token de la réponse
      const token = data.body.token;

      // Faire une requête supplémentaire pour obtenir les informations de l'utilisateur
      const userResponse = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userResponse.ok) {
        throw new Error(
          "Échec de la récupération des informations de l'utilisateur"
        );
      }

      const userData = await userResponse.json();
      console.log("Données utilisateur complètes", userData);

      // Mise à jour du state avec les données utilisateur
      dispatch(
        loginSuccess({
          firstName: userData.body.firstName,
          lastName: userData.body.lastName,
          email: userData.body.email,
          id: userData.body.id,
        })
      );

      // Reset du formulaire
      setFormData({ email: "", password: "" });

      // Navigation vers la page user
      navigate("/user");
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem("rememberedEmail");
    }
  };

  return (
    <>
      <Nav />
      <main className="mainSignIn">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
          {error && <div className="errorMessage">{error}</div>}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;
