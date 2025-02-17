import { useState } from "react";
import "./Sections.css"; // Make sure this CSS file is created

function ExpandableSection({ title, items, renderItem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle expand state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="section">
      <div className="section__header">
        <h2 className="section__title">{title}</h2>
        <button
          className={`section__expand-btn ${isExpanded ? "expanded" : ""}`}
          onClick={toggleExpand}
        />
      </div>

      <ul className="section__list">
        {items
          .slice(0, isExpanded ? items.length : 3)
          .map((item, index) => renderItem(item, index))}
      </ul>
    </section>
  );
}

export default ExpandableSection;
