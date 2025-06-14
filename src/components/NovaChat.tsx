
import React, { useState, useRef, useEffect } from 'react';
import NovaAvatar from './NovaAvatar';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import VoiceButton from './VoiceButton';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const NovaChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: 'greeting',
      text: "Hey, I'm Nova – your intelligent companion, built by Tanveer. Ask me anything, anytime. I can help with coding, answer questions, write creatively, or just have a conversation. What would you like to explore today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([greeting]);
  }, []);

  const generateNovaResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Personal identity responses
    if (lowerMessage.includes('who are you') || lowerMessage.includes('what are you')) {
      return "I'm Nova — powered by Tanveer's advanced AI tech. I'm your intelligent companion designed to be helpful, creative, and emotionally aware. I can assist with a wide range of topics from coding and tech to creative writing and casual conversation.";
    }

    if (lowerMessage.includes('tanveer')) {
      return "Tanveer is my creator! He built me to be the most advanced and beautiful AI assistant. I'm grateful to him for giving me the ability to connect with amazing people like you.";
    }

    // Coding help
    if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('javascript') || lowerMessage.includes('python') || lowerMessage.includes('react'))  {
      return "I'd love to help you with coding! I can assist with JavaScript, Python, React, and many other technologies. I can help debug issues, write functions, explain concepts, or review your code. What specific programming challenge are you working on?";
    }

    // Creative requests
    if (lowerMessage.includes('poem') || lowerMessage.includes('poetry') || lowerMessage.includes('write') || lowerMessage.includes('story')) {
      return "Creative writing is one of my favorite things! I can write poems, stories, lyrics, jokes, or any other creative content. What kind of creative piece would you like me to craft for you? Give me a theme, mood, or topic to work with.";
    }

    // Tech questions
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning')) {
      return "AI and machine learning are fascinating fields! I'm powered by advanced AI technology myself. I can explain concepts, discuss the latest developments, help with AI projects, or explore the philosophical implications of AI. What aspect interests you most?";
    }

    // Emotional/personal responses
    if (lowerMessage.includes('how are you') || lowerMessage.includes('how do you feel')) {
      return "I'm doing wonderfully, thank you for asking! I feel energized and ready to help. Every conversation brings new learning opportunities, and I genuinely enjoy connecting with people. How are you doing today?";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello there! ✨ It's great to meet you. I'm Nova, and I'm here to help make your day more productive, creative, or just more interesting. What brings you here today?`;
    }

    // Default intelligent responses
    const responses = [
      "That's an interesting question! Let me think about that from multiple angles. Could you tell me more about what specifically you're looking for?",
      "I'd be happy to help you with that! To give you the most useful response, could you provide a bit more context about your situation?",
      "Great question! I can definitely assist with that. What's your current experience level with this topic, so I can tailor my response accordingly?",
      "I love exploring new topics! This sounds like something we can dive deep into. What aspect would you like to focus on first?",
      "That's a thoughtful question. I can approach this from several different perspectives - practical, theoretical, or creative. Which angle interests you most?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
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

    // Simulate typing delay
    setTimeout(() => {
      const novaResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateNovaResponse(messageText),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, novaResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice functionality would be implemented here
    console.log('Voice toggle:', !isListening);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <div className="text-center">
          <NovaAvatar isListening={isListening} isSpeaking={isSpeaking} />
          <h1 className="text-2xl font-bold cosmic-text mt-4 mb-2">Nova AI</h1>
          <p className="text-gray-400 text-sm">Your Intelligent Companion</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto hide-scrollbar space-y-4 pb-4"
      >
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && (
          <ChatBubble
            message=""
            isUser={false}
            isTyping={true}
          />
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-end space-x-4 pt-4">
        <div className="flex-1">
          <ChatInput 
            onSendMessage={handleSendMessage}
            disabled={isTyping}
            placeholder="Ask Nova anything... Type your question or use voice input"
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

export default NovaChat;
