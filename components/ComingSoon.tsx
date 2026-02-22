'use client';

import Link from 'next/link';
import { BookOpenIcon, ArrowLeftIcon } from './icons';

interface ComingSoonProps {
  title?: string;
  description?: string;
  expectedDate?: string;
}

export default function ComingSoon({ 
  title = "Coming Soon", 
  description = "We're working hard to bring you this content. Check back soon!",
  expectedDate = "Early 2025"
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
            <BookOpenIcon className="h-10 w-10 text-blue-600" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-bold font-display text-scripture mb-4">
          {title}
        </h1>
        
        <p className="text-xl text-primary-dark/70 mb-6 max-w-lg mx-auto">
          {description}
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-blue-800 font-medium mb-2">
            🚧 Currently focusing on Genesis content
          </p>
          <p className="text-blue-700 text-sm">
            We're building comprehensive Bible quizzes starting with Genesis. 
            Expected launch: <span className="font-semibold">{expectedDate}</span>
          </p>
        </div>

        {/* Available Content */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-scripture mb-4">
            Available Now:
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/genesis-quiz"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Genesis Quiz
            </Link>
            <Link
              href="/genesis-1-quiz"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Genesis Chapter 1
            </Link>
            <Link
              href="/genesis-chapters"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Genesis Chapters
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Homepage</span>
          </Link>
          
          <Link
            href="/bible-quizzes"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Available Quizzes
          </Link>
        </div>

        {/* Notification Signup */}
        <div className="mt-12 bg-primary-light/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-scripture mb-2">
            Get Notified When We Launch
          </h3>
          <p className="text-primary-dark/70 text-sm mb-4">
            Be the first to know when new Bible quizzes are available.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-grace rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}