"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, UserPlus, LinkIcon } from "lucide-react"
import { useApp } from "../App"
import { useToast } from "@/hooks/use-toast"

export default function JoinGroup() {
  const [inviteCode, setInviteCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user, groups, setGroups } = useApp()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock joining a group
    if (inviteCode.toLowerCase() === "demo123") {
      const newGroup = {
        id: Date.now().toString(),
        name: "Weekend Getaway",
        description: "Cabin trip expenses",
        members: [
          user,
          { id: "5", name: "Sarah Johnson", email: "sarah@example.com" },
          { id: "6", name: "Mike Davis", email: "mike@example.com" },
        ],
        createdAt: new Date(),
        totalExpenses: 450.0,
        yourBalance: -75.0,
      }

      setGroups([...groups, newGroup])

      toast({
        title: "Successfully joined group!",
        description: "Welcome to Weekend Getaway group.",
      })

      navigate(`/group/${newGroup.id}`)
    } else {
      toast({
        title: "Invalid invite code",
        description: "Please check the code and try again. (Try 'demo123' for demo)",
        variant: "destructive",
      })
    }

    setIsLoading(false)
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
            <h1 className="text-xl font-semibold text-gray-900">Join Group</h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Join an Existing Group</CardTitle>
            <CardDescription>
              Enter the invite code shared by a group member to join their expense group.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="inviteCode">Invite Code *</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="inviteCode"
                    placeholder="Enter the group invite code"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-gray-600">The invite code is usually 6-8 characters long</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-medium text-amber-900 mb-2">Don't have an invite code?</h4>
                <p className="text-sm text-amber-800 mb-3">
                  Ask a group member to send you the invite code, or have them invite you directly via email.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/create-group">Create Your Own Group Instead</Link>
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Demo Code</h4>
                <p className="text-sm text-blue-800">
                  Try entering <code className="bg-blue-200 px-1 rounded">demo123</code> to join a sample group
                </p>
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" className="flex-1" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading || !inviteCode.trim()}>
                  {isLoading ? "Joining..." : "Join Group"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
