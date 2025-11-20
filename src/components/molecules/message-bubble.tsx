import type { Message } from '@/types';
import { motion } from 'framer-motion';
import { Check, CheckCheck } from 'lucide-react';

type MessageBubbleProps = {
  message: Message;
  isCurrentUser: boolean;
};

export const MessageBubble = ({
  message,
  isCurrentUser,
}: MessageBubbleProps) => {
  const bubbleClasses = message.isEmoji
    ? 'bg-transparent text-5xl px-1 py-0'
    : isCurrentUser
      ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-md rounded-t-2xl rounded-bl-2xl'
      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-600/80 shadow-sm rounded-t-2xl rounded-br-2xl';

  const systemMessageClasses = message.isSystemMessage
    ? 'text-center text-xs text-neutral-500 dark:text-neutral-400 italic bg-neutral-50 dark:bg-neutral-700/50 rounded-lg py-1.5 px-3 border border-neutral-200 dark:border-neutral-600/50 shadow-sm mx-auto max-w-[90%] my-3'
    : `max-w-[80%] md:max-w-[75%] px-4 py-2.5 text-sm ${bubbleClasses}`;

  if (message.isSystemMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={systemMessageClasses}
      >
        {message.text}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, x: isCurrentUser ? 30 : -30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className={`mb-2 flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'
      }`}
    >
      <div className={systemMessageClasses}>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mb-2">
            <img
              src={message.attachments[0]}
              alt="User attachment"
              className="max-h-48 w-auto rounded-xl border border-neutral-200/50 dark:border-neutral-600/50"
            />
          </div>
        )}
        {message.text}
      </div>
      {/* Timestamp and Read Receipt */}
      <div
        className={`mt-1.5 px-1 text-[11px] ${isCurrentUser ? 'text-right' : 'text-left'
        } flex items-center text-neutral-500 dark:text-neutral-400`}
      >
        {new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
        }).format(message.timestamp)}
        {isCurrentUser
          && (message.read
            ? (
                <CheckCheck
                  size={14}
                  className="ml-1 text-blue-500 dark:text-blue-400"
                />
              )
            : (
                <Check
                  size={14}
                  className="ml-1 text-neutral-400 dark:text-neutral-500"
                />
              ))}
      </div>
    </motion.div>
  );
};
