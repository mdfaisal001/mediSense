import React, { useState, useEffect, useRef } from 'react';
import { Moon, Send, AlertTriangle, Volume2, Mic, MicOff, RotateCcw, X, MessageSquare, Sun, Plus, Trash2, Edit3 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Add your API key here (keep it safe in real projects)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const ChatAnalyzer = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  useEffect(() => {
    const initialChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [{
        type: 'bot',
        content: "Hello! 👋 I'm your health assistant powered by AI. Feel free to describe your symptoms or ask any health-related question!",
        time: new Date().toLocaleTimeString(),
        sender: 'Medisense - Your Health Assistant',
        avatar: '🤖'
      }],
      timestamp: new Date()
    };
    
    setMessages(initialChat.messages);
    setChatHistory([initialChat]);
    setCurrentChatId(initialChat.id);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const simulateAIResponse = async (userMessage) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini error:", error);
    return "⚠️ Sorry, I'm having trouble connecting to Gemini right now. Please try again later.";
  }
};

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const newUserMessage = {
      type: 'user',
      content: text,
      time: new Date().toLocaleTimeString(),
      sender: 'You',
      avatar: '👤'
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput('');
    setIsTyping(true);


    // Get AI response
    const botResponse = await simulateAIResponse(text);

    const botMessage = {
      type: 'bot',
      content: botResponse,
      time: new Date().toLocaleTimeString(),
      sender: 'HealthBot',
      avatar: '🤖'
    };

    const finalMessages = [...updatedMessages, botMessage];
    setMessages(finalMessages);
    setIsTyping(false);

    // Update chat history with bot response
    const finalHistory = chatHistory.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages: finalMessages }
        : chat
    );
    setChatHistory(finalHistory);

    if (isSpeechEnabled) speak(botResponse);
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      }
    }
  };

  const speak = (text) => {
    if (isSpeechEnabled && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*•]/g, ''));
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };



  const loadChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setSidebarOpen(false);
    }
  };

  

  const formatMessageContent = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-blue-600 dark:text-blue-400">$1</strong>')
      .replace(/• (.*?)(?=\n|$)/g, '<div class="flex items-start gap-2 my-1"><span class="text-blue-500 mt-1">•</span><span>$1</span></div>')
      .replace(/🔍|💊|🚨|💡|🌡️|📞/g, '<span class="text-lg">$&</span>')
      .split('\n').map(line => line.trim()).filter(line => line).join('<br />');
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 transform transition-transform duration-300 z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r shadow-2xl`}>
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Chat History
            </h3>
            <button 
              onClick={() => setSidebarOpen(false)}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <X size={20} />
            </button>
          </div>
          
          
        </div>

        <div className="p-4 overflow-y-auto h-full pb-20">
          {chatHistory.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => loadChat(chat.id)}
              className={`group flex items-center justify-between p-3 rounded-xl mb-2 cursor-pointer transition-all ${
                chat.id === currentChatId 
                  ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${
                  chat.id === currentChatId 
                    ? 'text-blue-700 dark:text-blue-300' 
                    : isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {chat.title}
                </p>
                <p className={`text-sm truncate ${
                  chat.id === currentChatId 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500'
                }`}>
                  {chat.messages.length} messages
                </p>
              </div>
             
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <div className="flex flex-col h-screen max-w-6xl mx-auto">
          
          {/* Header */}
          <div className={`backdrop-blur-xl border-b shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-700' 
              : 'bg-white/90 border-gray-200'
          }`}>
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`p-2 rounded-xl transition-all ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <MessageSquare size={20} />
                </button>
                <div>
                  <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                    Health Assistant
                  </h1>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Powered by AI • Always consult professionals
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsSpeechEnabled(!isSpeechEnabled)} 
                  className={`p-2 rounded-xl transition-all ${
                    isSpeechEnabled 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                      : isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Voice Output"
                >
                  <Volume2 size={20} />
                </button>
                
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)} 
                  className={`p-2 rounded-xl transition-all ${
                    isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Toggle Theme"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="mx-6 mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-amber-600 dark:text-amber-400" size={20} />
              <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                For informational purposes only. Always consult healthcare professionals for medical advice.
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                    : 'bg-gradient-to-br from-green-500 to-blue-600'
                }`}>
                  {message.avatar}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-2xl ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-4 rounded-2xl shadow-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                      : isDarkMode 
                        ? 'bg-gray-800 border border-gray-700 text-gray-100'
                        : 'bg-white border border-gray-200 text-gray-800'
                  } ${message.type === 'user' ? 'rounded-tr-md' : 'rounded-tl-md'}`}>
                    
                    <div className={`text-xs mb-2 flex items-center gap-2 ${
                      message.type === 'user' 
                        ? 'text-blue-100 justify-end' 
                        : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span className="font-medium">{message.sender}</span>
                      <span>•</span>
                      <span>{message.time}</span>
                    </div>
                    
                    <div 
                      className={`prose max-w-none ${
                        message.type === 'user' 
                          ? 'text-white' 
                          : isDarkMode ? 'prose-invert' : ''
                      }`}
                      dangerouslySetInnerHTML={{ 
                        __html: message.type === 'bot' ? formatMessageContent(message.content) : message.content 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-lg">
                  🤖
                </div>
                <div className={`p-4 rounded-2xl rounded-tl-md shadow-lg ${
                  isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-6 border-t backdrop-blur-xl ${
            isDarkMode 
              ? 'bg-gray-800/90 border-gray-700' 
              : 'bg-white/90 border-gray-200'
          }`}>
            <div className="flex gap-3 items-end max-w-4xl mx-auto">
              
              {/* Text Input */}
              <div className="flex-1 relative">
                <textarea
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(userInput);
                    }
                  }}
                  placeholder="Describe your symptoms or ask a health question..."
                  className={`w-full px-4 py-3 pr-12 rounded-2xl resize-none max-h-32 min-h-[48px] transition-all ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white border border-gray-600 focus:border-blue-500' 
                      : 'bg-gray-50 text-gray-800 border border-gray-300 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  rows="1"
                />
                
                {userInput && (
                  <button 
                    onClick={() => setUserInput('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Voice Input Button */}
              <button
                onClick={toggleVoiceInput}
                className={`p-3 rounded-2xl transition-all ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage(userInput)}
                disabled={!userInput.trim()}
                className={`p-3 rounded-2xl transition-all ${
                  userInput.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                title="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ChatAnalyzer;