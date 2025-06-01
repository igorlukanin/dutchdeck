'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PracticeCompletePage() {
  const searchParams = useSearchParams();
  const correct = searchParams.get('correct') || '0';
  const total = searchParams.get('total') || '0';
  const accuracy = total !== '0' ? ((parseInt(correct) / parseInt(total)) * 100).toFixed(0) : '0';

  return (
    <div className="h-screen bg-white">
      <div className="max-w-md mx-auto px-6 py-16">

        {/* Hero section */}
        <div className="text-center mb-32">
          <h1 className="heading-ultra text-black mb-8">
            Complete
          </h1>
          
          <div className="space-y-6 mb-16">
            <div>
              <div className="text-4xl font-bold text-black mb-2">{total}</div>
              <div className="text-sm text-gray-500">words practiced</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">{accuracy}%</div>
              <div className="text-sm text-gray-500">accuracy</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/practice"
            className="block w-full bg-black text-white py-4 rounded-3xl text-lg font-medium hover:bg-gray-900 transition-colors text-center"
          >
            Practice More
          </Link>
          
          <Link
            href="/"
            className="block w-full text-gray-500 py-4 text-center hover:text-black transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}