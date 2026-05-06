import Hero from "../components/Hero";
import Ecosystem from "../components/Ecosystem";
import CTA from "../components/CTA";
import RecentHighlights from "../components/RecentHighlights";
import NotificationWidget from "../components/NotificationWidget";
import AnnouncementBar from "../components/AnnouncementBar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Hero />
      <RecentHighlights />
      <Ecosystem />
      <CTA />
      <NotificationWidget />
    </div>
  );
};

export default Home;
