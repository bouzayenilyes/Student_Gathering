import React, { useState, useEffect, useCallback } from 'react';
import { Share2, X, Download, Loader2 } from 'lucide-react';
import { generateQRCode } from '../../utils/qrUtils';
import { Todo } from '../../types/todo';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareQRCodeProps {
  todos: Todo[];
}

export function ShareQRCode({ todos }: ShareQRCodeProps) {
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQRCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowQR(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle click outside
  const handleClickOutside = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowQR(false);
    }
  }, []);

  const handleShare = async () => {
    try {
      setIsLoading(true);
      const shareData = {
        todos: todos.map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt).toISOString(),
        })),
        sharedAt: new Date().toISOString(),
      };
      
      const qrCodeData = await generateQRCode(JSON.stringify(shareData));
      setQRCode(qrCodeData);
      setShowQR(true);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'tasks-qr-code.png';
    link.href = qrCode;
    link.click();
  };

  return (
    <div>
      <button
        onClick={handleShare}
        disabled={isLoading}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5
          bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
          hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700
          text-white rounded-xl transition-all duration-300
          shadow-md hover:shadow-lg active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          text-sm sm:text-base"
        aria-label="Share tasks via QR code"
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Share2 size={18} className="animate-bounce-slow" />
        )}
        <span className="hidden sm:inline">Share Tasks</span>
      </button>

      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={handleClickOutside}
          >
            <div className="min-h-screen px-4 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="bg-white dark:bg-gray-800/95 rounded-2xl shadow-2xl 
                  border border-gray-200/50 dark:border-gray-700/50
                  w-full max-w-[360px] overflow-hidden
                  backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-labelledby="qr-modal-title"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 
                      id="qr-modal-title" 
                      className="text-xl font-semibold text-gray-900 dark:text-white"
                    >
                      Share Tasks
                    </h3>
                    <button
                      onClick={() => setShowQR(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      aria-label="Close sharing dialog"
                    >
                      <X size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>

                  <motion.div 
                    className="flex flex-col items-center space-y-6"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-lg">
                      <img 
                        src={qrCode} 
                        alt="QR Code for sharing tasks" 
                        className="w-52 h-52 rounded-lg" 
                      />
                    </div>

                    <div className="space-y-4 w-full">
                      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                        Scan this QR code to share your tasks
                      </p>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={handleDownload}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 
                            bg-gradient-to-r from-violet-600 to-indigo-600 
                            hover:from-violet-700 hover:to-indigo-700
                            text-white rounded-lg transition-all shadow-md hover:shadow-lg
                            text-sm font-medium"
                        >
                          <Download size={18} />
                          Download QR
                        </button>
                        <button
                          onClick={() => setShowQR(false)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 
                            bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
                            text-gray-700 dark:text-gray-200 rounded-lg transition-all
                            text-sm font-medium"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}