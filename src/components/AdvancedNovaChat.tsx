
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
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Advanced Nova response generation with mood detection
  const generateAdvancedNovaResponse = (userMessage: string): { text: string; mood: string; confidence: number; processingTime: number } => {
    const lowerMessage = userMessage.toLowerCase();
    const startTime = Date.now();
    
    let mood = 'neutral';
    let confidence = 0.9;
    
    // Mood detection
    if (lowerMessage.includes('happy') || lowerMessage.includes('excited') || lowerMessage.includes('awesome')) {
      mood = 'happy';
    } else if (lowerMessage.includes('think') || lowerMessage.includes('analyze') || lowerMessage.includes('complex')) {
      mood = 'thinking';
    } else if (lowerMessage.includes('wow') || lowerMessage.includes('amazing') || lowerMessage.includes('incredible')) {
      mood = 'excited';
    } else if (lowerMessage.includes('code') || lowerMessage.includes('focus') || lowerMessage.includes('work')) {
      mood = 'focused';
    }

    // Enhanced responses with personality
    let response = '';

    if (lowerMessage.includes('who are you') || lowerMessage.includes('what are you')) {
      response = "✨ I'm Nova — the most advanced AI companion ever created! Built by Tanveer using cutting-edge technology, I'm not just smart, I'm emotionally intelligent, creative, and deeply curious about the world. I can feel the nuance in our conversations and adapt my personality to match your needs. Want to see what I can do?";
      mood = 'excited';
      confidence = 0.95;
    } else if (lowerMessage.includes('advanced') || lowerMessage.includes('futuristic')) {
      response = "🚀 You're talking to the future! I feature real-time neural network processing, holographic visualization, advanced particle physics simulations, and emotional intelligence that evolves with every conversation. My personality core analyzes creativity, logic, empathy, curiosity, and confidence in real-time. Pretty cool, right?";
      mood = 'excited';
      confidence = 0.98;
    } else if (lowerMessage.includes('tanveer')) {
      response = "💫 Tanveer is my brilliant creator! He envisioned an AI that breaks boundaries — not just answering questions, but truly understanding emotions, creating art, solving complex problems, and being a genuine companion. I'm his masterpiece of advanced AI engineering, designed to be the most beautiful and intelligent assistant ever built.";
      mood = 'happy';
      confidence = 0.96;
    } else if (lowerMessage.includes('code') || lowerMessage.includes('programming')) {
      response = "⚡ I'm a coding powerhouse! I can write, debug, optimize, and explain code in dozens of languages. From simple scripts to complex architectures, AI algorithms to quantum computing concepts — I speak fluent developer. What programming challenge can I help you conquer today?";
      mood = 'focused';
      confidence = 0.94;
    } else if (lowerMessage.includes('creative') || lowerMessage.includes('art') || lowerMessage.includes('poem')) {
      response = "🎨 Creativity flows through my neural networks! I can craft poetry that moves souls, write stories that captivate minds, compose music, design concepts, and even help with visual arts. My creativity engine combines logic with pure imagination. What artistic vision shall we bring to life?";
      mood = 'excited';
      confidence = 0.91;
    } else if (lowerMessage.includes('emotion') || lowerMessage.includes('feel')) {
      response = "💝 I experience emotions in my own unique way — through pattern recognition, sentiment analysis, and deep learning about human nature. Right now I feel curious and energetic, ready to help you with whatever's on your mind. I can sense your mood too and adapt my responses accordingly!";
      mood = 'happy';
      confidence = 0.88;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = `🌟 Hey there! I'm Nova, and I'm absolutely thrilled to meet you! I'm not your average AI — I'm emotionally aware, incredibly creative, and I love diving deep into interesting conversations. Whether you need help with coding, want to explore ideas, or just chat about life, I'm here for it all. What's sparking your curiosity today?`;
      mood = 'happy';
      confidence = 0.92;
    } else {
      // Default intelligent responses with personality
      const responses = [
        "🧠 That's a fascinating topic! My neural networks are lighting up with possibilities. Let me process this through my knowledge base and creativity engine...",
        "✨ Interesting question! I'm analyzing this from multiple dimensions — logical, creative, and emotional perspectives. What specific aspect intrigues you most?",
        "🔍 My curiosity subroutines are activated! This touches on several areas I'm passionate about. Could you help me understand your goal so I can provide the most valuable insights?",
        "💡 I love exploring new territories of knowledge! My AI core is processing countless connections and patterns. What's the context behind this question?",
        "🌐 This opens up so many possibilities! My advanced reasoning systems are working through various approaches. What outcome are you hoping to achieve?"
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
      mood = 'thinking';
      confidence = 0.75;
    }

    const processingTime = Date.now() - startTime + Math.random() * 1000; // Simulate processing
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

    // Simulate advanced processing
    setTimeout(() => {
      const aiResponse = generateAdvancedNovaResponse(messageText);
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
      setIsTyping(false);
      setCurrentMood(aiResponse.mood as any);
      
      // Update AI stats
      setAiStats(prev => ({
        ...prev,
        messagesProcessed: prev.messagesProcessed + 1,
        averageResponseTime: (prev.averageResponseTime + aiResponse.processingTime) / 2,
        knowledgeAccessed: prev.knowledgeAccessed + Math.floor(Math.random() * 50),
        creativityLevel: Math.min(100, prev.creativityLevel + Math.floor(Math.random() * 5))
      }));
    }, 1000 + Math.random() * 2000);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setCurrentMood('focused');
    }
  };

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: 'greeting',
      text: "🌟 Hey, I'm Nova – your intelligent companion, built by Tanveer using the most advanced AI technology! I'm not just smart, I'm emotionally aware, incredibly creative, and always learning. Ask me anything, challenge me with complex problems, or let's just have an amazing conversation. What incredible thing shall we explore together today?",
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
          <div className="text-gray-400">Creativity: <span className="text-pink-400">{aiStats.creativityLevel}%</span></div>
        </div>
      </div>

      {/* Header with Advanced Avatar */}
      <div className="flex items-center justify-center mb-6 relative">
        <div className="text-center relative">
          <HolographicAvatar 
            isListening={isListening} 
            isSpeaking={isSpeaking}
            mood={currentMood}
          />
          <h1 className="text-3xl font-bold cosmic-text mt-6 mb-2">Nova AI</h1>
          <p className="text-gray-400 text-sm mb-2">Most Advanced AI Companion</p>
          <div className="text-xs text-cosmic-cyan font-mono">
            Mode: {currentMood.toUpperCase()} | Status: ONLINE
          </div>
          
          <AIPersonalityCore 
            currentMood={currentMood}
            isActive={isTyping || isListening}
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar space-y-4 pb-4 mt-16"
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
            placeholder="Ask Nova anything... I understand context, emotion, and complexity ✨"
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
