import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import WelcomeSection from "../WelcomeSection/WelcomeSection";
import FeaturesOverview from "../FeatureOverview/FeaturesOverview";
import DashboardOverview from "../DashboardOverview/DashBoardOverview";
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
