"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function AgentUploadPage() {
  const [csv, setCsv] = useState<File | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  function processCsv() {
    // mock processing
    setMessage("Processed scores for 25 records.")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Agent Batch Upload</CardTitle>
            <CardDescription>Upload CSV to process beneficiaries in bulk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" accept=".csv" onChange={(e) => setCsv(e.target.files?.[0] || null)} />
            <Button className="w-full" onClick={processCsv} disabled={!csv}>
              Process CSV
            </Button>
            {message && <div className="rounded-md border border-border p-3 text-sm">{message}</div>}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
