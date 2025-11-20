import { motion } from 'framer-motion';
import { Bell, X } from 'lucide-react';

type NotificationProps = {
  message: string;
  onClose: () => void;
};

export const Notification = ({ message, onClose }: NotificationProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: -70, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{
      opacity: 0,
      y: -70,
      scale: 0.9,
      transition: { duration: 0.3, ease: 'easeOut' },
    }}
    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    className="fixed top-6 right-6 z-[100] max-w-sm rounded-xl border border-neutral-200/80 bg-white p-4 shadow-lg dark:border-neutral-700/80 dark:bg-neutral-800"
  >
    <div className="flex items-center justify-between">
      <div className="mr-4 flex items-center">
        <Bell
          size={19}
          className="mr-3.5 flex-shrink-0 text-cyan-500 dark:text-cyan-400"
        />
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          {message}
        </p>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="-mt-1 -mr-1 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus-visible:ring-neutral-400"
        aria-label="Close notification"
      >
        <X size={18} />
      </motion.button>
    </div>
  </motion.div>
);
