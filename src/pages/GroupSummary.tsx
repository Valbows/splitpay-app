"use client"

import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, TrendingDown, Users, DollarSign, ArrowRight, PieChart, BarChart3 } from "lucide-react"
import { useApp } from "../App"

export default function GroupSummary() {
  const { id } = useParams()
  const { groups } = useApp()
  const group = groups.find((g) => g.id === id)

  // Mock detailed financial data
  const balances = [
    { user: { id: "1", name: "John Doe", email: "john@example.com" }, balance: -125.25 },
    { user: { id: "2", name: "Jane Smith", email: "jane@example.com" }, balance: 75.5 },
    { user: { id: "3", name: "Bob Wilson", email: "bob@example.com" }, balance: 49.75 },
  ]

  const settlements = [
    {
      from: { id: "1", name: "John Doe" },
      to: { id: "2", name: "Jane Smith" },
      amount: 75.5,
    },
    {
      from: { id: "1", name: "John Doe" },
      to: { id: "3", name: "Bob Wilson" },
      amount: 49.75,
    },
  ]

  const categoryBreakdown = [
    { category: "Food & Dining", amount: 485.5, percentage: 38.8 },
    { category: "Utilities", amount: 320.0, percentage: 25.6 },
    { category: "Transportation", amount: 245.25, percentage: 19.6 },
    { category: "Entertainment", amount: 125.0, percentage: 10.0 },
    { category: "Other", amount: 75.0, percentage: 6.0 },
  ]

  const monthlyTrend = [
    { month: "Jan", amount: 450.25 },
    { month: "Feb", amount: 380.5 },
    { month: "Mar", amount: 420.0 },
    { month: "Apr", amount: 520.75 },
    { month: "May", amount: 485.5 },
  ]

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Group not found</h2>
          <Button asChild>
            <Link to="/">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  const totalOwed = balances.filter((b) => b.balance < 0).reduce((sum, b) => sum + Math.abs(b.balance), 0)
  const totalOwing = balances.filter((b) => b.balance > 0).reduce((sum, b) => sum + b.balance, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link to={`/group/${id}`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Group
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Financial Summary</h1>
                <p className="text-sm text-gray-600">{group.name}</p>
              </div>
            </div>
            <Button asChild>
              <Link to={`/group/${id}/add-expense`}>Add Expense</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${group.totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Across all transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Owed</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalOwed.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Amount to be settled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Owing</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalOwing.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Amount to be received</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{group.members.length}</div>
              <p className="text-xs text-muted-foreground">Active participants</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="balances" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="balances">Balances</TabsTrigger>
            <TabsTrigger value="settlements">Settlements</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="balances" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Balances</CardTitle>
                <CardDescription>Current balance for each group member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {balances.map((balance) => (
                    <div key={balance.user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {balance.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{balance.user.name}</h4>
                          <p className="text-sm text-gray-600">{balance.user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-xl font-bold ${balance.balance >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {balance.balance >= 0 ? "+" : ""}${balance.balance.toFixed(2)}
                        </div>
                        <p className="text-sm text-gray-600">{balance.balance >= 0 ? "is owed" : "owes"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settlements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Settlements</CardTitle>
                <CardDescription>Optimal way to settle all debts with minimum transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {settlements.length > 0 ? (
                  <div className="space-y-4">
                    {settlements.map((settlement, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {settlement.from.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{settlement.from.name}</span>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {settlement.to.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{settlement.to.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">${settlement.amount.toFixed(2)}</div>
                          <Button size="sm" variant="outline" className="mt-2">
                            Mark as Paid
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Settlement Summary</h4>
                      <p className="text-sm text-green-800">
                        With these {settlements.length} transactions, all debts will be settled.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All Settled!</h3>
                    <p className="text-gray-600">No outstanding balances in this group.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Expense Categories
                </CardTitle>
                <CardDescription>Breakdown of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryBreakdown.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.category}</span>
                        <div className="text-right">
                          <span className="font-bold">${category.amount.toFixed(2)}</span>
                          <span className="text-sm text-gray-600 ml-2">({category.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Monthly Spending Trend
                </CardTitle>
                <CardDescription>Group expenses over the last 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrend.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="font-medium w-12">{month.month}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-600 h-3 rounded-full"
                            style={{ width: `${(month.amount / 600) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="font-bold w-20 text-right">${month.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Insights</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>
                      • Highest spending month: April (${Math.max(...monthlyTrend.map((m) => m.amount)).toFixed(2)})
                    </li>
                    <li>
                      • Average monthly spending: $
                      {(monthlyTrend.reduce((sum, m) => sum + m.amount, 0) / monthlyTrend.length).toFixed(2)}
                    </li>
                    <li>• Most recent month shows moderate spending</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
