import { createContext, useState, useEffect } from 'react';
import { fetchGoals } from '../utils/api';

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const refreshGoals = async () => {
    try {
      const fetchedGoals = await fetchGoals(); // Fetch goals from the backend
      setGoals(fetchedGoals);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  const addGoal = async (goalData) => {
    try {
      await createGoal(goalData);
      await refreshGoals(); // Update state after adding a goal
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  useEffect(() => {
    refreshGoals();
  }, []);

  return (
    <GoalContext.Provider value={{ goals, addGoal }}>
      {children}
    </GoalContext.Provider>
  );
};