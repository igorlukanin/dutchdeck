'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUser } from '@woorden/utils';
import { supabase } from '@woorden/db';

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
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await getUser();
      if (!currentUser) {
        router.push('/auth/login');
        return;
      }
      
      setUser(currentUser);
      
      // Load user stats
      const { data: settings } = await supabase
        .from('user_settings')
        .select('current_streak, last_practice_date')
        .eq('user_id', currentUser.id)
        .single();
        
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back{user?.user_metadata?.name ? `, ${user.user_metadata.name}` : ''}!
          </h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/auth/login');
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            Sign out
          </button>
        </header>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Words Learned</h3>
            <p className="text-3xl font-bold text-[#21468B]">{stats.wordsLearned}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Streak</h3>
            <p className="text-3xl font-bold text-[#FF6B00]">
              {stats.currentStreak} {stats.currentStreak === 1 ? 'day' : 'days'}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Today's Status</h3>
            <p className="text-2xl font-bold">
              {stats.todayPracticed ? (
                <span className="text-green-500">✓ Practiced</span>
              ) : (
                <span className="text-gray-400">Not yet</span>
              )}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Link
            href="/practice"
            className="block w-full bg-[#21468B] text-white text-center py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Practice Session
          </Link>
          
          <Link
            href="/assessment"
            className="block w-full bg-white text-[#21468B] text-center py-4 rounded-lg font-medium border-2 border-[#21468B] hover:bg-gray-50 transition-colors"
          >
            Take Assessment Test
          </Link>
          
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/progress"
              className="block text-center py-3 text-gray-700 hover:text-[#21468B] transition-colors"
            >
              View Progress →
            </Link>
            
            <Link
              href="/settings"
              className="block text-center py-3 text-gray-700 hover:text-[#21468B] transition-colors"
            >
              Settings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}