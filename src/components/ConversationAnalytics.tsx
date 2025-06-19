
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart3, MessageCircle, Clock, TrendingUp, Brain, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  mood?: string;
  confidence?: number;
  processingTime?: number;
}

interface ConversationAnalyticsProps {
  messages: Message[];
  aiStats: {
    messagesProcessed: number;
    averageResponseTime: number;
    knowledgeAccessed: number;
    creativityLevel: number;
  };
}

const ConversationAnalytics: React.FC<ConversationAnalyticsProps> = ({
  messages,
  aiStats
}) => {
  const totalMessages = messages.length;
  const userMessages = messages.filter(m => m.isUser).length;
  const aiMessages = messages.filter(m => !m.isUser).length;
  
  const averageConfidence = messages
    .filter(m => !m.isUser && m.confidence)
    .reduce((sum, m) => sum + (m.confidence || 0), 0) / Math.max(aiMessages, 1);
  
  const moodDistribution = messages
    .filter(m => !m.isUser && m.mood)
    .reduce((acc, m) => {
      acc[m.mood!] = (acc[m.mood!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const conversationLength = messages.length > 0 
    ? Math.round((Date.now() - new Date(messages[0].timestamp).getTime()) / 60000)
    : 0;

  return (
    <div className="glass-dark rounded-xl p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Analytics</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Messages</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalMessages}</div>
          <div className="text-xs text-gray-400">
            You: {userMessages} • Nova: {aiMessages}
          </div>
        </div>

        <div className="bg-slate-800/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Duration</span>
          </div>
          <div className="text-2xl font-bold text-white">{conversationLength}m</div>
          <div className="text-xs text-gray-400">This session</div>
        </div>

        <div className="bg-slate-800/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Confidence</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.round(averageConfidence * 100)}%
          </div>
          <div className="text-xs text-gray-400">Average AI confidence</div>
        </div>

        <div className="bg-slate-800/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Speed</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {Math.round(aiStats.averageResponseTime)}ms
          </div>
          <div className="text-xs text-gray-400">Avg response time</div>
        </div>
      </div>

      {Object.keys(moodDistribution).length > 0 && (
        <div className="bg-slate-800/30 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-white mb-2">AI Mood Distribution</h4>
          <div className="space-y-2">
            {Object.entries(moodDistribution).map(([mood, count]) => (
              <div key={mood} className="flex items-center justify-between">
                <span className="text-sm text-gray-300 capitalize">{mood}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${(count / aiMessages) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationAnalytics;
