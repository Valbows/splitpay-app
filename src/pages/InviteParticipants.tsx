"use client"

import type React from "react"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, UserPlus, Copy, Mail, LinkIcon, Check } from "lucide-react"
import { useApp } from "../App"
import { useToast } from "@/hooks/use-toast"

export default function InviteParticipants() {
  const { id } = useParams()
  const { groups } = useApp()
  const { toast } = useToast()
  const group = groups.find((g) => g.id === id)

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [sentEmails, setSentEmails] = useState<string[]>([])

  const inviteLink = `${window.location.origin}/join-group?code=${group?.id}ABC123`

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

  const handleEmailInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSentEmails((prev) => [...prev, email])
    setEmail("")

    toast({
      title: "Invitation sent!",
      description: `Invite sent to ${email}`,
    })

    setIsLoading(false)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopiedLink(true)
      toast({
        title: "Link copied!",
        description: "Invite link copied to clipboard",
      })
      setTimeout(() => setCopiedLink(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      })
    }
  }

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
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Invite Members</h1>
              <p className="text-sm text-gray-600">{group.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Invitation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Send Email Invitation
              </CardTitle>
              <CardDescription>Send a direct invitation to someone's email address</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailInvite} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="friend@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || !email.trim()}>
                  {isLoading ? "Sending..." : "Send Invitation"}
                </Button>
              </form>

              {sentEmails.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-sm text-gray-900 mb-3">Sent Invitations</h4>
                  <div className="space-y-2">
                    {sentEmails.map((sentEmail, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                        <span className="text-sm text-green-800">{sentEmail}</span>
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          <Check className="h-3 w-3 mr-1" />
                          Sent
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Share Link */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LinkIcon className="h-5 w-5 mr-2" />
                Share Invite Link
              </CardTitle>
              <CardDescription>Copy and share this link with anyone you want to invite</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Invite Link</Label>
                <div className="flex space-x-2">
                  <Input value={inviteLink} readOnly className="font-mono text-sm" />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    className={copiedLink ? "text-green-600" : ""}
                  >
                    {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-600">This link will allow anyone to join your group</p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-medium text-amber-900 mb-2">Security Note</h4>
                <p className="text-sm text-amber-800">
                  Anyone with this link can join your group. Only share it with people you trust.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Quick Share Options</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Members */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Current Members ({group.members.length})
            </CardTitle>
            <CardDescription>People who are already part of this group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.members.map((member) => (
                <div key={member.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{member.name}</h4>
                    <p className="text-xs text-gray-600">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
