"use client"

import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Gauge } from "@/components/gauge"

function riskBadgeVariant(risk: string) {
  if (risk === "Low Risk") return "default"
  if (risk === "Medium Risk") return "secondary"
  return "destructive"
}

export default function ResultPage() {
  const params = useSearchParams()
  const name = params.get("name") || "Applicant"
  const score = Number(params.get("score") || 0.75)
  const risk = params.get("risk") || (score >= 0.8 ? "Low Risk" : score >= 0.6 ? "Medium Risk" : "High Risk")
  const status = params.get("status") || (risk === "Low Risk" ? "Auto-Approved" : "Under Review")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Credit Result</CardTitle>
            <CardDescription>Loan application result for {name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Composite Score</div>
                <div className="text-3xl font-bold text-foreground">{score.toFixed(2)}</div>
                <div className="mt-3">
                  <Badge variant={riskBadgeVariant(risk)}>{risk}</Badge>
                </div>
              </div>
              <Gauge value={score} />
            </div>

            <div className="rounded-md border border-border p-4">
              <p className="text-sm">
                Loan Application Submitted. Status: <span className="font-medium">{status}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <Link href="/dashboard">
                <Button variant="outline">Go to Dashboard</Button>
              </Link>
              <Link href="/">
                <Button>New Application</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
