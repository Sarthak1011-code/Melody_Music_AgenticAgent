import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Loader2 } from 'lucide-react';

const ChatWindow = ({ messages, isLoading }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {messages.map((msg, index) => (
                <MessageBubble key={index} role={msg.role} content={msg.content} />
            ))}
            {isLoading && (
                <div className="flex justify-start animate-pulse">
                    <div className="bg-gray-800 rounded-2xl rounded-tl-none p-4 flex items-center gap-2 text-gray-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatWindow;
