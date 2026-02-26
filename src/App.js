import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Simulator from './features/simulator/Simulator';
import Inventory from './features/inventory/Inventory';
import Scouting from './features/scouting/Scouting';
import AIAnalytics from './features/analytics/AIAnalytics';
import AIDocumentEditor from './features/editor/AIDocumentEditor';
import TeamChat from './features/chat/TeamChat';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-900 font-sans text-slate-900 antialiased">
        <Navigation />
        <main className="flex-1 flex overflow-hidden">
          <Routes>
            <Route path="/" element={<Simulator />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/scouting" element={<Scouting />} />
            <Route path="/analytics" element={<AIAnalytics />} />
            <Route path="/docs" element={<AIDocumentEditor />} />
            <Route path="/chat" element={<TeamChat />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
