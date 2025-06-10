#!/bin/bash

echo "🚀 Setting up SplitPay Backend..."

# Navigate to backend directory
cd backend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cp .env.example .env
    echo "✅ Created .env file. Please update it with your database credentials."
else
    echo "✅ .env file already exists."
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL first."
    echo "   macOS: brew install postgresql"
    echo "   Ubuntu: sudo apt-get install postgresql"
    exit 1
fi

# Ask if user wants to create database and tables
echo ""
read -p "Do you want to create the database and tables now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Create database
    echo "🗄️  Creating database..."
    createdb splitpay 2>/dev/null || echo "Database 'splitpay' may already exist."
    
    # Run schema
    echo "📋 Creating tables..."
    psql -d splitpay -f database.sql
    
    echo "✅ Database setup complete!"
fi

echo ""
echo "🎉 Backend setup complete!"
echo ""
echo "To start the development server:"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "The server will be available at http://localhost:3001" 