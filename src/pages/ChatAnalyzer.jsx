import React, { useState } from 'react';
import { Moon, Settings, User, Send } from 'lucide-react';

const ChatAnalyzer = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! How can I assist you?',
      time: '02:22 AM',
      sender: 'slothGPT'
    }
  ]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = () => {
    if (userInput.trim() === '') return;
    
    const newMessage = {
      type: 'user',
      content: userInput,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      sender: 'You'
    };
    
    setMessages([...messages, newMessage]);
    setUserInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">slothGPT 7.0</h2>
          <div className="flex gap-3">
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <Moon size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <Settings size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 bg-white">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col mb-4 ${
                message.type === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{message.sender}</span>
                  <span className="text-xs opacity-70">{message.time}</span>
                </div>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message slothGPT..."
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAnalyzer;