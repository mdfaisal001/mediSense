import React, { useState, useEffect, useRef } from 'react';
import { Moon, Send, AlertTriangle, Volume2, Mic, MicOff, RotateCcw, X } from 'lucide-react';
import Fuse from 'fuse.js';
import symptomsData from './SymptomsData';

const symptomsList = Object.keys(symptomsData);

const fuse = new Fuse(symptomsList, {
  includeScore: true,
  threshold: 0.6,
  ignoreLocation: true,
  minMatchCharLength: 1,
  distance: 100
});

// Added conversation patterns from code 2
const conversationPatterns = {
  greetings: {
    patterns: [
      /\b(hi|hello|hey|good morning|good afternoon|good evening|morning|evening)\b/i,
      /\b(how are you|how r u|how's it going|what's up|wassup|sup)\b/i,
      /\b(thanks|thank you|thx|ty)\b/i,
      /\b(bye|goodbye|see you|cya)\b/i
    ],
    responses: {
      greet: [
        "Hello! 👋 How can I help you today?",
        "Hi there! 😊 How are you feeling?",
        "Hey! What brings you here today?"
      ],
      howAreYou: [
        "I'm doing well, thank you! How are you feeling today?",
        "I'm here to help! What can I do for you?",
        "Thanks for asking! How can I assist you today?"
      ],
      thanks: [
        "You're welcome! 🌟 Is there anything else you need help with?",
        "Happy to help! Let me know if you need anything else.",
        "Anytime! Take care of yourself! 😊"
      ],
      goodbye: [
        "Take care! 👋 Don't hesitate to come back if you need more help.",
        "Goodbye! Stay healthy! 👋",
        "See you later! Take good care of yourself! 🌟"
      ]
    }
  },
  commonPhrases: {
    patterns: {
      "not feeling well": ["headache", "fever", "fatigue"],
      "under the weather": ["fever", "cold"],
      "feeling blue": ["fatigue", "depression"],
      "stomach acting up": ["stomach pain", "nausea"],
      "cant sleep": ["insomnia"],
      "feeling down": ["depression", "fatigue"],
      "head is killing me": ["headache"],
      "stuffed up": ["runny nose", "cold"],
      "feeling sick": ["nausea", "fever"],
      "everything hurts": ["joint pain", "fatigue"]
    }
  }
};

