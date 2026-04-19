"use client";

import { useState, useEffect, useCallback } from 'react';
import { CheckInForm } from '@/components/app/CheckInForm';
import { DiscoveryFeed } from '@/components/app/DiscoveryFeed';
import type { UserProfile, Note } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { mockUsers } from '@/lib/data';

export default function AppContainer() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  const generateId = () => {
    try {
      return crypto.randomUUID();
    } catch (e) {
      return Math.random().toString(36).substring(2, 15);
    }
  };

  const handleCheckIn = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setTimeout(() => {
      setUserProfile(null);
      setNotes([]);
    }, 500);
  };

  const sendNote = (targetUserId: string, content: string) => {
    console.log(`Note sent to ${targetUserId}: ${content}`);
  };

  const simulateIncomingNote = useCallback(() => {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const simulatedMessages = [
      "Hey! Love your vibe. Are you from around here?",
      "The sunset is amazing tonight, right?",
      "I'm also here for the music. Who's your favorite artist?",
      "Love the avatar! Very chic.",
      "Interested in a drink? I'm by the bar.",
      "That vibe tag is exactly what I'm feeling too."
    ];
    
    const newNote: Note = {
      id: generateId(),
      senderId: randomUser.id,
      senderNickname: randomUser.nickname,
      content: simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)],
      timestamp: new Date(),
      isRead: false,
    };

    setNotes(prev => [newNote, ...prev]);
  }, [mockUsers]);

  // Simulation: Receive a random note every 45 seconds
  useEffect(() => {
    if (!isCheckedIn) return;

    const interval = setInterval(() => {
      simulateIncomingNote();
    }, 45000);

    return () => clearInterval(interval);
  }, [isCheckedIn, simulateIncomingNote]);

  const markAsRead = (noteId: string) => {
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, isRead: true } : n));
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
          <DiscoveryFeed 
            onCheckOut={handleCheckOut} 
            currentUser={userProfile} 
            notes={notes}
            onMarkRead={markAsRead}
            onSendNote={sendNote}
            onSimulateEcho={simulateIncomingNote}
          />
        ) : (
          <CheckInForm onCheckIn={handleCheckIn} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
