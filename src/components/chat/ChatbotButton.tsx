import { MessageSquare } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './components/ui/button';

export function ChatbotButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show the button on the chat page itself
  if (location.pathname === '/chat') {
    return null;
  }

  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
      onClick={() => navigate('/chat')}
    >
      <MessageSquare className="h-6 w-6 text-primary-foreground" />
    </Button>
  );
}