const ChatAnalyzer = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Added useEffect for speech recognition initialization from code 2
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const initializeSpeechRecognition = () => {
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setUserInput(transcript);
          handleSendMessage(transcript);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      };

      initializeSpeechRecognition();
    }
  }, []);

  useEffect(() => {
    const welcomeMessage = {
      type: 'bot',
      content: "Hello! 👋 I'm your health assistant. I can help you understand your symptoms, but remember I'm not a replacement for professional medical advice. How can I help you today?",
      time: new Date().toLocaleTimeString(),
      sender: 'HealthBot'
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Added handleGreeting function from code 2
  const handleGreeting = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (conversationPatterns.greetings.patterns[0].test(lowerInput)) {
      return conversationPatterns.greetings.responses.greet[Math.floor(Math.random() * conversationPatterns.greetings.responses.greet.length)];
    }
    if (conversationPatterns.greetings.patterns[1].test(lowerInput)) {
      return conversationPatterns.greetings.responses.howAreYou[Math.floor(Math.random() * conversationPatterns.greetings.responses.howAreYou.length)];
    }
    if (conversationPatterns.greetings.patterns[2].test(lowerInput)) {
      return conversationPatterns.greetings.responses.thanks[Math.floor(Math.random() * conversationPatterns.greetings.responses.thanks.length)];
    }
    if (conversationPatterns.greetings.patterns[3].test(lowerInput)) {
      return conversationPatterns.greetings.responses.goodbye[Math.floor(Math.random() * conversationPatterns.greetings.responses.goodbye.length)];
    }
    return null;
  };

  // Added getBotResponse function from code 2
  const getBotResponse = (input) => {
    // Check for greetings first
    const greetingResponse = handleGreeting(input);
    if (greetingResponse) return greetingResponse;

    // Check common phrases
    const lowerInput = input.toLowerCase();
    for (const [phrase, symptoms] of Object.entries(conversationPatterns.commonPhrases.patterns)) {
      if (lowerInput.includes(phrase)) {
        const responses = symptoms.map(symptom => {
          const { description, possibleCauses } = symptomsData[symptom];
          return `Regarding ${symptom}: ${description}\nPossible causes: ${possibleCauses.join(', ')}`;
        });
        return responses.join('\n\n');
      }
    }

    // Check for specific symptoms
    const searchResults = fuse.search(input);
    if (searchResults.length > 0 && searchResults[0].score <= 0.6) {
      const symptom = searchResults[0].item;
      const { description, possibleCauses } = symptomsData[symptom];
      return `Based on your description, it sounds like you're experiencing ${symptom}. ${description}\n\nPossible causes include: ${possibleCauses.join(', ')}.\n\nReminder: Please consult a healthcare professional for proper diagnosis and treatment.`;
    }

    return "I'm not quite sure what symptoms you're describing. Could you please provide more details? Try describing your symptoms differently or use common terms.";
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    
    // Show suggestions dropdown when typing
    if (value.length >= 1) {
      const results = fuse.search(value).slice(0, 5);
      setSuggestions(results.map(result => result.item));
      setSuggestionsVisible(true);
    } else {
      setSuggestions([]);
      setSuggestionsVisible(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
    setSuggestionsVisible(false);
    setSuggestions([]);
  };

  const clearChat = () => {
    setMessages([{
      type: 'bot',
      content: "Hello! 👋 I'm your health assistant. I can help you understand your symptoms, but remember I'm not a replacement for professional medical advice. How can I help you today?",
      time: new Date().toLocaleTimeString(),
      sender: 'HealthBot'
    }]);
    setUserInput('');
    setSuggestions([]);
    setSuggestionsVisible(false);
  };

  const checkSpelling = (text) => {
    const words = text.toLowerCase().split(' ');
    const potentialSymptoms = words.filter(word => word.length > 3);
    
    let correctionMessage = '';
    for (const word of potentialSymptoms) {
      const results = fuse.search(word);
      if (results.length > 0 && results[0].score > 0.3 && results[0].score < 0.6) {
        correctionMessage += `Did you mean "${results[0].item}" instead of "${word}"? `;
      }
    }
    
    return correctionMessage;
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const newUserMessage = {
      type: 'user',
      content: text,
      time: new Date().toLocaleTimeString(),
      sender: 'You'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setSuggestions([]);
    setSuggestionsVisible(false);
    setIsTyping(true);

    // Check for spelling mistakes
    const spellCheckMessage = checkSpelling(text);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let botResponse = getBotResponse(text);
    
    // Add spelling suggestion if needed
    if (spellCheckMessage) {
      botResponse = spellCheckMessage + "\n\n" + botResponse;
    }

    const botMessage = {
      type: 'bot',
      content: botResponse,
      time: new Date().toLocaleTimeString(),
      sender: 'HealthBot'
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);

    if (isSpeechEnabled) {
      speak(botResponse);
    }
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

  // Added speak function from code 2
  const speak = (text) => {
    if (isSpeechEnabled && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-[#2A3D66]'}`}>
      <div className={`w-full max-w-2xl rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className={`px-6 py-3 flex justify-between items-center ${isDarkMode ? 'bg-gray-700' : 'bg-[#6F7FB7]'}`}>
          <h2 className="text-2xl font-bold text-white">Health Assistant</h2>
          <div className="flex gap-3">
            <button 
              onClick={clearChat}
              className="text-white hover:text-gray-200 transition-colors"
              title="Clear chat"
            >
              <RotateCcw size={20} />
            </button>
            <button 
              onClick={() => setIsSpeechEnabled(!isSpeechEnabled)} 
              className={`text-white transition-colors ${isSpeechEnabled ? 'text-green-400' : ''}`}
              title={isSpeechEnabled ? "Voice output enabled" : "Voice output disabled"}
            >
              <Volume2 size={20} />
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-white hover:text-gray-200 transition-colors"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Moon size={20} />
            </button>
          </div>
        </div>

        {/* Warning banner */}
        <div className="px-6 py-2 bg-yellow-100 text-yellow-800 text-sm flex items-center gap-2">
          <AlertTriangle size={16} />
          <p>For informational purposes only. Always consult healthcare professionals for medical advice.</p>
        </div>

        {/* Messages section */}
        <div className="h-96 overflow-y-auto p-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-lg px-4 py-2 ${message.type === 'user' ? 'bg-blue-500' : 'bg-gray-200'} ${message.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                <div className="text-sm mb-1">{message.sender} • {message.time}</div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="animate-pulse">Typing...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Updated Input area */}
        <div className={`p-4 border-t ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
          <div className="relative">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <div className="relative">
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(userInput)}
                    placeholder="Describe your symptoms or ask a health question..."
                    className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-white'}`}
                  />
                  {userInput && (
                    <button
                      onClick={() => {
                        setUserInput('');
                        setSuggestionsVisible(false);
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                {suggestionsVisible && suggestions.length > 0 && (
                  <div className={`absolute w-full mt-1 rounded-lg shadow-lg z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`px-4 py-2 cursor-pointer ${
                          isDarkMode 
                            ? 'hover:bg-gray-600 text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={toggleVoiceInput}
                className={`p-2 rounded-lg text-white transition-colors ${
                  isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
                title={isListening ? "Stop voice input" : "Start voice input"}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <button
                onClick={() => handleSendMessage(userInput)}
                className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                title="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAnalyzer;