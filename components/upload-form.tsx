"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UploadForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [aadhaarOrMobile, setAadhaarOrMobile] = useState("")
  const [utilityBill, setUtilityBill] = useState<File | null>(null)
  const [loanCsv, setLoanCsv] = useState<File | null>(null)
  const [ocrPreview, setOcrPreview] = useState<{ units?: number; paid?: boolean } | null>(null)
  const [pan, setPan] = useState("")
  const [employmentType, setEmploymentType] = useState("")
  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [bankStatement, setBankStatement] = useState<File | null>(null)
  const [consent, setConsent] = useState(false)
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [income, setIncome] = useState("")
  const [education, setEducation] = useState("")
  const [occupation, setOccupation] = useState("")
  const [maritalStatus, setMaritalStatus] = useState("")
  const [landholding, setLandholding] = useState("")
  const [loanHistory, setLoanHistory] = useState("")
  const [creditUtilization, setCreditUtilization] = useState("")
  const [utilityPayments, setUtilityPayments] = useState("")
  const [telecomUsage, setTelecomUsage] = useState("")

  function handleUtilityBillChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null
    setUtilityBill(file)
    if (file) {
      setOcrPreview({ units: 120, paid: true })
    } else {
      setOcrPreview(null)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!consent) {
      alert("Please provide consent to proceed.")
      return
    }
    const composite = 0.78
    const risk = composite >= 0.8 ? "Low Risk" : composite >= 0.6 ? "Medium Risk" : "High Risk"
    const status = risk === "Low Risk" ? "Auto-Approved" : "Under Review"
    router.push(
      `/result?name=${encodeURIComponent(name || "Applicant")}&score=${composite}&risk=${encodeURIComponent(
        risk,
      )}&status=${encodeURIComponent(status)}`,
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Apply for Credit Assessment</h1>
        <p className="text-muted-foreground">Provide minimal details and upload a utility bill for verification</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload & Apply</CardTitle>
          <CardDescription>Fill the fields and upload documents</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhaarOrMobile">Aadhaar / Mobile No.</Label>
                <Input
                  id="aadhaarOrMobile"
                  placeholder="XXXX-XXXX-XXXX or 10-digit mobile"
                  value={aadhaarOrMobile}
                  onChange={(e) => setAadhaarOrMobile(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="utilityBill">Upload Utility Bill (Image/PDF)</Label>
              <Input id="utilityBill" type="file" accept="image/*,application/pdf" onChange={handleUtilityBillChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanCsv">Upload Loan History (CSV, optional)</Label>
              <Input id="loanCsv" type="file" accept=".csv" onChange={(e) => setLoanCsv(e.target.files?.[0] || null)} />
            </div>

            {ocrPreview && (
              <div className="rounded-md border border-border p-4">
                <p className="text-sm font-medium mb-2">Preview Extracted Data (OCR)</p>
                <div className="text-sm text-muted-foreground">
                  <div>Electricity units: {ocrPreview.units}</div>
                  <div>Paid: {ocrPreview.paid ? "Yes" : "No"}</div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-base font-medium">Additional verification</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN</Label>
                  <Input
                    id="pan"
                    placeholder="ABCDE1234F"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <select
                    id="employmentType"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    inputMode="numeric"
                    placeholder="50000"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankStatement">Upload Bank Statement (PDF)</Label>
                  <Input
                    id="bankStatement"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setBankStatement(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-base font-medium">Beneficiary Profile</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      inputMode="numeric"
                      placeholder="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="income">Income (₹)</Label>
                    <Input
                      id="income"
                      type="number"
                      inputMode="numeric"
                      placeholder="50000"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <select
                      id="education"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="High School">High School</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelors">Bachelors</option>
                      <option value="Masters">Masters</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <select
                      id="occupation"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Salaried">Salaried</option>
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Farmer">Farmer</option>
                      <option value="Student">Student</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <select
                      id="maritalStatus"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={maritalStatus}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="landholding">Landholding</Label>
                    <select
                      id="landholding"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={landholding}
                      onChange={(e) => setLandholding(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Owned">Owned</option>
                      <option value="Leased">Leased</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanHistory">Loan History</Label>
                    <select
                      id="loanHistory"
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={loanHistory}
                      onChange={(e) => setLoanHistory(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="creditUtilization">Credit Utilization (0–1)</Label>
                    <Input
                      id="creditUtilization"
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      max="1"
                      placeholder="0.35"
                      value={creditUtilization}
                      onChange={(e) => setCreditUtilization(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="utilityPayments">Utility Payments (₹/mo)</Label>
                    <Input
                      id="utilityPayments"
                      type="number"
                      inputMode="numeric"
                      placeholder="250"
                      value={utilityPayments}
                      onChange={(e) => setUtilityPayments(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="telecomUsage">Telecom Usage (₹/mo)</Label>
                    <Input
                      id="telecomUsage"
                      type="number"
                      inputMode="numeric"
                      placeholder="120"
                      value={telecomUsage}
                      onChange={(e) => setTelecomUsage(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border border-input"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                />
                <Label htmlFor="consent" className="text-sm text-muted-foreground">
                  I consent to use my provided information solely for credit assessment and verification.
                </Label>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={!consent} aria-disabled={!consent}>
                Get My Credit Score
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
