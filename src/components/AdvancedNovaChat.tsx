import React, { useState, useRef, useEffect } from 'react';
import HolographicAvatar from './HolographicAvatar';
import AIPersonalityCore from './AIPersonalityCore';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import VoiceButton from './VoiceButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  mood?: string;
  confidence?: number;
  processingTime?: number;
}

const AdvancedNovaChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState<'neutral' | 'happy' | 'thinking' | 'excited' | 'focused'>('neutral');
  const [aiStats, setAiStats] = useState({
    messagesProcessed: 0,
    averageResponseTime: 1200,
    knowledgeAccessed: 0,
    creativityLevel: 75
  });
  const [personalityTraits, setPersonalityTraits] = useState({
    creativity: 0.8,
    logic: 0.9,
    empathy: 0.85,
    curiosity: 0.95,
    confidence: 0.75
  });
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Integrated key
  const apiKey = 'AIzaSyDe6CpKNun9p3Nti2sAwIEQb94WTyhTxZg';

  // Call Tanveer AI API
  const callTanveerAI = async (userMessage: string): Promise<string> => {
    try {
      const personalityPrompt = `You are Nova, an advanced AI assistant created by Tanveer. Your personality traits are:
- Creativity: ${Math.round(personalityTraits.creativity * 100)}%
- Logic: ${Math.round(personalityTraits.logic * 100)}%
- Empathy: ${Math.round(personalityTraits.empathy * 100)}%
- Curiosity: ${Math.round(personalityTraits.curiosity * 100)}%
- Confidence: ${Math.round(personalityTraits.confidence * 100)}%

Respond in a way that reflects these personality traits. Be helpful, intelligent, and engaging. Use emojis sparingly but effectively. Keep responses concise but informative.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${personalityPrompt}\n\nUser: ${userMessage}`
            }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";
    } catch (error) {
      console.error('Tanveer AI Error:', error);
      return "Sorry, I'm having trouble connecting to my AI brain right now. Please try again later. 🤖";
    }
  };

  // Enhanced Nova response generation with real AI
  const generateAdvancedNovaResponse = async (userMessage: string): Promise<{ text: string; mood: string; confidence: number; processingTime: number }> => {
    const startTime = Date.now();
    
    let mood = 'neutral';
    let confidence = personalityTraits.confidence;
    
    // Mood detection influenced by personality
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('happy') || lowerMessage.includes('excited') || lowerMessage.includes('awesome')) {
      mood = 'happy';
      confidence = Math.min(1, confidence + personalityTraits.empathy * 0.2);
    } else if (lowerMessage.includes('think') || lowerMessage.includes('analyze') || lowerMessage.includes('complex')) {
      mood = 'thinking';
      confidence = Math.min(1, confidence + personalityTraits.logic * 0.2);
    } else if (lowerMessage.includes('wow') || lowerMessage.includes('amazing') || lowerMessage.includes('incredible')) {
      mood = 'excited';
      confidence = Math.min(1, confidence + personalityTraits.curiosity * 0.2);
    } else if (lowerMessage.includes('code') || lowerMessage.includes('focus') || lowerMessage.includes('work')) {
      mood = 'focused';
      confidence = Math.min(1, confidence + personalityTraits.logic * 0.15);
    }

    // Get response from Tanveer AI
    const response = await callTanveerAI(userMessage);
    const processingTime = Date.now() - startTime;
    
    return { text: response, mood, confidence, processingTime };
  };

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setCurrentMood('thinking');

    try {
      const aiResponse = await generateAdvancedNovaResponse(messageText);
      const novaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood: aiResponse.mood,
        confidence: aiResponse.confidence,
        processingTime: aiResponse.processingTime
      };

      setMessages(prev => [...prev, novaMessage]);
      setCurrentMood(aiResponse.mood as any);
      
      // Update AI stats
      setAiStats(prev => ({
        ...prev,
        messagesProcessed: prev.messagesProcessed + 1,
        averageResponseTime: (prev.averageResponseTime + aiResponse.processingTime) / 2,
        knowledgeAccessed: prev.knowledgeAccessed + Math.floor(Math.random() * 50),
        creativityLevel: Math.min(100, prev.creativityLevel + Math.floor(Math.random() * 5))
      }));
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood: 'neutral',
        confidence: 0.5,
        processingTime: 0
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setCurrentMood('focused');
    }
  };

  const handlePersonalityChange = (traits: typeof personalityTraits) => {
    setPersonalityTraits(traits);
    console.log('Personality updated:', traits);
  };

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: 'greeting',
      text: "🌟 Hey, I'm Nova – your intelligent AI companion powered by Tanveer's advanced AI technology! I'm now connected to real AI and can answer any question you have. My personality adapts based on the controls below. What would you like to explore together?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: 'excited',
      confidence: 0.98
    };
    setMessages([greeting]);
    setCurrentMood('excited');
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-2 md:p-4 relative">
      
      {/* Enhanced Floating Background Elements with new theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-modern-indigo/10 rounded-full blur-3xl animate-float opacity-60" />
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-modern-purple/10 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-modern-pink/10 rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '4s' }} />
        
        {/* Gradient streams */}
        <div className="absolute inset-0 bg-gradient-to-br from-modern-indigo/5 via-transparent to-modern-purple/5 animate-gradient-shift" />
      </div>

      {/* Enhanced AI Status Panel with new theme */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
        <div className="glass-dark rounded-xl p-3 md:p-4 border border-modern-indigo/30 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-modern-indigo/50 hover:shadow-modern-indigo/20">
          <div className="text-xs text-modern-indigo font-mono mb-2 tracking-wider">NOVA STATUS</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-gray-400 transition-colors duration-200">
              Msgs: <span className="text-emerald-400 font-semibold">{aiStats.messagesProcessed}</span>
            </div>
            <div className="text-gray-400 transition-colors duration-200">
              AI: <span className="text-modern-pink font-semibold animate-pulse">LIVE</span>
            </div>
            <div className="text-gray-400 md:block hidden transition-colors duration-200">
              Time: <span className="text-modern-indigo font-semibold">{Math.round(aiStats.averageResponseTime)}ms</span>
            </div>
            <div className="text-gray-400 md:block hidden transition-colors duration-200">
              KB: <span className="text-modern-purple font-semibold">{aiStats.knowledgeAccessed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile-Responsive Header with new theme */}
      <div className="flex-shrink-0 relative mt-12 md:mt-16 z-10">
        {/* Mobile Collapse Toggle with better animation */}
        <button 
          onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
          className="md:hidden absolute top-0 right-0 z-20 p-3 text-modern-indigo hover:text-modern-purple transition-all duration-300 transform hover:scale-110 active:scale-95"
        >
          {isHeaderCollapsed ? (
            <ChevronDown size={20} className="animate-bounce" />
          ) : (
            <ChevronUp size={20} className="animate-bounce" />
          )}
        </button>

        <div className={`text-center transition-all duration-500 ease-out transform ${
          isHeaderCollapsed ? 'mb-2 scale-95' : 'mb-4 scale-100'
        }`}>
          {/* Enhanced Collapsed Mobile Header */}
          {isHeaderCollapsed ? (
            <div className="flex items-center justify-center space-x-4 p-2 rounded-2xl glass backdrop-blur-xl border border-modern-indigo/20">
              <div className="scale-50 transition-transform duration-300">
                <HolographicAvatar 
                  isListening={isListening} 
                  isSpeaking={isSpeaking}
                  mood={currentMood}
                />
              </div>
              <div className="transition-all duration-300">
                <h1 className="text-lg font-bold cosmic-text">Nova AI</h1>
                <div className="text-xs text-modern-indigo font-mono tracking-wider">
                  {currentMood.toUpperCase()}
                </div>
              </div>
            </div>
          ) : (
            /* Enhanced Full Header */
            <div className="space-y-4">
              <div className="scale-75 md:scale-100 transition-transform duration-500">
                <HolographicAvatar 
                  isListening={isListening} 
                  isSpeaking={isSpeaking}
                  mood={currentMood}
                />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold cosmic-text transition-all duration-300 hover:scale-105">
                  Nova AI
                </h1>
                <p className="text-gray-400 text-sm md:text-base transition-colors duration-300">
                  Powered by Tanveer AI
                </p>
                <div className="text-xs text-modern-indigo font-mono tracking-wider bg-modern-indigo/10 px-3 py-1 rounded-full inline-block transition-all duration-300 hover:bg-modern-indigo/20">
                  Mode: {currentMood.toUpperCase()} | Status: ONLINE
                </div>
              </div>
              
              <div className="scale-75 md:scale-90 transition-transform duration-500">
                <AIPersonalityCore 
                  currentMood={currentMood}
                  isActive={isTyping || isListening}
                  onTraitsChange={handlePersonalityChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Scrollable Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 pr-2 md:pr-4 mb-4 relative">
        {/* Chat container with better visual hierarchy */}
        <div className="space-y-4 md:space-y-6 pb-6">
          {messages.map((message, index) => (
            <div 
              key={message.id} 
              className={`relative transition-all duration-500 transform ${
                index === messages.length - 1 ? 'animate-fade-in' : ''
              }`}
            >
              <ChatBubble
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
              {!message.isUser && message.confidence && (
                <div className="ml-4 mt-2 text-xs text-gray-500 font-mono hidden md:block transition-opacity duration-300 hover:opacity-100 opacity-70">
                  <span className="bg-gray-800/50 px-2 py-1 rounded-md">
                    Confidence: {Math.round(message.confidence * 100)}%
                    {message.processingTime && ` | Processing: ${Math.round(message.processingTime)}ms`}
                  </span>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="animate-fade-in">
              <ChatBubble
                message=""
                isUser={false}
                isTyping={true}
              />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Enhanced Fixed Input Area with new theme */}
      <div className="flex-shrink-0 relative z-10">
        <div className="glass-dark rounded-2xl p-4 border border-modern-indigo/20 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-modern-indigo/40">
          <div className="flex items-end space-x-3 md:space-x-4">
            <div className="flex-1">
              <ChatInput 
                onSendMessage={handleSendMessage}
                disabled={isTyping}
                placeholder="Ask Nova anything... ✨"
              />
            </div>
            <VoiceButton 
              isListening={isListening}
              onToggle={handleVoiceToggle}
              disabled={isTyping}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedNovaChat;
