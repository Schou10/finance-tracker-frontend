import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken, getToken } from "../../utils/token.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes.jsx";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditUserProfile from "../EditProfileModal/EditProfileModal";
import EditGoalModal from "../EditGoalModal/EditGoalModal.jsx";
import { baseUrl } from "../../utils/constants.js";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import AppContext from "../../context/AppContext";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import "./App.css";
import GoalModal from "../GoalModal/GoalModal.jsx";
import TransactionModal from "../TransactionModal/TransactionModal.jsx";

axios.defaults.baseURL = baseUrl;
// Interceptor to automatically include the Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

function App() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedGoal, setSelectedGoal] = useState({});
  const [currentUser, setUser] = useState({
    _id: "",
    name: "",
    avatar: "",
    email: "",
  });
  const [goals, setGoals] = useState([]);

  const navigate = useNavigate();

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
    setSelectedGoal({});
  }; // Close modals
  const handleGoalClick = () => setActiveModal("goal"); // Goal modal
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
      .finally(() => setIsLoading(false));
  };
  // handle Goal
  const handleGoal = (data) => {
    setIsLoading(true);
    api
      .createGoal(data)
      .then((newGoalData) => {
        setGoals([...goals, newGoalData]);
        closeActiveModal();
      })
      .catch(() => console.error)
      .finally(() => setIsLoading(false));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleEditGoalClick = (goal) => {
    setActiveModal("edit-goal");
    setSelectedGoal(goal);
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
      }}
    >
      <AppContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          isLoading,
          setUser,
          setActiveModal,
          handleCardClick,
          selectedCard,
          goals,
          setGoals,
          selectedGoal,
          setSelectedGoal,
          handleEditGoalClick,
        }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              activeModal={activeModal}
              newGoalClick={handleGoalClick}
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
            <GoalModal
              handleGoal={handleGoal}
              isOpen={activeModal}
              onClose={closeActiveModal}
            />
            <EditGoalModal isOpen={activeModal} onClose={closeActiveModal} />
            <TransactionModal isOpen={activeModal} onClose={closeActiveModal} />
          </div>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
