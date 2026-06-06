import { Work } from '../components/Work';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { DesktopHome } from '../components/DesktopHome';

export function HomePage() {
  return (
    <div>
      {/* Desktop split-screen layout */}
      <DesktopHome />

      {/* Mobile layout */}
      <div className="md:hidden">
        <Work />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
