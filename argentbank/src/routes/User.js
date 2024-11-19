import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectToken,
  updateUserSuccess,
  updateUserFailure,
} from "../features/auth/authSlice";
import { updateUserProfile } from "../services/authService";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import BankAccounts from "../components/BankAccount";

function User() {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await updateUserProfile(token, { userName });
      dispatch(updateUserSuccess(response.body));
      setIsEditing(false);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setError(error.message);
    }
  };

  const handleEdit = () => {
    setUserName(user.userName);
    setIsEditing(true);
  };

  useEffect(() => {
    // Redirection vers la page de connexion si non authentifié
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="mainUser">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {user ? `${user.userName}!` : "Guest"}
          </h1>
          {!isEditing ? (
            <button className="edit-button" onClick={handleEdit}>
              Edit Name
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="input-group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="edit-input"
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="button-group">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <BankAccounts />
      </main>
      <Footer />
    </>
  );
}

export default User;
