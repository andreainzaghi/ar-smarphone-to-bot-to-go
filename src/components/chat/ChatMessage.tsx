import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      <Avatar className={`h-8 w-8 ${isBot ? 'bg-primary' : 'bg-secondary'}`}>
        <AvatarFallback className="text-background">
          {isBot ? <Bot className="h-4 w-4 text-gray-800" /> : <User className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div
        className={`rounded-lg p-4 max-w-[80%] ${
          isBot
            ? 'bg-card text-card-foreground'
            : 'bg-primary text-primary-foreground'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        {isBot && message.suggestions && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="text-xs bg-background/10 hover:bg-background/20 rounded-full px-3 py-1 transition-colors"
                onClick={() => message.onSuggestionClick?.(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}