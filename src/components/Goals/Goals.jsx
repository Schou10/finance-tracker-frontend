import { useState, useEffect, useContext } from "react";
import Loader from "../Loader/Loader";
import { fetchGoals } from "../../utils/api";
import AppContext from "../../context/AppContext";
import GoalCard from "../GoalCard/GoalCard";
import "./Goals.css";

function Goals() {
  const { goals, setGoals } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);

  // Goals
  useEffect(() => {
    const refreshGoals = async () => {
      try {
        const fetchedGoals = await fetchGoals(); // Fetch goals from the backend
        setGoals(fetchedGoals);
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
      setLoading(false);
    };
    refreshGoals();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <section className="goals-section section">
      <h2>Your Goals</h2>
      <ul className="goals__list">
        {goals.map((goal) => (
          <GoalCard goal={goal} />
        ))}
      </ul>
    </section>
  );
}
export default Goals;
