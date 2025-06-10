# SplitPay Frontend

A modern React + TypeScript dashboard for the SplitPay expense splitting application.

## Features

- **Dark Theme Dashboard**: Modern dark UI with clean design
- **Overview Cards**: Display key metrics like Total Balance, Active Groups, Pending Actions, and Settled Payments
- **Interactive Charts**: Line chart for spending trends and bar chart for pending payments
- **Recent Activity Feed**: Live feed of recent transactions and activities
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Material-UI (MUI)** for UI components and styling
- **Recharts** for data visualization
- **Material Icons** for icons
- **React Router** for navigation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with header and sidebar
│   ├── Header.tsx      # Top navigation bar
│   ├── Sidebar.tsx     # Left navigation menu
│   ├── OverviewCards.tsx # Summary cards
│   ├── ChartSection.tsx  # Charts and graphs
│   └── RecentActivity.tsx # Activity feed
├── pages/              # Page components
│   └── Dashboard.tsx   # Main dashboard page
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Design System

The dashboard follows Material Design principles with a custom dark theme:

- **Colors**: Dark backgrounds (#1a1a1a, #2a2a2a) with bright green (#00ff88) accents for positive metrics
- **Typography**: Roboto font family for optimal readability
- **Spacing**: Consistent spacing using Material-UI's 8px grid system
- **Components**: Material Design components with custom dark theme styling
- **Cards**: Elevated cards with subtle borders and rounded corners
- **Icons**: Material Design icons for consistent visual language 