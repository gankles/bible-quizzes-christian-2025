#!/bin/bash

# Test script for Bible Quiz application
echo "🧪 Running Bible Quiz Tests..."

# Run build test
echo "📦 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Run lint test
echo "🔍 Running linter..."
npm run lint

if [ $? -eq 0 ]; then
    echo "✅ Lint passed"
else
    echo "❌ Lint failed"
    exit 1
fi

# Test Docker build
echo "🐳 Testing Docker build..."
docker build -t bible-quiz-test .

if [ $? -eq 0 ]; then
    echo "✅ Docker build successful"
    # Clean up test image
    docker rmi bible-quiz-test
else
    echo "❌ Docker build failed"
    exit 1
fi

echo "🎉 All tests passed!"