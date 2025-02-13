import { useState, useEffect, useContext, useRef } from "react";
import Loader from "../Loader/Loader";
import { fetchGoals, saveToGoal } from "../../utils/api";
import AppContext from "../../context/AppContext";
import GoalCard from "../GoalCard/GoalCard";
import SaveModal from "../SaveModal/SaveModal";
import "./Goals.css";

function Goals() {
  const { goals, setGoals, selectedGoal, setSelectedGoal, closeActiveModal } =
    useContext(AppContext);
  const [isGoalSectionVisible, setIsGoalSectionVisible] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const goalSectionRef = useRef(null);

  const handleSave = (goalId, goalAmount) => {
    saveToGoal(goalId, goalAmount);
    closeActiveModal();
  };
  // Open Save Modal to view current Modal And Add Ammount
  const openSaveModal = (goal) => {
    setSelectedGoal(goal);
  };

  // Goals Refresh
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

  // Use Intersection Observer to monitor the visibility of the goal section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsGoalSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the section is visible
    );

    if (goalSectionRef.current) {
      observer.observe(goalSectionRef.current);
    }

    return () => {
      if (goalSectionRef.current) {
        observer.unobserve(goalSectionRef.current);
      }
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <section ref={goalSectionRef} className="goals-section section">
      <h2 className="goals__title">Your Goals</h2>
      <ul className="goals__list">
        {goals.map((goal) => (
          <GoalCard
            key={goal._id}
            goal={goal}
            onSaveClick={() => openSaveModal(goal)}
          />
        ))}
      </ul>
      {selectedGoal ? (
        <SaveModal
          selectedGoal={selectedGoal}
          handleSave={handleSave}
          isVisible={isGoalSectionVisible}
        />
      ) : null}
    </section>
  );
}
export default Goals;
