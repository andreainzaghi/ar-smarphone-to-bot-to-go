import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function WelcomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-background bg-gray-200"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="flex items-center gap-4 mb-8"
      >
        <Bot className="h-16 w-16 text-primary" />
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-bold">To Bot</h1>
          <h2 className="text-2xl text-muted-foreground">To Go</h2>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-muted-foreground"
      >
        <p>Welcome to the future of dining</p>
      </motion.div>
    </motion.div>
  );
}