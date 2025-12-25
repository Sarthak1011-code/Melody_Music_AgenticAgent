import React from 'react';
import { Home, Search, Library, Plus, ArrowRight, Bot } from 'lucide-react';

const Sidebar = ({ currentView, onViewChange }) => {
    return (
        <div className="w-64 bg-black p-2 flex flex-col gap-2 h-full">
            {/* Top Section */}
            <div className="bg-[#121212] rounded-xl p-4 flex flex-col gap-4">
                <div
                    onClick={() => onViewChange('home')}
                    className={`flex items-center gap-4 cursor-pointer transition-colors ${currentView === 'home' || currentView === 'search' ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
                >
                    <Home size={24} />
                    <span className="font-bold">Home</span>
                </div>
                <div
                    onClick={() => onViewChange('search')}
                    className={`flex items-center gap-4 cursor-pointer transition-colors ${currentView === 'search' ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
                >
                    <Search size={24} />
                    <span className="font-bold">Search</span>
                </div>
            </div>

            {/* Melody AI Button (NEW) */}
            <div
                onClick={() => onViewChange('agent')}
                className={`bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-4 cursor-pointer border border-transparent transition-all ${currentView === 'agent' ? 'border-blue-500 shadow-lg shadow-blue-900/20' : 'hover:border-white/10'}`}
            >
                <div className="flex items-center gap-4 text-white">
                    <Bot size={24} className="text-blue-400" />
                    <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Melody AI</span>
                </div>
                <p className="text-xs text-blue-200/70 mt-2">Ask for mood-based suggestions</p>
            </div>

            {/* Library Section */}
            <div className="bg-[#121212] rounded-xl flex-1 p-2 flex flex-col">
                <div className="flex items-center justify-between p-2 text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                        <Library size={24} />
                        <span className="font-bold">Your Library</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Plus size={20} className="hover:bg-[#2a2a2a] rounded-full p-1 box-content" />
                        <ArrowRight size={20} className="hover:bg-[#2a2a2a] rounded-full p-1 box-content" />
                    </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 px-2 mt-2 overflow-x-auto no-scrollbar">
                    <span className="bg-[#2a2a2a] text-white text-sm px-3 py-1 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#3a3a3a]">Playlists</span>
                    <span className="bg-[#2a2a2a] text-white text-sm px-3 py-1 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#3a3a3a]">Artists</span>
                </div>

                {/* Playlist List (Mock) */}
                <div className="mt-4 px-2 space-y-4 overflow-y-auto flex-1 h-full scrollbar-thin scrollbar-thumb-[#4d4d4d] scrollbar-track-transparent">
                    {['Liked Songs', 'Daily Mix 1', 'Discover Weekly', 'Hindi Top 50', 'Lofi Beats', 'Gym Phonk'].map((playlist, i) => (
                        <div key={i} className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-blue-900 rounded flex-shrink-0 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">♫</span>
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <p className="text-white text-sm truncate group-hover:underline">{playlist}</p>
                                <p className="text-[#b3b3b3] text-xs truncate">Playlist • Sarthak</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
