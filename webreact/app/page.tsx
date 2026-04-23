import Link from 'next/link';

export default function Home() {
  return (
    <section className="py-24">
      <div className="container mx-auto flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-center text-blue-600">Welcome to Chess Game</h1>
        <p className="text-center max-w-lg text-gray-600">
          Play chess online with real-time matching and chat. Challenge your friends or find opponents worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Login
          </Link>
          <Link href="/register" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
