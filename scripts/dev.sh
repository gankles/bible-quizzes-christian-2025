#!/bin/bash

# Development script for Bible Quiz application
echo "🚀 Starting Bible Quiz Development Environment..."

# Build and start development container
docker-compose -f docker-compose.yml up --build

echo "✅ Development environment is running at http://localhost:3000"