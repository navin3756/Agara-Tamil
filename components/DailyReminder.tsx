import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DailyReminder: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  useEffect(() => {
    if ('Notification' in window) {
      const reminderSaved = localStorage.getItem('daily_reminder_set') === 'true';
      
      if (Notification.permission === 'default' && !reminderSaved) {
        // Delay showing the prompt slightly so it's not too aggressive
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleEnableNotifications = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    const currentPermission = await Notification.requestPermission();
    
    if (currentPermission === 'granted') {
      localStorage.setItem('daily_reminder_set', 'true');
      setShowPrompt(false);
      
      // Show immediate confirmation notification
      new Notification('Tamil Learning Reminders', {
        body: "Great! We'll remind you daily to practice Tamil.",
        icon: '/icon.svg',
      });
    } else {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('daily_reminder_set', 'false');
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 max-w-sm bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden z-50"
      >
        <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
               <span className="text-2xl">⏰</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Set Daily Reminder?</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Kids learn best with consistency! Enable notifications to receive a friendly daily reminder to practice Tamil.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={handleEnableNotifications}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-bold shadow hover:bg-indigo-700 transition"
                >
                  Enable
                </button>
                <button 
                  onClick={handleDismiss}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-bold hover:bg-gray-200 transition"
                >
                  Not Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyReminder;
