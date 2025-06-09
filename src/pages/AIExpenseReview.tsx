"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Bot, Edit, Check, AlertTriangle, DollarSign, Calendar, Store, Calculator } from "lucide-react"
import { useApp } from "../App"
import { useToast } from "@/hooks/use-toast"

export default function AIExpenseReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { groups, user } = useApp()
  const { toast } = useToast()

  const group = groups.find((g) => g.id === id)
  const { extractedData, receiptUrl } = location.state || {}

  const [formData, setFormData] = useState({
    description: extractedData?.description || "",
    amount: extractedData?.amount || "",
    category: extractedData?.category || "",
    paidBy: user?.id || "",
    date: extractedData?.date || new Date().toISOString().split("T")[0],
    merchant: extractedData?.merchant || "",
  })

  const [selectedMembers, setSelectedMembers] = useState<string[]>(group?.members.map((m) => m.id) || [])
  const [isLoading, setIsLoading] = useState(false)
  const [confidence] = useState({
    description: 0.95,
    amount: 0.98,
    date: 0.92,
    merchant: 0.89,
  })

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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-600 bg-green-100"
    if (confidence >= 0.7) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.9) return <Check className="h-3 w-3" />
    if (confidence >= 0.7) return <Edit className="h-3 w-3" />
    return <AlertTriangle className="h-3 w-3" />
  }

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
  }

  const calculateSplit = () => {
    const amount = Number.parseFloat(formData.amount)
    if (isNaN(amount) || selectedMembers.length === 0) return {}

    const perPerson = amount / selectedMembers.length
    return selectedMembers.reduce(
      (acc, memberId) => ({
        ...acc,
        [memberId]: perPerson.toFixed(2),
      }),
      {},
    )
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link to={`/group/${id}/upload-receipt`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Upload
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Review AI Extracted Data</h1>
              <p className="text-sm text-gray-600">{group.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Receipt Preview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  Original Receipt
                </CardTitle>
                <CardDescription>AI-processed receipt image</CardDescription>
              </CardHeader>
              <CardContent>
                {receiptUrl ? (
                  <img src={receiptUrl || "/placeholder.svg"} alt="Receipt" className="w-full rounded-lg border" />
                ) : (
                  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No receipt image</span>
                  </div>
                )}

                <div className="mt-4 space-y-3">
                  <h4 className="font-medium text-sm">AI Confidence Levels</h4>
                  {Object.entries(confidence).map(([field, conf]) => (
                    <div key={field} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{field}</span>
                      <Badge variant="secondary" className={getConfidenceColor(conf)}>
                        {getConfidenceIcon(conf)}
                        <span className="ml-1">{Math.round(conf * 100)}%</span>
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Edit className="h-5 w-5 mr-2" />
                  Review & Edit Expense Details
                </CardTitle>
                <CardDescription>
                  Verify the AI-extracted information and make any necessary corrections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="description" className="flex items-center">
                        Description *
                        <Badge variant="secondary" className={`ml-2 ${getConfidenceColor(confidence.description)}`}>
                          {getConfidenceIcon(confidence.description)}
                          <span className="ml-1">{Math.round(confidence.description * 100)}%</span>
                        </Badge>
                      </Label>
                      <Input
                        id="description"
                        placeholder="e.g., Grocery shopping"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="flex items-center">
                        Amount *
                        <Badge variant="secondary" className={`ml-2 ${getConfidenceColor(confidence.amount)}`}>
                          {getConfidenceIcon(confidence.amount)}
                          <span className="ml-1">{Math.round(confidence.amount * 100)}%</span>
                        </Badge>
                      </Label>
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
                      <Label htmlFor="merchant" className="flex items-center">
                        Merchant
                        <Badge variant="secondary" className={`ml-2 ${getConfidenceColor(confidence.merchant)}`}>
                          {getConfidenceIcon(confidence.merchant)}
                          <span className="ml-1">{Math.round(confidence.merchant * 100)}%</span>
                        </Badge>
                      </Label>
                      <div className="relative">
                        <Store className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="merchant"
                          placeholder="Store or restaurant name"
                          className="pl-10"
                          value={formData.merchant}
                          onChange={(e) => setFormData((prev) => ({ ...prev, merchant: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center">
                        Date
                        <Badge variant="secondary" className={`ml-2 ${getConfidenceColor(confidence.date)}`}>
                          {getConfidenceIcon(confidence.date)}
                          <span className="ml-1">{Math.round(confidence.date * 100)}%</span>
                        </Badge>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="date"
                          type="date"
                          className="pl-10"
                          value={formData.date}
                          onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
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
                  </div>

                  {/* Split Configuration */}
                  <div className="border-t pt-6">
                    <div className="flex items-center mb-4">
                      <Calculator className="h-5 w-5 mr-2" />
                      <h3 className="text-lg font-medium">Split Configuration</h3>
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

                    {Number.parseFloat(formData.amount) > 0 && selectedMembers.length > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg mt-4">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Total expense:</span>
                            <span className="font-medium">${Number.parseFloat(formData.amount).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Split {selectedMembers.length} ways:</span>
                            <span className="font-medium">
                              ${(Number.parseFloat(formData.amount) / selectedMembers.length).toFixed(2)} each
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <Button type="button" variant="outline" className="flex-1" asChild>
                      <Link to={`/group/${id}/upload-receipt`}>Back to Upload</Link>
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Confirm & Add Expense"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
