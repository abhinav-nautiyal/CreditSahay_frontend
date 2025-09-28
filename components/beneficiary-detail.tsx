"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { Gauge } from "@/components/gauge"
import { Button } from "@/components/ui/button"

interface BeneficiaryDetailProps {
  beneficiaryId: string
}

// Mock data - in real app, this would be fetched based on ID
const beneficiaryData = {
  id: "BEN001",
  repaymentScore: 0.92,
  incomeScore: 0.65,
  compositeScore: 0.81,
  riskBand: "Low Risk",
  decision: "Auto-approve",
  details: {
    repaymentRate: 92,
    avgMonthlyRecharge: 110,
    utilityBillTimeliness: 0.85,
  },
}

function getRiskIcon(riskBand: string) {
  switch (riskBand) {
    case "Low Risk":
      return <CheckCircle className="h-5 w-5 text-success" />
    case "Medium Risk":
      return <AlertCircle className="h-5 w-5 text-warning" />
    case "High Risk":
      return <XCircle className="h-5 w-5 text-destructive" />
    default:
      return null
  }
}

function getRiskBadgeVariant(riskBand: string) {
  switch (riskBand) {
    case "Low Risk":
      return "default"
    case "Medium Risk":
      return "secondary"
    case "High Risk":
      return "destructive"
    default:
      return "outline"
  }
}

export function BeneficiaryDetail({ beneficiaryId }: BeneficiaryDetailProps) {
  const data = beneficiaryData // In real app, fetch by beneficiaryId

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Beneficiary {data.id}</h1>
          <p className="text-muted-foreground">Credit assessment details</p>
        </div>
        <div className="flex items-center gap-2">
          {getRiskIcon(data.riskBand)}
          <Badge variant={getRiskBadgeVariant(data.riskBand)} className="text-sm">
            {data.riskBand}
          </Badge>
        </div>
      </div>

      {/* Composite gauge and decision */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="text-sm text-muted-foreground mb-2">Composite Score</div>
          <div className="text-3xl font-bold text-foreground mb-2">{data.compositeScore.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground">Decision: {data.decision}</p>
          <div className="mt-4 flex gap-2">
            <Button variant="default">Approve</Button>
            <Button variant="secondary">Review</Button>
            <Button variant="destructive">Reject</Button>
          </div>
        </div>
        <Gauge value={data.compositeScore} />
      </div>

      {/* Scores */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Repayment Score</CardTitle>
            <CardDescription>Historical repayment performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">{(data.repaymentScore * 100).toFixed(0)}%</div>
            <Progress value={data.repaymentScore * 100} className="mb-2" />
            <p className="text-sm text-muted-foreground">Based on {data.details.repaymentRate}% repayment rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Income Score</CardTitle>
            <CardDescription>Income verification indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">{(data.incomeScore * 100).toFixed(0)}%</div>
            <Progress value={data.incomeScore * 100} className="mb-2" />
            <p className="text-sm text-muted-foreground">₹{data.details.avgMonthlyRecharge}/month avg recharge</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Composite Score</CardTitle>
            <CardDescription>Final credit assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-2">{data.compositeScore.toFixed(2)}</div>
            <Progress value={data.compositeScore * 100} className="mb-2" />
            <p className="text-sm text-muted-foreground">Decision: {data.decision}</p>
          </CardContent>
        </Card>
      </div>

      {/* Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Explanation</CardTitle>
          <CardDescription>Why this decision was made</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p className="text-foreground leading-relaxed">
            <strong>Repayment Performance:</strong> {data.details.repaymentRate}% repayment rate indicates strong
            financial discipline and reliability (positive factor).
          </p>
          <p className="text-foreground leading-relaxed">
            <strong>Income Indicators:</strong> Average monthly recharge of ₹{data.details.avgMonthlyRecharge} suggests
            moderate income level. Utility bill timeliness of {(data.details.utilityBillTimeliness * 100).toFixed(0)}%
            shows good payment habits.
          </p>
          <p className="text-foreground leading-relaxed">
            <strong>Final Assessment:</strong> Composite Score of {data.compositeScore.toFixed(2)} places this
            beneficiary in the <strong>{data.riskBand}</strong> category. The combination of excellent repayment history
            and moderate income indicators results in <strong>{data.decision}</strong> recommendation.
          </p>
        </CardContent>
      </Card>

      {/* SHAP explanation image */}
      <Card>
        <CardHeader>
          <CardTitle>Explainability (SHAP)</CardTitle>
          <CardDescription>Feature contributions towards the score</CardDescription>
        </CardHeader>
        <CardContent>
          <img src="/shap-bar-chart-explanation.jpg" alt="SHAP bar chart explanation" className="w-full rounded-md border" />
        </CardContent>
      </Card>
    </div>
  )
}
