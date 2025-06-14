import React, { useState, useRef, useEffect } from 'react';
import HolographicAvatar from './HolographicAvatar';
import AIPersonalityCore from './AIPersonalityCore';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import VoiceButton from './VoiceButton';
import GlossyParticleOverlay from './GlossyParticleOverlay';
import GlossyOverlay from './GlossyOverlay';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";
import { Globe } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  mood?: string;
  confidence?: number;
  processingTime?: number;
}

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "zh", label: "Chinese" },
  { code: "ru", label: "Russian" },
  { code: "ja", label: "Japanese" },
  { code: "pt", label: "Portuguese" },
  { code: "ar", label: "Arabic" },
];

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
  const [showWelcome, setShowWelcome] = useState(true);
  const [translationEnabled, setTranslationEnabled] = useState(false);
  const [targetLang, setTargetLang] = useState("es");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { translate } = useTranslation();

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
    setShowWelcome(false);
    
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

      let novaText = aiResponse.text;
      let translatedText = null;
      if (translationEnabled && targetLang !== "en") {
        translatedText = await translate(novaText, targetLang, "en");
      }

      const novaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: novaText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood: aiResponse.mood,
        confidence: aiResponse.confidence,
        processingTime: aiResponse.processingTime,
        // @ts-ignore
        translated: translatedText ? translatedText : undefined,
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

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  // Enhanced: Translation controls at top right
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">

      {/* --- Translation Controls --- */}
      <div className="absolute top-4 left-4 z-20">
        <div className="glass-dark flex items-center rounded-xl p-2 border border-cosmic-cyan/20 shadow-2xl backdrop-blur-xl space-x-2 animate-fade-in">
          <Globe className="w-5 h-5 text-cosmic-cyan" />
          <span className="text-xs font-mono text-cosmic-cyan">Translate</span>
          <input
            type="checkbox"
            checked={translationEnabled}
            onChange={e => setTranslationEnabled(e.target.checked)}
            className="accent-cosmic-cyan mx-1"
            id="toggle-translation"
          />
          <select
            className="glass border rounded px-1 py-0.5 text-xs text-cosmic-cyan bg-slate-950/60"
            value={targetLang}
            onChange={e => setTargetLang(e.target.value)}
            disabled={!translationEnabled}
            style={{ minWidth: 60 }}
          >
            {LANGUAGE_OPTIONS.map(l =>
              <option value={l.code} key={l.code}>{l.label}</option>
            )}
          </select>
        </div>
      </div>

      {/* --- ENHANCED ANIMATED BACKGROUNDS --- */}
      <GlossyParticleOverlay />
      <GlossyOverlay />

      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float-gentle" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '4s' }} />
      </div>

      {/* Enhanced Status Panel */}
      <div className="absolute top-4 right-4 z-20">
        <div className="glass-dark rounded-xl p-3 border border-blue-500/20 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-xs text-blue-400 font-mono tracking-wider">NOVA AI</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-gray-400">
              Status: <span className="text-green-400 font-semibold">ONLINE</span>
            </div>
            <div className="text-gray-400">
              Mode: <span className="text-blue-400 font-semibold">{currentMood.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Screen */}
      {showWelcome && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10">
          <div className="mb-8 scale-75 md:scale-100">
            <HolographicAvatar 
              isListening={isListening} 
              isSpeaking={isSpeaking}
              mood={currentMood}
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Hi, how can I<br />help you today?
          </h1>
          
          <div className="glass-dark rounded-3xl p-6 md:p-8 border border-blue-500/20 backdrop-blur-xl max-w-md w-full mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm Nova—your intelligent companion, built by Tanveer. Ask me anything, anytime.
            </p>
          </div>

          {/* Compact Personality Panel for Welcome */}
          <div className="scale-75 md:scale-90 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <AIPersonalityCore 
              currentMood={currentMood}
              isActive={isTyping || isListening}
              onTraitsChange={handlePersonalityChange}
            />
          </div>
        </div>
      )}

      {/* Chat Messages - Only show when there are messages */}
      {!showWelcome && (
        <>
          {/* Compact Header */}
          <div className="flex-shrink-0 relative z-10 pt-16 pb-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="scale-50">
                  <HolographicAvatar 
                    isListening={isListening} 
                    isSpeaking={isSpeaking}
                    mood={currentMood}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Nova AI</h2>
                  <p className="text-xs text-gray-400">Powered by Tanveer AI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Chat */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 md:px-6 mb-4">
            <div className="max-w-4xl mx-auto space-y-6 pb-6">
              {messages.map((message, index) => (
                <div 
                  key={message.id} 
                  className={`transition-all duration-500 transform ${
                    index === messages.length - 1 ? 'animate-fade-in' : ''
                  }`}
                >
                  <ChatBubble
                    message={message.text}
                    isUser={message.isUser}
                    timestamp={message.timestamp}
                  />
                  {/* Real-time translation for AI messages */}
                  {translationEnabled && message.translated && (
                    <div className="mt-2 bg-cosmic-cyan/10 border-l-4 border-cosmic-cyan px-3 py-1 rounded text-cosmic-cyan text-xs max-w-lg">
                      {message.translated}
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
        </>
      )}

      {/* --- ENHANCED FROSTED/NEON GLOW EDGE ON INPUT CONTAINER --- */}
      <div className="flex-shrink-0 relative z-20 p-2 md:p-3">
        <div className="max-w-4xl mx-auto">
          <div className="glass-dark rounded-2xl p-2 border border-blue-500/20 shadow-2xl backdrop-blur-xl relative overflow-visible">
            {/* Glow border */}
            <div className="absolute -inset-2 rounded-3xl border-4 border-cyan-400/40 blur-md opacity-30 pointer-events-none animate-pulse"></div>
            <div className="absolute -inset-3 rounded-3xl border-2 border-purple-400/20 blur-lg opacity-15 pointer-events-none"></div>
            <div className="flex items-end space-x-2 relative z-10">
              <div className="flex-1">
                <ChatInput 
                  onSendMessage={handleSendMessage}
                  disabled={isTyping}
                  placeholder="Type a message..."
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
    </div>
  );
};

export default AdvancedNovaChat;
