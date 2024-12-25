import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

export function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 
            bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 
            dark:border-gray-700 p-4 z-50"
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold dark:text-white">
                Install Student Gathering
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Install our app for a better experience and offline access
              </p>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleInstall}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 
                bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700
                text-white rounded-lg transition-all"
            >
              <Download size={18} />
              Install App
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-all
                text-gray-700 dark:text-gray-200"
            >
              Maybe Later
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 