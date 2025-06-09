"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Users } from "lucide-react"
import { useApp } from "../App"
import { useToast } from "@/hooks/use-toast"

export default function CreateGroup() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user, groups, setGroups } = useApp()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newGroup = {
      id: Date.now().toString(),
      name,
      description,
      members: [user],
      createdAt: new Date(),
      totalExpenses: 0,
      yourBalance: 0,
    }

    setGroups([...groups, newGroup])

    toast({
      title: "Group created successfully!",
      description: `${name} is ready for expense tracking.`,
    })

    setIsLoading(false)
    navigate(`/group/${newGroup.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Create New Group</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Create a New Group</CardTitle>
            <CardDescription>
              Set up a group to start tracking shared expenses with friends, family, or colleagues.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Roommates, Europe Trip, Project Team"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-600">Choose a name that clearly identifies your group</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of what expenses this group will track..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
                <p className="text-sm text-gray-600">Optional: Add context about the group's purpose</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You'll be the group admin and first member</li>
                  <li>• You can invite others via email or sharing a join link</li>
                  <li>• Start adding expenses immediately</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" className="flex-1" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading || !name.trim()}>
                  {isLoading ? "Creating..." : "Create Group"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
