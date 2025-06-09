"use client"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Users, Receipt, BarChart3, UserPlus, Calendar, DollarSign } from "lucide-react"
import { useApp } from "../App"

export default function GroupDetail() {
  const { id } = useParams()
  const { groups } = useApp()
  const group = groups.find((g) => g.id === id)

  // Mock expenses data
  const [expenses] = useState([
    {
      id: "1",
      description: "Grocery Shopping",
      amount: 85.5,
      paidBy: { id: "1", name: "John Doe", email: "john@example.com" },
      date: new Date("2024-01-20"),
      category: "Food",
      splitBetween: [
        { user: { id: "1", name: "John Doe", email: "john@example.com" }, amount: 28.5 },
        { user: { id: "2", name: "Jane Smith", email: "jane@example.com" }, amount: 28.5 },
        { user: { id: "3", name: "Bob Wilson", email: "bob@example.com" }, amount: 28.5 },
      ],
    },
    {
      id: "2",
      description: "Electricity Bill",
      amount: 120.0,
      paidBy: { id: "2", name: "Jane Smith", email: "jane@example.com" },
      date: new Date("2024-01-18"),
      category: "Utilities",
      splitBetween: [
        { user: { id: "1", name: "John Doe", email: "john@example.com" }, amount: 40.0 },
        { user: { id: "2", name: "Jane Smith", email: "jane@example.com" }, amount: 40.0 },
        { user: { id: "3", name: "Bob Wilson", email: "bob@example.com" }, amount: 40.0 },
      ],
    },
  ])

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{group.name}</h1>
                <p className="text-sm text-gray-600">{group.members.length} members</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/group/${id}/invite`}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to={`/group/${id}/add-expense`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${group.yourBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                {group.yourBalance >= 0 ? "+" : ""}${group.yourBalance.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">{group.yourBalance >= 0 ? "You are owed" : "You owe"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${group.totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{expenses.length} transactions</p>
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

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link to={`/group/${id}/summary`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">View Summary</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium text-blue-600">Detailed Report</div>
                <p className="text-xs text-muted-foreground">Who owes whom</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="expenses">Recent Expenses</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Expenses</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/group/${id}/upload-receipt`}>
                    <Receipt className="h-4 w-4 mr-2" />
                    Scan Receipt
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to={`/group/${id}/add-expense`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Manually
                  </Link>
                </Button>
              </div>
            </div>

            {expenses.length > 0 ? (
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <Card key={expense.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-lg">{expense.description}</h4>
                            <Badge variant="secondary">{expense.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {expense.date.toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <span>Paid by</span>
                              <Avatar className="h-6 w-6 mx-2">
                                <AvatarFallback className="text-xs">
                                  {expense.paidBy.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{expense.paidBy.name}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">${expense.amount.toFixed(2)}</div>
                          <div className="text-sm text-gray-600">Split {expense.splitBetween.length} ways</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
                  <p className="text-gray-600 mb-6">Start by adding your first expense to this group</p>
                  <div className="flex justify-center space-x-4">
                    <Button asChild>
                      <Link to={`/group/${id}/add-expense`}>Add Expense</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to={`/group/${id}/upload-receipt`}>Scan Receipt</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Group Members</h3>
              <Button size="sm" asChild>
                <Link to={`/group/${id}/invite`}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.members.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
