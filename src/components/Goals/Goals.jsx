import "./Goals.css";

function Goals({ goals = [] }) {
  return (
    <section className="goals">
      <h2>Your Goals</h2>
      <ul className="goals__list">
        {goals.map((goal) => (
          <li key={goal.id} className="goal__item">
            <p className="goal__name">{goal.name}</p>
            <p className="goal__progress">
              Progress: {goal.current} / {goal.target}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Goals;
