"use client"

import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import { ROUTES } from "./constants/routes"

// Pages
import DashboardPage from "@/pages/dashboard/DashboardPage"
import GroupListPage from "@/pages/groups/GroupListPage"
import GroupDetailPage from "@/pages/groups/GroupDetailPage"
import ExpenseListPage from "@/pages/expenses/ExpenseListPage"
import ExpenseDetailPage from "@/pages/expenses/ExpenseDetailPage"
import SettingsPage from "@/pages/settings/SettingsPage"
import NotFoundPage from "./pages/NotFoundPage"

// Components
import ErrorBoundary from "./components/shared/ErrorBoundary"
import LoadingSpinner from "./components/core/LoadingSpinner"
import Toast from "./components/shared/Toast"

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public routes */}
          <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.DASHBOARD} />} />
          
          {/* Protected routes */}
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.GROUPS} element={<GroupListPage />} />
          <Route path={`${ROUTES.GROUPS}/:id`} element={<GroupDetailPage />} />
          <Route path={ROUTES.EXPENSES} element={<ExpenseListPage />} />
          <Route path={`${ROUTES.EXPENSES}/:id`} element={<ExpenseDetailPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          
          {/* Catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App 