"use client"

import React from 'react';
import { Link } from "react-router-dom"
import { useGroups } from "@/hooks/useGroups"
import { ROUTES, getGroupDetailRoute } from "@/constants/routes"
import { formatCurrency } from "@/utils/currency-formatter"
import Header from "@/components/core/Header"
import { Button } from "@/components/core/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/core/Card"
import { Badge, Avatar } from "@radix-ui/themes"
import LoadingSpinner from "@/components/core/LoadingSpinner"
import { Plus, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { useToast } from '../../context/ToastContext';

const DashboardPage: React.FC = () => {
  const { addToast } = useToast();
  const { groups, isLoading } = useGroups()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center pt-20">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  const totalBalance = groups.reduce((sum, group) => sum + group.yourBalance, 0)
  const totalExpenses = groups.reduce((sum, group) => sum + group.totalExpenses, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-2">Here's an overview of your shared expenses</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              {totalBalance >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(Math.abs(totalBalance))}
              </div>
              <p className="text-xs text-muted-foreground">{totalBalance >= 0 ? "You are owed" : "You owe"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{groups.length}</div>
              <p className="text-xs text-muted-foreground">Groups you're part of</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
              <p className="text-xs text-muted-foreground">Across all groups</p>
            </CardContent>
          </Card>
        </div>

        {/* Groups Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Groups</h2>
          <div className="flex space-x-3">
            <Button asChild variant="outline">
              <Link to={ROUTES.GROUP_JOIN}>Join Group</Link>
            </Button>
            <Button asChild>
              <Link to={ROUTES.GROUP_CREATE}>
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Link>
            </Button>
          </div>
        </div>

        {/* Groups Grid */}
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to={getGroupDetailRoute(group.id)}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge color={group.yourBalance >= 0 ? "green" : "red"} className="ml-2">
                        {group.yourBalance >= 0 ? "+" : ""}
                        {formatCurrency(group.yourBalance)}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <span>{group.members.length} members</span>
                      <span>{formatCurrency(group.totalExpenses)} total</span>
                    </div>
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 4).map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-white" fallback={
                          member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        } />
                      ))}
                      {group.members.length > 4 && (
                        <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600">+{group.members.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No groups yet</h3>
              <p className="text-gray-600 mb-6">Create your first group to start splitting expenses</p>
              <Button asChild>
                <Link to={ROUTES.GROUP_CREATE}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Group
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default DashboardPage;
