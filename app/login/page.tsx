"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<"beneficiary" | "agent">("beneficiary")
  const [identifier, setIdentifier] = useState("") // Aadhaar/Mobile/ID (dummy)

  useEffect(() => {
    // Preselect existing role if present
    try {
      const r = window.localStorage.getItem("role") as "beneficiary" | "agent" | null
      if (r) setRole(r)
    } catch {
      // ignore
    }
  }, [])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      window.localStorage.setItem("role", role)
    } catch {
      // ignore storage errors in demo
    }
    // route based on role
    if (role === "agent") {
      router.replace("/dashboard")
    } else {
      router.replace("/")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Select a profile to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="identifier">Aadhaar / Mobile No. (dummy)</Label>
                <Input
                  id="identifier"
                  placeholder="XXXX-XXXX-XXXX or 10-digit mobile"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-foreground">Profile</legend>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="role"
                      value="beneficiary"
                      checked={role === "beneficiary"}
                      onChange={() => setRole("beneficiary")}
                      className="h-4 w-4 border border-input rounded"
                    />
                    Beneficiary
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="role"
                      value="agent"
                      checked={role === "agent"}
                      onChange={() => setRole("agent")}
                      className="h-4 w-4 border border-input rounded"
                    />
                    Agent
                  </label>
                </div>
              </fieldset>

              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
