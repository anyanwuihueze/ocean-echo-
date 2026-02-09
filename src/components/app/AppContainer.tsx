"use client";

import { useState } from 'react';
import { CheckInForm } from '@/components/app/CheckInForm';
import { DiscoveryFeed } from '@/components/app/DiscoveryFeed';
import type { UserProfile } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';

export default function AppContainer() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleCheckIn = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    // Delay clearing profile to allow for checkout animation
    setTimeout(() => setUserProfile(null), 500);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isCheckedIn ? 'feed' : 'form'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {isCheckedIn && userProfile ? (
          <DiscoveryFeed onCheckOut={handleCheckOut} currentUser={userProfile} />
        ) : (
          <CheckInForm onCheckIn={handleCheckIn} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
