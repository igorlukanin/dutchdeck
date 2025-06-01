'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@dutchdeck/utils';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(email, password, name);
      router.push('/auth/verify-email');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
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
            Register
          </h1>
          <p className="text-sm text-gray-500 mb-16">
            Start learning Dutch
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
                id="name"
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-0 py-4 text-lg bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-black placeholder-gray-400"
              />
            </div>
            
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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-0 py-4 text-lg bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-black placeholder-gray-400"
              />
              <p className="mt-2 text-xs text-gray-400">At least 6 characters</p>
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-3xl text-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="text-sm text-center pt-4">
            <span className="text-gray-500">Already have an account? </span>
            <Link href="/auth/login" className="text-black hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}