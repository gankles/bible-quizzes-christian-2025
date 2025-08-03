import Link from 'next/link';
import Image from 'next/image';
import { PlayIcon, ClockIcon, CheckCircleIcon, ArrowRightIcon, BookOpenIcon } from '@/components/icons';
import { BIBLE_BOOKS } from '@/lib/bible-data';

// Featured quizzes data
const featuredQuizzes = [
  {
    title: 'Genesis Chapter 1 Quiz',
    description: 'Test your knowledge of the creation account with 16 questions covering the seven days of creation.',
    href: '/genesis-1-quiz',
    difficulty: 'Easy',
    questions: 16,
    time: 8,
    book: 'Genesis',
    chapter: 1,
    popular: true,
    image: '/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png',
    imageAlt: 'Beautiful Bible verse highlighting the creation account in Genesis'
  },
  {
    title: 'John Chapter 3 Quiz', 
    description: 'Explore Jesus\'s conversation with Nicodemus and the famous John 3:16 passage.',
    href: '/john-3-quiz',
    difficulty: 'Medium',
    questions: 18,
    time: 10,
    book: 'John',
    chapter: 3,
    popular: true,
    image: '/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png',
    imageAlt: 'Gentle hands holding an open Bible with divine light pouring down'
  },
  {
    title: 'Psalms 23 Quiz',
    description: 'Deep dive into the beloved Shepherd\'s Psalm with detailed questions and explanations.',
    href: '/psalms-23-quiz', 
    difficulty: 'Easy',
    questions: 12,
    time: 6,
    book: 'Psalms',
    chapter: 23,
    popular: true,
    image: '/images/veneeth_john_Close-up_of_hands_clasped_in_prayer_over_an_old_wo_4102fcf6-a02b-451e-978c-3a8e1f9fa12d.png',
    imageAlt: 'Hands clasped in prayer over an old wooden Bible'
  },
  {
    title: 'Romans Chapter 8 Quiz',
    description: 'Test your understanding of life in the Spirit and God\'s love in Christ Jesus.',
    href: '/romans-8-quiz',
    difficulty: 'Hard', 
    questions: 20,
    time: 12,
    book: 'Romans',
    chapter: 8,
    popular: true,
    image: '/images/alex.iaquinto_4k_close_up_photo_of_man_praying_while_the_glory__281c620b-2697-4bce-88fc-db85b2e1c270.png',
    imageAlt: 'Close-up photo of man praying while surrounded by divine glory'
  }
];

const quickStats = [
  { label: 'Bible Books', value: '66', description: 'Complete coverage of all Bible books' },
  { label: 'Quiz Questions', value: '1,200+', description: 'Carefully crafted questions with explanations' },
  { label: 'Chapters Covered', value: '1,189', description: 'Every chapter of the Bible has a quiz' },
  { label: 'Happy Users', value: '10,000+', description: 'People improving their Bible knowledge' }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mrmkaj_Gentle_hands_holding_an_open_Bible_light_pouring_down_on_ca8c94ca-5316-47b7-a335-94f60bbfc8a8.png"
            alt="Gentle hands holding an open Bible with divine light pouring down from heaven"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Test Your{' '}
              <span className="text-blue-600">Bible Knowledge</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive Bible quizzes for all 66 books. From Genesis to Revelation, 
              deepen your understanding with interactive quizzes designed for every skill level.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Bible books, chapters, or topics..."
                  className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg leading-5 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg shadow-lg"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/bible-quizzes"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <PlayIcon className="h-5 w-5" />
                <span>Start Quiz Now</span>
              </Link>
              <Link
                href="/genesis-1-quiz"
                className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                Try Genesis 1 Quiz
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {quickStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-600">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quizzes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Bible Quizzes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start with these popular quizzes, loved by thousands of Bible students worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredQuizzes.map((quiz) => (
              <div key={quiz.href} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                {/* Quiz Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={quiz.image}
                    alt={quiz.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      quiz.difficulty === 'Easy' ? 'bg-green-100/90 text-green-800' :
                      quiz.difficulty === 'Medium' ? 'bg-yellow-100/90 text-yellow-800' :
                      'bg-red-100/90 text-red-800'
                    }`}>
                      {quiz.difficulty}
                    </span>
                    {quiz.popular && (
                      <span className="px-2 py-1 bg-blue-100/90 text-blue-800 rounded-full text-xs font-medium backdrop-blur-sm">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {quiz.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {quiz.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>{quiz.questions} Questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>~{quiz.time} min</span>
                    </div>
                  </div>
                  
                  <Link
                    href={quiz.href}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Take Quiz</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/bible-quizzes"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <span>View All Bible Quizzes</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bible Books Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Bible Book
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore quizzes for every book of the Bible. From familiar stories to deep theological concepts.
            </p>
          </div>

          {/* Old Testament */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Old Testament</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {BIBLE_BOOKS.filter(book => book.testament === 'old').map((book) => (
                <Link
                  key={book.slug}
                  href={`/${book.slug}-chapters`}
                  className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                >
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                    {book.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* New Testament */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">New Testament</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {BIBLE_BOOKS.filter(book => book.testament === 'new').map((book) => (
                <Link
                  key={book.slug}
                  href={`/${book.slug}-chapters`}
                  className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                >
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                    {book.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Bible Quizzes?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Coverage</h3>
              <p className="text-gray-600">
                Every book, every chapter of the Bible has been carefully crafted into engaging quizzes 
                with detailed explanations and verse references.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick & Engaging</h3>
              <p className="text-gray-600">
                Most quizzes take 5-15 minutes to complete, perfect for daily Bible study, 
                Sunday school preparation, or group activities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <PlayIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                Multiple choice, true/false, and fill-in-the-blank questions keep you engaged 
                while building deeper biblical understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Test Your Bible Knowledge?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of believers who are growing in their faith through interactive Bible study
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/bible-quizzes"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            >
              <BookOpenIcon className="h-5 w-5" />
              <span>Browse All Quizzes</span>
            </Link>
            <Link
              href="/genesis-1-quiz"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <PlayIcon className="h-5 w-5" />
              <span>Start Your First Quiz</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
