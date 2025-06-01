'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Flashcard, ProgressBar } from '@dutchdeck/ui';
import { supabase } from '@dutchdeck/db';
import { getUser } from '@dutchdeck/utils';
import type { Database } from '@dutchdeck/db';

type Word = Database['public']['Tables']['words']['Row'];

// Helper function to capitalize first letter only
const capitalizeFirst = (str: string | null): string | null => {
  if (!str) return null;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Mock data for now - will be replaced with real data from Supabase
const mockWords: Word[] = [
  {
    id: '1',
    dutch: 'hallo',
    english: 'hello',
    russian: 'привет',
    gender: null,
    verb_type: null,
    cefr_level: 'A1',
    source: 'duolingo',
    audio_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    dutch: 'tafel',
    english: 'table',
    russian: 'стол',
    gender: 'de',
    verb_type: null,
    cefr_level: 'A1',
    source: 'duolingo',
    audio_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    dutch: 'lopen',
    english: 'to walk',
    russian: 'идти',
    gender: null,
    verb_type: 'regular',
    cefr_level: 'A1',
    source: 'duolingo',
    audio_url: null,
    created_at: new Date().toISOString(),
  },
].map(word => ({
  ...word,
  dutch: capitalizeFirst(word.dutch) || word.dutch,
  english: capitalizeFirst(word.english) || word.english,
  russian: capitalizeFirst(word.russian) || word.russian,
}));

export default function PracticePage() {
  const router = useRouter();
  const [words, setWords] = useState<Word[]>(mockWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [userLanguages, setUserLanguages] = useState(['en']);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [router]);

  const checkAuth = async () => {
    try {
      const user = await getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      
      // Load user preferences
      const { data: userData } = await supabase
        .from('users')
        .select('languages')
        .eq('id', user.id)
        .single();
        
      if (userData?.languages) {
        setUserLanguages(userData.languages);
      }
      
      // TODO: Load actual words based on user's progress
      setLoading(false);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/auth/login');
    }
  };

  const handleKnow = async () => {
    const newCorrect = correct + 1;
    setCorrect(newCorrect);
    // TODO: Update user progress in database
  };

  const handleDontKnow = async () => {
    // TODO: Update user progress in database
  };

  const handleNext = (wasCorrect = false) => {
    const currentCorrect = wasCorrect ? correct + 1 : correct;
    setIsFlipped(false); // Reset flip state for next card
    
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Session complete
      router.push(`/practice/complete?correct=${currentCorrect}&total=${words.length}`);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className="bg-white pb-8" style={{ height: '100vh' }}>
      {/* Progress indicator at top */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${(currentIndex / words.length) * 100}%` }}
        />
      </div>
      
      {/* Main content area - calculated height */}
      <div className="p-8 h-full">
        <div className={`w-full h-full rounded-3xl transition-colors duration-300 ${isFlipped ? 'bg-black' : 'bg-gray-200'}`}>
          <Flashcard
            word={currentWord}
            userLanguages={userLanguages}
            onKnow={handleKnow}
            onDontKnow={handleDontKnow}
            onNext={handleNext}
            onFlip={setIsFlipped}
          />
        </div>
      </div>
      
      {/* Exit button at bottom - fixed height */}
      <div className="h-32 flex justify-center items-center">
        <button
          onClick={() => router.push('/')}
          className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="text-black">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}