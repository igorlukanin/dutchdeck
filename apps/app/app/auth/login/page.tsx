'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@dutchdeck/utils';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white">
      <div className="max-w-md mx-auto px-6 py-16">

        {/* Hero section */}
        <div className="text-center mb-20">
          <h1 className="heading-ultra text-black mb-8">
            Login
          </h1>
          <p className="text-sm text-gray-500 mb-16">
            Continue learning Dutch
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-0 py-4 text-lg bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-black placeholder-gray-400"
              />
            </div>
            
            <div>
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-0 py-4 text-lg bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-black placeholder-gray-400"
              />
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-3xl text-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-sm text-center pt-4">
            <span className="text-gray-500">Don&apos;t have an account? </span>
            <Link href="/auth/register" className="text-black hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}