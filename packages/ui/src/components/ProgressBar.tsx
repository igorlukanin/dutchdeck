interface ProgressBarProps {
  current: number;
  total: number;
  correct: number;
}

export function ProgressBar({ current, total, correct }: ProgressBarProps) {
  const progress = (current / total) * 100;
  const accuracy = current > 0 ? (correct / current) * 100 : 0;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{current} / {total} words</span>
        <span>{accuracy.toFixed(0)}% correct</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-dutch-blue transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}