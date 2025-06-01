export default function VerifyEmailPage() {
  return (
    <div className="h-screen bg-white">
      <div className="max-w-md mx-auto px-6 py-16">

        {/* Hero section */}
        <div className="text-center mb-20">
          <h1 className="heading-ultra text-black mb-8">
            Check Email
          </h1>
          
          <div className="space-y-4 text-sm text-gray-500">
            <p>
              We&apos;ve sent you a confirmation link to verify your email address.
            </p>
            <p>
              Please check your inbox and click the link to activate your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}