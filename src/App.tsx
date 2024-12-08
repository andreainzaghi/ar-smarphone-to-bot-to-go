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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        setShowAlert(true); // Mostra l'alert dopo il WelcomePage
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate('/menu'); // Naviga al menu una volta chiuso l'alert
  };

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

      {/* Alert */}
      {showAlert && (
   <Dialog open={showAlert}>
   <DialogContent className="max-w-md bg-gray-800 text-white shadow-lg rounded-lg p-6">
     <DialogHeader>
       <DialogTitle className="text-2xl font-bold text-white">Attenzione!</DialogTitle>
       <DialogDescription className="mt-2 text-gray-400">
         Per un servizio ottimale, ti preghiamo di mantenere l'app sempre aperta durante il servizio. L'app è il tuo cameriere personale e gestirà:
         <ul className="list-disc ml-4 mt-3 space-y-2">
           <li>Tempistiche di servizio</li>
           <li>Eventuali richieste speciali</li>
           <li>Scelta del menu e pagamento</li>
           <li>Possibilità di chiamare il cameriere</li>
         </ul>
       </DialogDescription>
     </DialogHeader>
     <button
       onClick={handleAlertClose}
       className="mt-6 w-full bg-white text-gray-800 font-medium py-3 px-4 rounded-md hover:bg-gray-200 transition"
     >
       Ho capito
     </button>
   </DialogContent>
 </Dialog>
 
      )}

      <ChatbotButton />
      <Toaster />
    </div>
  );
}
