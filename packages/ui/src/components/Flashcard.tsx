'use client';

import { useState, useEffect } from 'react';
import type { Database } from '@dutchdeck/db';

type Word = Database['public']['Tables']['words']['Row'];

interface FlashcardProps {
  word: Word;
  userLanguages: string[];
  onKnow: () => void;
  onDontKnow: () => void;
  onNext: () => void;
  onFlip?: (isFlipped: boolean) => void;
}

export function Flashcard({ 
  word, 
  userLanguages, 
  onKnow, 
  onDontKnow, 
  onNext,
  onFlip 
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleTap = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onFlip?.(newFlipped);
  };

  const handleLongPress = () => {
    setShowDetails(true);
  };

  const handleSwipeUp = () => {
    onKnow();
    resetCard(true);
  };

  const handleSwipeDown = () => {
    onDontKnow();
    resetCard(false);
  };

  const resetCard = (wasCorrect = false) => {
    setIsFlipped(false);
    setShowDetails(false);
    onFlip?.(false);
    setTimeout(() => onNext(), 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleSwipeUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleSwipeDown();
          break;
        case ' ':
          e.preventDefault();
          handleTap();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSwipeUp, handleSwipeDown, handleTap]);

  const getTranslations = () => {
    const translations: { [key: string]: string | null } = {
      en: word.english,
      ru: word.russian,
    };
    
    return userLanguages
      .map(lang => translations[lang])
      .filter(Boolean)
      .join(' • ');
  };

  return (
    <div className="h-full w-full">
      <div 
        className="relative w-full h-full cursor-pointer"
        onClick={handleTap}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const startY = touch.clientY;
          const startTime = Date.now();
          
          const handleTouchEnd = (e: TouchEvent) => {
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            if (duration > 500) {
              handleLongPress();
            } else {
              const endY = e.changedTouches[0].clientY;
              const deltaY = startY - endY;
              
              if (Math.abs(deltaY) > 100) {
                if (deltaY > 0) {
                  handleSwipeUp();
                } else {
                  handleSwipeDown();
                }
              }
            }
            
            document.removeEventListener('touchend', handleTouchEnd);
          };
          
          document.addEventListener('touchend', handleTouchEnd);
        }}
      >
        <div className="absolute inset-0 rounded-3xl flex flex-col items-start justify-center p-8">
          {/* Front of card - Dutch word */}
          {!isFlipped && (
            <div className="text-left w-full">
              <h2 className="heading-large text-black mb-8">
                {word.dutch}
              </h2>
            </div>
          )}
          
          {/* Back of card - Translations */}
          {isFlipped && (
            <div className="text-left w-full">
              <h3 className="heading-large text-white mb-8">
                {getTranslations()}
              </h3>
              
              {/* Additional details */}
              {showDetails && (
                <div className="space-y-2 text-left bg-gray-900 p-4 rounded-2xl mb-4">
                  {word.gender && (
                    <div className="text-gray-300 text-sm">
                      <span className="text-gray-400">Article:</span>{' '}
                      <span className="text-white">{word.gender}</span>
                    </div>
                  )}
                  {word.verb_type && (
                    <div className="text-gray-300 text-sm">
                      <span className="text-gray-400">Type:</span>{' '}
                      <span className="text-white">{word.verb_type}</span>
                    </div>
                  )}
                  <div className="text-gray-300 text-sm">
                    <span className="text-gray-400">Level:</span>{' '}
                    <span className="text-white">{word.cefr_level}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}