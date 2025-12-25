import React from 'react';
import ChatWindow from './ChatWindow';
import InputArea from './InputArea';
import { Bot, Sparkles } from 'lucide-react';

const AgentView = ({ messages, isLoading, onSend }) => {
    return (
        <div className="flex-1 bg-gradient-to-b from-blue-900/20 to-[#121212] flex flex-col overflow-hidden relative">
            {/* Header */}
            <div className="h-16 flex items-center px-6 bg-[#121212]/50 backdrop-blur-md sticky top-0 z-10 border-b border-white/5">
                <Bot className="text-blue-400 mr-3" />
                <h2 className="text-white font-bold text-xl">Melody AI</h2>
                <div className="ml-auto bg-blue-500/10 text-blue-400 text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-blue-500/20">
                    <Sparkles size={12} />
                    AI Powered
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-hidden flex flex-col p-4 max-w-4xl w-full mx-auto">
                <ChatWindow messages={messages} isLoading={isLoading} />
                <InputArea onSend={onSend} disabled={isLoading} />
            </div>
        </div>
    );
};

export default AgentView;
