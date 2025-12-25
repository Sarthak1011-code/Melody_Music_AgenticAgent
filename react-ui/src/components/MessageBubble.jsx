import React from 'react';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ role, content }) => {
    const isUser = role === 'user';

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-blue-600' : 'bg-purple-600'}`}>
                    {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>

                <div className={`p-4 rounded-2xl ${isUser
                        ? 'bg-blue-600/20 border border-blue-500/30 text-blue-50 rounded-tr-none'
                        : 'bg-gray-800/80 border border-gray-700 text-gray-100 rounded-tl-none shadow-lg'
                    }`}>
                    <div className="prose prose-invert prose-sm max-w-none">
                        {/* Simple text rendering for now, could add markdown support if needed */}
                        <p className="whitespace-pre-wrap">{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
