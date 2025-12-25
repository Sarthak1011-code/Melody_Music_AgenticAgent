import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';

const InputArea = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative flex items-center bg-gray-900 rounded-xl border border-gray-700 focus-within:border-gray-600 transition-colors">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={disabled}
                    className="flex-1 bg-transparent p-4 outline-none text-white placeholder-gray-500 disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || disabled}
                    className="p-3 mr-2 text-gray-400 hover:text-white disabled:text-gray-600 transition-colors"
                >
                    <SendHorizontal size={20} />
                </button>
            </div>
        </form>
    );
};

export default InputArea;
