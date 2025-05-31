'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PracticeCompletePage() {
  const searchParams = useSearchParams();
  const correct = searchParams.get('correct') || '0';
  const total = searchParams.get('total') || '0';
  const accuracy = total !== '0' ? ((parseInt(correct) / parseInt(total)) * 100).toFixed(0) : '0';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Practice Complete!
          </h1>
          <p className="text-gray-600">
            Great job on completing your practice session
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Words Practiced</p>
              <p className="text-2xl font-bold text-[#21468B]">{total}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-[#FF6B00]">{accuracy}%</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Link
            href="/practice"
            className="block w-full bg-[#21468B] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Practice More
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}