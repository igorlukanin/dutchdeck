'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Flashcard, ProgressBar } from '@dutchdeck/ui';
import { supabase } from '@dutchdeck/db';
import { getUser } from '@dutchdeck/utils';
import type { Database } from '@dutchdeck/db';

type Word = Database['public']['Tables']['words']['Row'];

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
];

export default function PracticePage() {
  const router = useRouter();
  const [words, setWords] = useState<Word[]>(mockWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [userLanguages, setUserLanguages] = useState(['en']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

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
    setCorrect(correct + 1);
    // TODO: Update user progress in database
  };

  const handleDontKnow = async () => {
    // TODO: Update user progress in database
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Session complete
      router.push(`/practice/complete?correct=${correct}&total=${words.length}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Practice</h1>
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            Exit
          </button>
        </div>
        
        <ProgressBar 
          current={currentIndex + 1}
          total={words.length}
          correct={correct}
        />
        
        <Flashcard
          word={currentWord}
          userLanguages={userLanguages}
          onKnow={handleKnow}
          onDontKnow={handleDontKnow}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}