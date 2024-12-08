import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { ScrollArea } from './components/ui/scroll-area';
import { ChatMessage } from './components/chat/ChatMessage';
import { ChatInput } from './components/chat/ChatInput';
import { QuickActions } from './components/chat/QuickActions';
import { Message } from '@/types';

export function ChatbotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your personal dining assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "What's on the menu?",
        'Do you have vegetarian options?',
        'Tell me about allergens',
      ],
      onSuggestionClick: (suggestion) => handleUserMessage(suggestion),
    },
  ]);
  const [input, setInput] = useState('');

  const handleUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse: Message;

      if (text.toLowerCase().includes('menu')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: "I'd be happy to tell you about our menu! We have a variety of dishes including our famous Margherita Pizza, classic Spaghetti Carbonara, and healthy Quinoa Buddha Bowl. Would you like to know more about any specific dish?",
          sender: 'bot',
          timestamp: new Date(),
          suggestions: ['Tell me about the pizza', 'Vegetarian options', 'Most popular dishes'],
          onSuggestionClick: (suggestion) => handleUserMessage(suggestion),
        };
      } else if (text.toLowerCase().includes('vegetarian')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: "We have several delicious vegetarian options! Our Margherita Pizza and Quinoa Buddha Bowl are very popular. Would you like to see the full list of vegetarian dishes?",
          sender: 'bot',
          timestamp: new Date(),
          suggestions: ['Show all vegetarian dishes', 'Vegan options', 'Allergen information'],
          onSuggestionClick: (suggestion) => handleUserMessage(suggestion),
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: "I understand you're interested in our offerings. Would you like me to recommend something based on your preferences?",
          sender: 'bot',
          timestamp: new Date(),
          suggestions: ['Yes, please recommend', 'Show full menu', 'Special dietary needs'],
          onSuggestionClick: (suggestion) => handleUserMessage(suggestion),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    handleUserMessage(input);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-background"
    >
      <header className="border-b p-4 bg-card">
        <div className="container max-w-2xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/menu')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
         
        </div>
      </header>

      <QuickActions onActionSelect={handleUserMessage} />

      <ScrollArea className="flex-1 px-4">
        <div className="container max-w-2xl mx-auto space-y-4 py-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
      />
    </motion.div>
  );
}