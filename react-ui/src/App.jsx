import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import HomeView from './components/HomeView';
import AgentView from './components/AgentView';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

function App() {
  const [view, setView] = useState('home'); // 'home', 'search', 'agent'
  const [messages, setMessages] = useState([
    { role: 'agent', content: 'Hi! I am Melody AI 🎵\nAsk me for song suggestions based on weather, mood, or your listening history!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text) => {
    const newMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await response.json();
      const agentResponse = { role: 'agent', content: data.response };
      setMessages(prev => [...prev, agentResponse]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'agent', content: 'Sorry, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans">
      <div className="flex flex-1 overflow-hidden p-2 gap-2">
        {/* Left Sidebar */}
        <Sidebar currentView={view} onViewChange={setView} />

        {/* Main Content Area */}
        <div className="flex-1 bg-[#121212] rounded-xl overflow-hidden flex flex-col relative">

          {/* Sticky Top Bar (Navigation) */}
          <div className="h-16 flex items-center justify-between px-6 bg-[#121212] sticky top-0 z-20">
            <div className="flex gap-4">
              <button className="bg-black/70 rounded-full p-1 text-[#b3b3b3] hover:text-white" onClick={() => setView('home')}>
                <ChevronLeft size={24} />
              </button>
              <button className="bg-black/70 rounded-full p-1 text-[#b3b3b3] hover:text-white">
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-white text-black font-bold text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform">Explore Premium</button>
              <div className="flex items-center gap-1 text-[#b3b3b3] hover:text-white font-bold text-sm cursor-pointer">
                <div className="bg-[#535353] p-1 rounded-full">
                  <User size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Conditional View Rendering */}
          {view === 'home' && <HomeView />}
          {view === 'search' && <div className="flex-1 flex items-center justify-center text-[#b3b3b3]">Search Page (Mock)</div>}
          {view === 'agent' && (
            <AgentView
              messages={messages}
              isLoading={isLoading}
              onSend={sendMessage}
            />
          )}

        </div>
      </div>

      {/* Bottom Player Bar */}
      <PlayerBar />
    </div>
  );
}

export default App;
