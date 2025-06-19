
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Code, BookOpen, Lightbulb, Coffee, Briefcase } from 'lucide-react';

interface ConversationTheme {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  prompt: string;
  color: string;
}

interface ConversationThemesProps {
  onThemeSelect: (theme: ConversationTheme) => void;
  currentTheme?: string;
}

const themes: ConversationTheme[] = [
  {
    id: 'general',
    name: 'General Chat',
    icon: Coffee,
    prompt: 'You are Nova, a helpful and friendly AI assistant. Be conversational and engaging.',
    color: 'bg-blue-500'
  },
  {
    id: 'coding',
    name: 'Coding Help',
    icon: Code,
    prompt: 'You are Nova, a coding expert. Focus on providing clear, practical coding solutions and explanations.',
    color: 'bg-green-500'
  },
  {
    id: 'creative',
    name: 'Creative Writing',
    icon: Palette,
    prompt: 'You are Nova, a creative writing assistant. Help with storytelling, poetry, and creative expression.',
    color: 'bg-purple-500'
  },
  {
    id: 'learning',
    name: 'Learning & Study',
    icon: BookOpen,
    prompt: 'You are Nova, an educational tutor. Break down complex topics into easy-to-understand explanations.',
    color: 'bg-orange-500'
  },
  {
    id: 'brainstorm',
    name: 'Brainstorming',
    icon: Lightbulb,
    prompt: 'You are Nova, an innovative brainstorming partner. Generate creative ideas and solutions.',
    color: 'bg-yellow-500'
  },
  {
    id: 'business',
    name: 'Business & Strategy',
    icon: Briefcase,
    prompt: 'You are Nova, a business consultant. Provide strategic insights and professional advice.',
    color: 'bg-red-500'
  }
];

const ConversationThemes: React.FC<ConversationThemesProps> = ({
  onThemeSelect,
  currentTheme = 'general'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="glass-dark"
      >
        <Palette className="w-4 h-4 mr-2" />
        Theme
      </Button>

      {isOpen && (
        <div className="absolute top-12 left-0 z-50 w-64 glass-dark rounded-xl p-4 border border-blue-500/20">
          <h3 className="text-sm font-semibold text-white mb-3">Conversation Theme</h3>
          <div className="grid gap-2">
            {themes.map((theme) => (
              <Button
                key={theme.id}
                onClick={() => {
                  onThemeSelect(theme);
                  setIsOpen(false);
                }}
                variant="ghost"
                className={`justify-start p-3 h-auto ${
                  currentTheme === theme.id ? 'bg-blue-500/20 border border-blue-500/40' : ''
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${theme.color} mr-3`} />
                <div className="text-left">
                  <div className="font-medium text-white text-sm">{theme.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {theme.prompt.substring(0, 40)}...
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationThemes;
export type { ConversationTheme };
