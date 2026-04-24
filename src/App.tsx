import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { initPostHog, captureEvent } from './utils/analytics';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CurrentAffairs from './pages/CurrentAffairs';
import StudyMaterials from './pages/StudyMaterials';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import CurrentAffairDetail from './pages/CurrentAffairDetail';
import BlogDetail from './pages/BlogDetail';
import PlanB from './pages/PlanB';
import Mind from './pages/Mind';
import MindDetail from './pages/MindDetail';
import SEODashboard from './pages/SEODashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import RevisionSeries from './pages/RevisionSeries';

// ScrollToTop component to reset scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Capture pageview on route change
    captureEvent('$pageview', {
      $current_url: window.location.href,
    });
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study-materials" element={<StudyMaterials />} />
          <Route path="/study-materials/:id" element={<ProductDetail />} />
          <Route path="/current-affairs" element={<CurrentAffairs />} />
          <Route path="/current-affairs/:id" element={<CurrentAffairDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/revision-series" element={<RevisionSeries />} />
          <Route path="/mind" element={<Mind />} />
          <Route path="/mind/:id" element={<MindDetail />} />
          <Route path="/plan-b" element={<PlanB />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/seo-dashboard" element={<SEODashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
