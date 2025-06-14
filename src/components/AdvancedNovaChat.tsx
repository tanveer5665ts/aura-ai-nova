import React, { useState, useRef, useEffect } from 'react';
import HolographicAvatar from './HolographicAvatar';
import AIPersonalityCore from './AIPersonalityCore';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import VoiceButton from './VoiceButton';

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
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
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

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 relative">
      {/* AI Status Panel */}
      <div className="absolute top-4 right-4 glass-dark rounded-lg p-3 border border-cosmic-cyan/20 z-10">
        <div className="text-xs text-cosmic-cyan font-mono mb-2">NOVA SYSTEM STATUS</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-gray-400">Messages: <span className="text-green-400">{aiStats.messagesProcessed}</span></div>
          <div className="text-gray-400">Avg Time: <span className="text-blue-400">{Math.round(aiStats.averageResponseTime)}ms</span></div>
          <div className="text-gray-400">Knowledge: <span className="text-purple-400">{aiStats.knowledgeAccessed}</span></div>
          <div className="text-gray-400">AI: <span className="text-pink-400">LIVE</span></div>
        </div>
      </div>

      {/* Header with Advanced Avatar */}
      <div className="flex items-center justify-center mb-6 relative mt-20">
        <div className="text-center relative">
          <HolographicAvatar 
            isListening={isListening} 
            isSpeaking={isSpeaking}
            mood={currentMood}
          />
          <h1 className="text-3xl font-bold cosmic-text mt-6 mb-2">Nova AI</h1>
          <p className="text-gray-400 text-sm mb-2">
            Powered by Tanveer AI
          </p>
          <div className="text-xs text-cosmic-cyan font-mono">
            Mode: {currentMood.toUpperCase()} | Status: ONLINE
          </div>
          
          <AIPersonalityCore 
            currentMood={currentMood}
            isActive={isTyping || isListening}
            onTraitsChange={handlePersonalityChange}
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar space-y-4 pb-4"
      >
        {messages.map((message) => (
          <div key={message.id} className="relative">
            <ChatBubble
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
            {!message.isUser && message.confidence && (
              <div className="ml-4 mt-1 text-xs text-gray-500 font-mono">
                Confidence: {Math.round(message.confidence * 100)}% | 
                {message.processingTime && ` Processing: ${Math.round(message.processingTime)}ms`}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <ChatBubble
            message=""
            isUser={false}
            isTyping={true}
          />
        )}
      </div>

      {/* Enhanced Input Area */}
      <div className="flex items-end space-x-4 pt-4">
        <div className="flex-1">
          <ChatInput 
            onSendMessage={handleSendMessage}
            disabled={isTyping}
            placeholder="Ask Nova anything... I have access to Tanveer's AI! ✨"
          />
        </div>
        <VoiceButton 
          isListening={isListening}
          onToggle={handleVoiceToggle}
          disabled={isTyping}
        />
      </div>
    </div>
  );
};

export default AdvancedNovaChat;
