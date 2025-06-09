"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, Camera, FileImage, CheckCircle, AlertCircle } from "lucide-react"
import { useApp } from "../App"
import { useToast } from "@/hooks/use-toast"

export default function ReceiptUpload() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { groups } = useApp()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const group = groups.find((g) => g.id === id)

  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

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

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive",
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      })
      return
    }

    setSelectedFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const simulateUploadAndProcessing = async () => {
    setUploadState("uploading")
    setProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 50; i += 10) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setUploadState("processing")

    // Simulate AI processing
    for (let i = 50; i <= 100; i += 10) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    setUploadState("success")

    // Navigate to review screen after a brief delay
    setTimeout(() => {
      navigate(`/group/${id}/review-expense`, {
        state: {
          extractedData: {
            description: "Whole Foods Market",
            amount: "47.83",
            date: new Date().toISOString().split("T")[0],
            category: "Food & Dining",
            merchant: "Whole Foods Market",
          },
          receiptUrl: previewUrl,
        },
      })
    }, 1500)
  }

  const handleUpload = () => {
    if (!selectedFile) return
    simulateUploadAndProcessing()
  }

  const resetUpload = () => {
    setUploadState("idle")
    setProgress(0)
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
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
              <h1 className="text-xl font-semibold text-gray-900">Upload Receipt</h1>
              <p className="text-sm text-gray-600">{group.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Receipt Upload
              </CardTitle>
              <CardDescription>Upload a photo of your receipt for AI-powered expense extraction</CardDescription>
            </CardHeader>
            <CardContent>
              {uploadState === "idle" && !selectedFile && (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Receipt</h3>
                  <p className="text-gray-600 mb-4">Drag and drop your receipt image here, or click to browse</p>
                  <Button variant="outline">
                    <FileImage className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              )}

              {selectedFile && uploadState === "idle" && (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <FileImage className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{selectedFile.name}</h4>
                          <p className="text-sm text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={resetUpload}>
                        Remove
                      </Button>
                    </div>
                    {previewUrl && (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Receipt preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={handleUpload} className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Process Receipt
                    </Button>
                    <Button variant="outline" onClick={resetUpload}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {(uploadState === "uploading" || uploadState === "processing") && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="h-8 w-8 text-blue-600 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {uploadState === "uploading" ? "Uploading..." : "Processing with AI..."}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {uploadState === "uploading"
                        ? "Uploading your receipt image"
                        : "Our AI is extracting expense details from your receipt"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                </div>
              )}

              {uploadState === "success" && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Processing Complete!</h3>
                  <p className="text-gray-600">
                    Receipt processed successfully. Redirecting to review the extracted data...
                  </p>
                </div>
              )}

              {uploadState === "error" && (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Processing Failed</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't process your receipt. Please try again or add the expense manually.
                  </p>
                  <div className="flex space-x-3">
                    <Button onClick={resetUpload} variant="outline">
                      Try Again
                    </Button>
                    <Button asChild>
                      <Link to={`/group/${id}/add-expense`}>Add Manually</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How it works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Upload Receipt</h4>
                    <p className="text-sm text-gray-600">Take a photo or upload an image of your receipt</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">AI Processing</h4>
                    <p className="text-sm text-gray-600">
                      Our AI extracts key information like amount, date, and merchant
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Review & Confirm</h4>
                    <p className="text-sm text-gray-600">
                      Review the extracted data and make any necessary adjustments
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips for best results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Ensure the receipt is well-lit and clearly visible</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Include the total amount and date in the image</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Avoid blurry or cropped images</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Supported formats: JPG, PNG, HEIC</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="font-medium mb-2">Prefer manual entry?</h4>
                  <Button variant="outline" asChild className="w-full">
                    <Link to={`/group/${id}/add-expense`}>Add Expense Manually</Link>
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
