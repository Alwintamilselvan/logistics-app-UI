import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatbotProps {
  /** Callback function to send message to your ML model API */
  onSendMessage?: (message: string) => Promise<string>;
  /** Position of the chatbot button */
  position?: 'bottom-right' | 'bottom-left';
  /** Custom primary color for the chatbot */
  primaryColor?: string;
  /** Context type for different chatbot behaviors */
  context?: 'driver' | 'admin';
}

export function AIChatbot({ 
  onSendMessage,
  position = 'bottom-right',
  primaryColor = '#3b82f6',
  context = 'driver'
}: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: context === 'driver' 
        ? "Hi! I'm your AI assistant. I can help you with delivery instructions, navigation tips, or answer questions about your deliveries. How can I help you today?"
        : "Hello! I'm your AI assistant for logistics management. I can help you analyze delivery data, manage shipments, track driver performance, and answer operational questions. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      let botResponse = '';
      
      if (onSendMessage) {
        // Use the provided ML model API callback
        botResponse = await onSendMessage(inputValue);
      } else {
        // Mock response for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        botResponse = getMockResponse(inputValue, context);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const positionClasses = position === 'bottom-right' 
    ? 'right-4 sm:right-6' 
    : 'left-4 sm:left-6';

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-20 sm:bottom-24 ${positionClasses} w-[calc(100vw-2rem)] sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 overflow-hidden`}
        >
          {/* Header */}
          <div 
            className="p-4 bg-gradient-to-r text-white flex items-center justify-between"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${primaryColor}, ${adjustColor(primaryColor, -20)})` 
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-white/80">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-slate-500 to-slate-600' 
                    : 'bg-gradient-to-br from-blue-500 to-purple-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-sm'
                      : 'bg-white text-slate-800 rounded-tl-sm shadow-sm border border-slate-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-200">
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 sm:bottom-6 ${positionClasses} w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50`}
        style={{ 
          backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, ${adjustColor(primaryColor, -20)})` 
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  );
}

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Mock response function for demonstration
function getMockResponse(userMessage: string, context: 'driver' | 'admin'): string {
  const lowerMessage = userMessage.toLowerCase();

  if (context === 'driver') {
    if (lowerMessage.includes('delivery') || lowerMessage.includes('package')) {
      return "I can see your current deliveries in the system. Would you like me to provide navigation assistance, delivery instructions, or help you update a delivery status?";
    }
    if (lowerMessage.includes('navigation') || lowerMessage.includes('route')) {
      return "I can help optimize your route! Based on traffic conditions, I recommend visiting the deliveries in order of proximity. Would you like me to suggest the best route?";
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "I'm here to assist with:\n• Navigation and route optimization\n• Delivery instructions and special notes\n• Status updates and proof of delivery\n• Customer contact information\n\nWhat specific help do you need?";
    }
    return "I understand you're asking about your deliveries. Could you please provide more details so I can assist you better?";
  } else {
    if (lowerMessage.includes('driver') || lowerMessage.includes('performance')) {
      return "I can analyze driver performance metrics. Currently, all active drivers are performing well with an average completion rate of 94%. Would you like detailed analytics for a specific driver?";
    }
    if (lowerMessage.includes('shipment') || lowerMessage.includes('delivery')) {
      return "I can help you track shipments, analyze delivery patterns, and identify potential issues. What specific information are you looking for?";
    }
    if (lowerMessage.includes('analytics') || lowerMessage.includes('report')) {
      return "I can generate insights on delivery success rates, common delay patterns, and efficiency metrics. Would you like a summary report?";
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "I can assist with:\n• Real-time shipment tracking\n• Driver performance analytics\n• Delivery success rate analysis\n• Route optimization insights\n• Operational reporting\n\nHow can I help you today?";
    }
    return "I'm here to help with logistics management. Could you please specify what information or assistance you need?";
  }
}
