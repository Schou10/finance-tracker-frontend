import { useState, useEffect, useContext, useRef } from "react";
import Loader from "../Loader/Loader";
import { fetchGoals, saveToGoal } from "../../utils/api";
import AppContext from "../../context/AppContext";
import ExpandableSection from "../Sections/Section-Expandible";
import GoalCard from "../GoalCard/GoalCard";
import SaveModal from "../SaveModal/SaveModal";
import "./Goals.css";

function Goals() {
  const {
    goals,
    setGoals,
    selectedGoal,
    setSelectedGoal,
    closeActiveModal,
    setError,
  } = useContext(AppContext);
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
        setError(err.message || "Error fetching goals");
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
    <>
      {/* Expandable Goals List */}
      <ExpandableSection
        title="Your Goals"
        items={goals}
        renderItem={(goal, index) => <GoalCard key={index} goal={goal} />}
      />

      {/* Goal Modal */}
      <SaveModal
        selectedGoal={selectedGoal}
        handleSave={handleSave}
        isVisible={isGoalSectionVisible}
      />
    </>
  );
}
export default Goals;
