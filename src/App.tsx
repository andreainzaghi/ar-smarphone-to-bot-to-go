import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { WelcomePage } from '@/pages/WelcomePage';
import { MenuPage } from '@/pages/MenuPage';
import { CartPage } from '@/pages/CartPage';
import { ChatbotPage } from '@/pages/ChatbotPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { ChatbotButton } from '@/components/chat/ChatbotButton';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        navigate('/menu');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={showWelcome ? <WelcomePage /> : null} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </AnimatePresence>
      <ChatbotButton />
      <Toaster />
    </div>
  );
}