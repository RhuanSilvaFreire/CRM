import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import LeadsPage from './pages/LeadsPage';
import LeadsTablePage from './pages/LeadsTablePage';
import AutomationsPage from './pages/AutomationsPage';
import ConversationsPage from './pages/ConversationsPage';
import { FunnelProvider } from './contexts/FunnelContext';
import { ActiveFunnelsProvider } from './contexts/ActiveFunnelsContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <FunnelProvider>
      <ActiveFunnelsProvider>
        <div className="flex h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 md:p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<LeadsPage />} />
                <Route path="/leads-table" element={<LeadsTablePage />} />
                <Route path="/automations" element={<AutomationsPage />} />
                <Route path="/conversations" element={<ConversationsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </ActiveFunnelsProvider>
    </FunnelProvider>
  );
}

export default App;
