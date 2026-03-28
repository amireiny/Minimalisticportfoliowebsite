import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ProjectDetail } from './pages/ProjectDetail';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { useEffect, useState } from 'react';

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [transitionStage, location]);

  const isProjectPage = location.pathname.startsWith('/project/');
  const isContactPage = location.pathname === '/contact';

  return (
    <div
      style={{
        opacity: transitionStage === 'fadeIn' ? 1 : 0,
        transition: 'opacity 300ms ease-in-out',
      }}
    >
      {!isProjectPage && !isContactPage && <Navigation />}
      <Routes location={displayLocation}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}