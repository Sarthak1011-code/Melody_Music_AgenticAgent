import React from 'react';
import { Play, SkipBack, SkipForward, Repeat, Shuffle, Mic2, ListMusic, MonitorSpeaker, Volume2, Maximize2 } from 'lucide-react';

const PlayerBar = () => {
    return (
        <div className="h-24 bg-black border-t border-[#2a2a2a] px-4 flex items-center justify-between text-[#b3b3b3]">

            {/* Left: Current Song */}
            <div className="flex items-center gap-4 w-[30%]">
                <div className="w-14 h-14 bg-gray-800 rounded flex items-center justify-center text-white overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop" alt="Album Art" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-white text-sm hover:underline cursor-pointer">Mockingbird</span>
                    <span className="text-xs hover:underline cursor-pointer">Eminem</span>
                </div>
                <button className="hover:text-white">♡</button>
            </div>

            {/* Center: Controls */}
            <div className="flex flex-col items-center gap-2 w-[40%]">
                <div className="flex items-center gap-6">
                    <Shuffle size={16} className="cursor-pointer hover:text-white" />
                    <SkipBack size={20} className="cursor-pointer hover:text-white fill-current" />
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform text-black">
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                    </div>
                    <SkipForward size={20} className="cursor-pointer hover:text-white fill-current" />
                    <Repeat size={16} className="cursor-pointer hover:text-white" />
                </div>
                <div className="w-full max-w-md flex items-center gap-2 text-xs">
                    <span>2:14</span>
                    <div className="h-1 flex-1 bg-[#4d4d4d] rounded-full group cursor-pointer overflow-hidden">
                        <div className="h-full w-1/3 bg-white group-hover:bg-green-500 rounded-full"></div>
                    </div>
                    <span>4:11</span>
                </div>
            </div>

            {/* Right: Volume & Extras */}
            <div className="flex items-center justify-end gap-3 w-[30%]">
                <Mic2 size={16} className="cursor-pointer hover:text-white" />
                <ListMusic size={16} className="cursor-pointer hover:text-white" />
                <MonitorSpeaker size={16} className="cursor-pointer hover:text-white" />
                <div className="flex items-center gap-2 w-24">
                    <Volume2 size={16} />
                    <div className="h-1 flex-1 bg-[#4d4d4d] rounded-full cursor-pointer overflow-hidden">
                        <div className="h-full w-2/3 bg-white group-hover:bg-green-500 rounded-full"></div>
                    </div>
                </div>
                <Maximize2 size={16} className="cursor-pointer hover:text-white" />
            </div>
        </div>
    );
};

export default PlayerBar;
