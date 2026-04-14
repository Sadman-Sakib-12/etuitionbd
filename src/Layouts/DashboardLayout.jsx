import { useState } from 'react';
import { Outlet } from 'react-router';

import Sidebar from '../componet/Dashboard/Sidebar/Menu/Sidebar';
import DashboardNavbar from '../componet/Dashboard/DashboardNavbar';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Pass both state and setter to Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Pass only setter to Navbar to trigger the opening */}
        <DashboardNavbar setIsOpen={setIsOpen} />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;