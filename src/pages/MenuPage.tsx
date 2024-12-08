import { Header } from './components/layout/Header';
import { MenuList } from './components/menu/MenuList';
import { motion } from 'framer-motion';

export function MenuPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <MenuList />
    </motion.div>
  );
}