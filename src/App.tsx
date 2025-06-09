"use client"

import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import { ROUTES } from "./constants/routes"
import { Theme } from "@radix-ui/themes"

// Main Pages
import DashboardPage from "@/pages/dashboard/DashboardPage"
import GroupListPage from "@/pages/groups/GroupListPage"
import GroupDetailPage from "@/pages/groups/GroupDetailPage"
import ExpenseListPage from "@/pages/expenses/ExpenseListPage"
import ExpenseDetailPage from "@/pages/expenses/ExpenseDetailPage"
import SettingsPage from "@/pages/settings/SettingsPage"

// Components
import ErrorBoundary from "@/components/shared/ErrorBoundary"
import LoadingSpinner from "@/components/core/LoadingSpinner"
import Toast from "@/components/shared/Toast"

const App: React.FC = () => {
  return (
    <Theme>
      <ErrorBoundary>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Main Routes */}
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.GROUPS} element={<GroupListPage />} />
            <Route path={ROUTES.GROUP_DETAIL} element={<GroupDetailPage />} />
            <Route path={ROUTES.EXPENSES} element={<ExpenseListPage />} />
            <Route path={ROUTES.EXPENSE_DETAIL} element={<ExpenseDetailPage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} />} />
          </Routes>
          <Toast />
        </div>
      </ErrorBoundary>
    </Theme>
  )
}

export default App
