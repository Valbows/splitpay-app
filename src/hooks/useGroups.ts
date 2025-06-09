"use client"

import { useState, useEffect } from "react"
import type { Group, CreateGroupData, JoinGroupData } from "@/types/group.types"
import * as groupsService from "@/services/api/groups"
import { useToast } from "@/context/ToastContext"

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToast } = useToast()

  const fetchGroups = async () => {
    try {
      setIsLoading(true)
      const data = await groupsService.getGroups()
      setGroups(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch groups")
    } finally {
      setIsLoading(false)
    }
  }

  const createGroup = async (data: CreateGroupData) => {
    try {
      const newGroup = await groupsService.createGroup(data)
      setGroups((prev) => [...prev, newGroup])
      addToast({
        title: "Group created successfully!",
        description: `${data.name} is ready for expense tracking.`,
        variant: "success",
      })
      return newGroup
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create group"
      addToast({
        title: "Failed to create group",
        description: message,
        variant: "destructive",
      })
      throw err
    }
  }

  const joinGroup = async (data: JoinGroupData) => {
    try {
      const group = await groupsService.joinGroup(data)
      setGroups((prev) => [...prev, group])
      addToast({
        title: "Successfully joined group!",
        description: `Welcome to ${group.name}.`,
        variant: "success",
      })
      return group
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to join group"
      addToast({
        title: "Failed to join group",
        description: message,
        variant: "destructive",
      })
      throw err
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return {
    groups,
    isLoading,
    error,
    createGroup,
    joinGroup,
    refetch: fetchGroups,
  }
}
