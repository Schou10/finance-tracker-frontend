import { useState, useEffect, useCallback } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import { setToken, getToken } from "../../utils/token.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute.jsx";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditUserProfile from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AppConetext from "../../contexts/AppContext";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import "./App.css";
import { baseUrl } from "../../utils/constants.js";

axios.defaults.baseURL = baseUrl;

function App() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [accessToken, setAccessToken] = useState();
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setUser] = useState({
    _id: "",
    name: "",
    avatar: "",
    email: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const closeActiveModal = () => setActiveModal(""); // Close modals
  const handleNewTransactionClick = () => setActiveModal("transaction"); // Transaction modal
  const handleChangeProfileClick = () => setActiveModal("edit-profile"); // Profile Change Data Modal

  const handleSwitchLogin_SignUp = (e) => {
    if (activeModal == "") {
      setActiveModal(`${e.target.textContent.toLowerCase()}`);
    } else {
      if (activeModal == "sign up") {
        setActiveModal("login");
      } else {
        setActiveModal("sign up");
      }
    }
  };

  // Handle Login for signed up users
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    setIsLoading(true);
    auth
      .login({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          auth
            .getUser(data)
            .then((user) => {
              setUser(user);
            })
            .finally(() => {
              setIsLoading(false);
              setIsLoggedIn(true);
              navigate("/profile");
              closeActiveModal();
            });
        }
      })
      .catch(console.error);
  };

  // Registartion for new users
  const handleRegistration = ({ email, password, name, avatar }) => {
    if (email) {
      setIsLoading(true);
      auth
        .register({ email, password, name, avatar })
        .then(() => setActiveModal("sign in")) // Sends users to the login modal to login to their new account
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  // handle Update User info
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .updateUser(data)
      .then((updatedUser) => {
        setUserData(updatedUser);
        closeActiveModal();
      })
      .catch(() => console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Use Effects
  // Get User Info from Token for auto login
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth
      .getUser({ token: jwt })
      .then((user) => {
        // If the response is successful, log the user in, save their
        // data to state, and navigate them to /ducks.
        setIsLoggedIn(true);
        setUser(user);
        navigate("/profile");
      })
      .catch(console.error);
  }, []);

  // Plaid
  useEffect(() => {
    if (currentUser._id) {
      async function fetchPlaidToken() {
        const response = await axios.post("/create_link_token", {
          clientUserId: currentUser._id,
        });
        setLinkToken(response.data.link_token);
      }
      fetchPlaidToken();
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        linkToken,
        publicToken,
        setPublicToken,
        accessToken,
        setAccessToken,
      }}
    >
      <AppConetext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          isLoading,
          setUser,
        }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              activeModal={activeModal}
              newTransactionClick={handleNewTransactionClick}
              handleRegisterClick={handleSwitchLogin_SignUp}
              handleLoginClick={handleSwitchLogin_SignUp}
            />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onChangeProfileClick={handleChangeProfileClick}
                      linkToken={linkToken}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
            <Footer />
            <LoginModal
              handleLogin={handleLogin}
              isOpen={activeModal}
              onClose={closeActiveModal}
              switchModal={handleSwitchLogin_SignUp}
            />
            <RegisterModal
              handleRegistration={handleRegistration}
              isOpen={activeModal}
              onClose={closeActiveModal}
              switchModal={handleSwitchLogin_SignUp}
            />
            <EditUserProfile
              isOpen={activeModal}
              onClose={closeActiveModal}
              updateUser={handleUpdateUser}
            />
          </div>
        </div>
      </AppConetext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
