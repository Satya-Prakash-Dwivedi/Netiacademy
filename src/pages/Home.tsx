import Hero from "../components/Hero";
import Ecosystem from "../components/Ecosystem";
import CTA from "../components/CTA";
import RecentHighlights from "../components/RecentHighlights";
import NotificationWidget from "../components/NotificationWidget";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Ecosystem />
      <RecentHighlights />
      <CTA />
      <NotificationWidget />
    </div>
  );
};

export default Home;
