import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import WelcomeSection from "../WelcomeSection/WelcomeSection";
import FeaturesOverview from "../FeaturesOverview/FeaturesOverview";
import DashboardOverview from "../DashboardOverview/DashboardOverview";
import "./Main.css";

function Main({}) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <main className="main">
      {isLoggedIn ? (
        <>
          <DashboardOverview />
        </>
      ) : (
        <>
          <WelcomeSection />
          <FeaturesOverview />
        </>
      )}
    </main>
  );
}
export default Main;
