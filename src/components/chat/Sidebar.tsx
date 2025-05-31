
import { useState } from 'react';
import { MainSidebar } from './MainSidebar';
import { SecondarySidebar } from './SecondarySidebar';

export const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="flex">
      <MainSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      {(activeSection === 'dms' || activeSection === 'home') && (
        <SecondarySidebar activeSection={activeSection} />
      )}
    </div>
  );
};
