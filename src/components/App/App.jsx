import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import GoalModal from "../GoalModal/GoalModal.jsx";
import TransactionModal from "../TransactionModal/TransactionModal.jsx";
import Notification from "../Notification/Notification.jsx";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import AppContext from "../../context/AppContext";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import * as plaid from "../../utils/plaidApi";
import "./App.css";

function App() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const noGoalSelection = {
    createdAt: "",
    goalData: {
      name: "",
      description: "",
      end_date: "",
      amount: 0,
      currentAmount: 0,
    },
    itemId: "",
    userId: "",
  };
  const [selectedGoal, setSelectedGoal] = useState(noGoalSelection);

  const [currentUser, setUser] = useState({
    _id: "",
    name: "",
    avatar: "",
    email: "",
  });
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
    setSelectedGoal(noGoalSelection);
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
      return setErorr("Email and Password are required");
    }
    setIsLoading(true);
    auth
      .login({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          return auth.getUser(data);
        }
      })
      .then((user) => {
        setUser(user);
        navigate("/profile");
        closeActiveModal();
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setError(err.message || "Incorrect Username and/or Password");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Registartion for new users
  const handleRegistration = ({ email, password, name, avatar }) => {
    if (email) {
      setIsLoading(true);
      auth
        .register({ email, password, name, avatar })
        .then(() => setActiveModal("sign in")) // Sends users to the login modal to login to their new account
        .catch(() =>
          setError(err.message || "Registration Failed Email is already taken")
        )
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
      .catch((err) => setError(err.message || "Failed to update User"))
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
      .catch((err) => setError(err.message || "Failed to create new goal"))
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

  function addComma(number) {
    const numString = number.toString();
    const parts = numString.split(".");
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? "." + parts[1] : "";

    if (integerPart.length > 3) {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return integerPart + decimalPart;
  }

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
        setIsLoggedIn(true);
        setUser(user);
        navigate("/profile");
      })
      .catch((err) => setError(err.message));
  }, []);

  // Plaid Create Link Token for user
  useEffect(() => {
    if (currentUser._id) {
      async function fetchPlaidToken() {
        plaid
          .create_link_token(currentUser._id)
          .then((response) => {
            setLinkToken(response);
          })
          .catch((err) => setError(err.message));
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
          noGoalSelection,
          closeActiveModal,
          activeModal,
          setError,
          addComma,
        }}
      >
        <div className="app">
          <div className="app__content">
            {error && (
              <Notification message={error} onClose={() => setError(null)} />
            )}
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
              switchModal={handleSwitchLogin_SignUp}
            />
            <RegisterModal
              handleRegistration={handleRegistration}
              isOpen={activeModal}
              switchModal={handleSwitchLogin_SignUp}
            />
            <EditUserProfile
              isOpen={activeModal}
              updateUser={handleUpdateUser}
            />
            <GoalModal handleGoal={handleGoal} isOpen={activeModal} />
            <EditGoalModal isOpen={activeModal} onClose={closeActiveModal} />
            <TransactionModal isOpen={activeModal} onClose={closeActiveModal} />
          </div>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default App;
