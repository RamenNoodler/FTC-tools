import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Box, PieChart, PenTool, MessageSquare, Monitor } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Simulator', path: '/', icon: <Monitor size={20} /> },
    { name: 'Inventory', path: '/inventory', icon: <Box size={20} /> },
    { name: 'Match Scouting', path: '/scouting', icon: <Layout size={20} /> },
    { name: 'AI Performance', path: '/analytics', icon: <PieChart size={20} /> },
    { name: 'AI Docs', path: '/docs', icon: <PenTool size={20} /> },
    { name: 'Chat Room', path: '/chat', icon: <MessageSquare size={20} /> },
  ];

  return (
    <nav className="bg-slate-900 text-white w-64 min-h-screen p-4 flex flex-col shadow-xl">
      <div className="text-2xl font-bold mb-10 px-2 flex items-center gap-2">
        <div className="bg-blue-600 p-1 rounded">🤖</div>
        <span>RoboHub</span>
      </div>
      <div className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-slate-800'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      <div className="mt-auto p-2 text-xs text-slate-500 text-center">
        v1.0.0 Stable Build
      </div>
    </nav>
  );
};

export default Navigation;
