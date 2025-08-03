# Bible Quiz Application - SalvationCall

A comprehensive Next.js 14 Bible quiz application with TypeScript, Tailwind CSS, and Docker support. Features interactive quizzes for all 66 books of the Bible with detailed explanations and SEO optimization.

## 🚀 Features

- **Comprehensive Coverage**: Quizzes for all 66 Bible books (1,189+ chapters)
- **Linear Quiz Format**: All questions displayed on one page as mandated
- **Mixed Question Types**: 70% Multiple Choice, 20% True/False, 10% Fill-in-blank
- **Progressive Enhancement**: Works without JavaScript, enhanced with interactivity
- **SEO Optimized**: JSON-LD schema markup, meta tags, and sitemap generation
- **Mobile-First Design**: Responsive with 70% mobile menu constraint
- **Accessibility**: WCAG 2.1 AA compliance with keyboard navigation
- **Docker Ready**: Development and production Docker environments

## 📋 Requirements

- Node.js 18+
- Docker & Docker Compose (optional)
- Modern web browser

## 🛠️ Development Setup

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Docker Development (Recommended)

```bash
# Start development environment with hot reload
docker-compose up --build

# Or use the helper script
./scripts/dev.sh
```

The application will be available at `http://localhost:3000`

### Production Docker

```bash
# Build and run production container
docker-compose -f docker-compose.prod.yml up --build
```

## 📁 Project Structure

```
bible-quizzes-christian-2025/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with header/footer
│   ├── page.tsx                 # Homepage with featured quizzes
│   ├── genesis-1-quiz/          # Example chapter quiz
│   └── bible-quizzes/           # Quiz hub page
├── components/                   # Reusable React components
│   ├── Header.tsx               # Navigation with 70% mobile constraint
│   ├── Footer.tsx               # Comprehensive footer with Bible books
│   ├── QuizInterface.tsx        # Linear quiz interface
│   ├── QuizResults.tsx          # Results with internal linking
│   └── icons.tsx                # SVG icon components
├── lib/                         # Utility functions and data
│   ├── types.ts                 # TypeScript interfaces
│   ├── bible-data.ts            # 66 Bible books data
│   ├── quiz-data.ts             # Sample quiz questions
│   └── seo.ts                   # JSON-LD schema generation
├── public/images/               # Bible-themed images
├── scripts/                     # Development scripts
└── Docker files                 # Container configuration
```

## 🧪 Testing

```bash
# Run all tests (build, lint, Docker)
./scripts/test.sh

# Individual tests
npm run build    # Test build
npm run lint     # Test linting
```

## 📝 Quiz Structure

### Chapter Quizzes
- **Format**: Linear (all questions on one page)
- **Questions**: 16-20 per chapter
- **Types**: 70% MC, 20% T/F, 10% Fill-blank
- **Features**: Progress tracking, timer, detailed explanations

### Book Quizzes
- **Questions**: 20-25 comprehensive questions
- **Coverage**: Entire book overview
- **Difficulty**: Balanced across easy/medium/hard

## 🔧 Configuration

### Environment Variables

```bash
NODE_ENV=development|production
NEXT_TELEMETRY_DISABLED=1        # Optional: Disable Next.js telemetry
```

### Docker Environment

Development container includes:
- Hot reload with file watching
- Volume mounting for instant changes
- Port 3000 exposed
- Optimized for development workflow

## 📊 SEO Implementation

- **JSON-LD Schema**: Quiz, LearningResource, WebPage, Organization
- **Meta Tags**: Title, description, keywords optimized per page
- **Structured Data**: Rich snippets for search results
- **Internal Linking**: Comprehensive cross-referencing strategy
- **Sitemap**: Auto-generated for all quiz pages

## ♿ Accessibility Features

- **Keyboard Navigation**: Full app navigable via keyboard
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG 2.1 AA compliant
- **Mobile Touch Targets**: Minimum 44px tap areas

## 🚢 Deployment

### Digital Ocean / AWS

```bash
# Build production image
docker build -t bible-quiz-app .

# Deploy to container registry
docker tag bible-quiz-app your-registry/bible-quiz-app
docker push your-registry/bible-quiz-app
```

### Static Export (Optional)

```bash
# Generate static files
npm run build
npm run export
```

## 📚 API Documentation

### Quiz Data Structure

```typescript
interface Quiz {
  id: string;
  title: string;
  type: 'chapter' | 'book' | 'character' | 'theme';
  questions: QuizQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
  totalQuestions: number;
  estimatedTime: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  correctAnswer: string;
  explanation: string;
  verseReference: string;
}
```

## 🤝 Contributing

1. Follow the linear quiz format requirements
2. Maintain 70% MC, 20% T/F, 10% fill-blank distribution
3. Include Bible verse references for all questions
4. Test mobile responsiveness with 70% menu constraint
5. Validate accessibility with screen readers

## 📄 License

This project is licensed under the MIT License.
