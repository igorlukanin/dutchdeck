'use client';

import { useState } from 'react';
import type { Database } from '@woorden/db';

type Word = Database['public']['Tables']['words']['Row'];

interface FlashcardProps {
  word: Word;
  userLanguages: string[];
  onKnow: () => void;
  onDontKnow: () => void;
  onNext: () => void;
}

export function Flashcard({ 
  word, 
  userLanguages, 
  onKnow, 
  onDontKnow, 
  onNext 
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleTap = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLongPress = () => {
    setShowDetails(true);
  };

  const handleSwipeUp = () => {
    onKnow();
    resetCard();
  };

  const handleSwipeDown = () => {
    onDontKnow();
    resetCard();
  };

  const resetCard = () => {
    setIsFlipped(false);
    setShowDetails(false);
    setTimeout(onNext, 300);
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div 
        className={`
          relative w-full max-w-md h-96 cursor-pointer
          transform transition-all duration-300 ease-in-out
          ${isFlipped ? 'scale-95' : 'scale-100'}
        `}
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
        <div className={`
          absolute inset-0 bg-white rounded-2xl shadow-lg
          flex flex-col items-center justify-center p-8
          border-2 border-gray-200
          ${isFlipped ? 'border-[#21468B]' : ''}
        `}>
          {/* Front of card - Dutch word */}
          {!isFlipped && (
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                {word.dutch}
              </h2>
              <p className="text-sm text-gray-500">
                Tap to reveal • Swipe up if you know • Swipe down if you don't
              </p>
            </div>
          )}
          
          {/* Back of card - Translations */}
          {isFlipped && (
            <div className="text-center w-full">
              <h3 className="text-2xl font-semibold text-[#21468B] mb-6">
                {getTranslations()}
              </h3>
              
              {/* Additional details */}
              {showDetails && (
                <div className="space-y-3 text-left bg-gray-50 p-4 rounded-lg">
                  {word.gender && (
                    <div>
                      <span className="font-medium text-gray-600">Article:</span>{' '}
                      <span className="text-[#21468B]">{word.gender}</span>
                    </div>
                  )}
                  {word.verb_type && (
                    <div>
                      <span className="font-medium text-gray-600">Verb type:</span>{' '}
                      <span className="text-[#21468B]">{word.verb_type}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-600">Level:</span>{' '}
                    <span className="text-[#21468B]">{word.cefr_level}</span>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-4">
                Hold to see more details
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Action buttons for desktop */}
      <div className="hidden md:flex gap-4 mt-8">
        <button
          onClick={() => { onDontKnow(); resetCard(); }}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Don't Know
        </button>
        <button
          onClick={() => { onKnow(); resetCard(); }}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Know
        </button>
      </div>
    </div>
  );
}