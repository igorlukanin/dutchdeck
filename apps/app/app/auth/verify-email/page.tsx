export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Check your email
          </h2>
          <p className="text-gray-600">
            We've sent you a confirmation link to verify your email address.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Please check your inbox and click the link to activate your account.
          </p>
        </div>
      </div>
    </div>
  );
}