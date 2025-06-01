'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUser } from '@dutchdeck/utils';
import { supabase } from '@dutchdeck/db';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    wordsLearned: 0,
    currentStreak: 0,
    todayPracticed: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [router]);

  const checkAuth = async () => {
    try {
      const currentUser = await getUser();
      if (!currentUser) {
        router.push('/auth/login');
        return;
      }
      
      setUser(currentUser);
      
      // Load user stats
      const { data: settings, error: settingsError } = await supabase
        .from('user_settings')
        .select('current_streak, last_practice_date')
        .eq('user_id', currentUser.id)
        .single();
        
      if (settingsError) {
        console.log('No settings found, using defaults');
      }
        
      const { count: wordsCount } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact' })
        .eq('user_id', currentUser.id);
        
      const today = new Date().toDateString();
      const lastPractice = settings?.last_practice_date 
        ? new Date(settings.last_practice_date).toDateString() 
        : null;
        
      setStats({
        wordsLearned: wordsCount || 0,
        currentStreak: settings?.current_streak || 0,
        todayPracticed: lastPractice === today,
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/auth/login');
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white">
      <div className="max-w-md mx-auto px-6 py-16">
        {/* Minimal header */}
        <div className="flex justify-end items-center mb-20">
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/auth/login');
            }}
            className="text-xs text-gray-400 hover:text-black transition-colors"
          >
            Sign out
          </button>
        </div>

        {/* Hero section */}
        <div className="text-center mb-32">
          <h1 className="heading-ultra text-black mb-8">
            {user?.user_metadata?.name || 'Practice'}
          </h1>
          
          {/* Simple stats */}
          <div className="space-y-2 mb-16">
            <div className="text-sm text-gray-500">
              {stats.wordsLearned} words learned
            </div>
            {stats.currentStreak > 0 && (
              <div className="text-sm text-gray-500">
                {stats.currentStreak} day{stats.currentStreak !== 1 ? 's' : ''} streak
              </div>
            )}
          </div>
        </div>

        {/* Main action */}
        <div className="text-center mb-20">
          <Link
            href="/practice"
            className="inline-block"
          >
            <div className="w-64 h-64 bg-black rounded-3xl flex items-center justify-center hover:bg-gray-900 transition-colors cursor-pointer">
              <span className="text-white text-2xl font-medium">Practice</span>
            </div>
          </Link>
        </div>

        {/* Minimal bottom navigation */}
        <div className="flex justify-center items-center space-x-12">
          <Link href="/settings" className="w-6 h-6 bg-gray-200 rounded-full"></Link>
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <Link href="/progress" className="text-black text-2xl">+</Link>
        </div>
      </div>
    </div>
  );
}