
import { useState } from 'react';
import { MainSidebar } from './MainSidebar';
import { SecondarySidebar } from './SecondarySidebar';

export const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('dms');

  return (
    <div className="flex">
      <MainSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <SecondarySidebar activeSection={activeSection} />
    </div>
  );
};
