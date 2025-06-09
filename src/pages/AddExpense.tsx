"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, DollarSign, Receipt, Calculator } from "lucide-react"
import { useApp } from "../App"
import { useToast } from "@/hooks/use-toast"

export default function AddExpense() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { groups, user } = useApp()
  const { toast } = useToast()

  const group = groups.find((g) => g.id === id)

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    paidBy: user?.id || "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const [splitType, setSplitType] = useState<"equal" | "custom">("equal")
  const [selectedMembers, setSelectedMembers] = useState<string[]>(group?.members.map((m) => m.id) || [])
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    "Food & Dining",
    "Transportation",
    "Accommodation",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Healthcare",
    "Other",
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

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
  }

  const calculateSplit = () => {
    const amount = Number.parseFloat(formData.amount)
    if (isNaN(amount) || selectedMembers.length === 0) return {}

    if (splitType === "equal") {
      const perPerson = amount / selectedMembers.length
      return selectedMembers.reduce(
        (acc, memberId) => ({
          ...acc,
          [memberId]: perPerson.toFixed(2),
        }),
        {},
      )
    }

    return customAmounts
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate
    const amount = Number.parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid expense amount.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (selectedMembers.length === 0) {
      toast({
        title: "No members selected",
        description: "Please select at least one member to split the expense with.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Expense added successfully!",
      description: `${formData.description} has been added to the group.`,
    })

    setIsLoading(false)
    navigate(`/group/${id}`)
  }

  const splitAmounts = calculateSplit()
  const totalSplit = Object.values(splitAmounts).reduce((sum, amount) => sum + Number.parseFloat(amount || "0"), 0)
  const expenseAmount = Number.parseFloat(formData.amount) || 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link to={`/group/${id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Group
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Add Expense</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Expense Details
                </CardTitle>
                <CardDescription>Enter the details of your shared expense</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Input
                        id="description"
                        placeholder="e.g., Dinner at restaurant"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="pl-10"
                          value={formData.amount}
                          onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paidBy">Paid by</Label>
                    <Select
                      value={formData.paidBy}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, paidBy: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Who paid for this expense?" />
                      </SelectTrigger>
                      <SelectContent>
                        {group.members.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback className="text-xs">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional details about this expense..."
                      value={formData.notes}
                      onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="button" variant="outline" className="flex-1" asChild>
                      <Link to={`/group/${id}`}>Cancel</Link>
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add Expense"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Split Configuration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Split Configuration
                </CardTitle>
                <CardDescription>Choose how to split this expense</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="equal"
                      checked={splitType === "equal"}
                      onCheckedChange={() => setSplitType("equal")}
                    />
                    <Label htmlFor="equal">Split equally</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="custom"
                      checked={splitType === "custom"}
                      onCheckedChange={() => setSplitType("custom")}
                    />
                    <Label htmlFor="custom">Custom amounts</Label>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Split between:</Label>
                  {group.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={() => handleMemberToggle(member.id)}
                        />
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                      {selectedMembers.includes(member.id) && (
                        <div className="text-sm font-medium">${splitAmounts[member.id] || "0.00"}</div>
                      )}
                    </div>
                  ))}
                </div>

                {expenseAmount > 0 && selectedMembers.length > 0 && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Total expense:</span>
                        <span className="font-medium">${expenseAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total split:</span>
                        <span className="font-medium">${totalSplit.toFixed(2)}</span>
                      </div>
                      {Math.abs(totalSplit - expenseAmount) > 0.01 && (
                        <div className="flex justify-between text-red-600">
                          <span>Difference:</span>
                          <span className="font-medium">${Math.abs(totalSplit - expenseAmount).toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Receipt className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-3">Have a receipt?</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to={`/group/${id}/upload-receipt`}>Scan Receipt Instead</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
