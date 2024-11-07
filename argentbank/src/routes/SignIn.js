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
  initializeAuth,
} from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { loginUser, getUserProfile } from "../services/authService";

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

  //  Initialisation de la connexion
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Redirection si déjà authentifié
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

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
      // Login et récupération du token
      const loginResponse = await loginUser(formData.email, formData.password);
      const token = loginResponse.body.token;

      // Récupération du profil utilisateur avec le token
      const userResponse = await getUserProfile(token);

      // Dispatch des informations
      dispatch(
        loginSuccess({
          user: {
            firstName: userResponse.body.firstName,
            lastName: userResponse.body.lastName,
            userName: userResponse.body.userName,
            email: userResponse.body.email,
            id: userResponse.body.id,
          },
          token: token, // Ajout du token dans le payload
        })
      );

      // Gestion du Remember Me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      }

      // Reset du formulaire et navigation
      setFormData({ email: "", password: "" });
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
