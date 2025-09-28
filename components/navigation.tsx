"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [role, setRole] = useState<"beneficiary" | "agent" | null>(null)

  useEffect(() => {
    try {
      const r = window.localStorage.getItem("role") as "beneficiary" | "agent" | null
      setRole(r)
    } catch {
      setRole(null)
    }
  }, [])

  const navItems =
    role === "agent"
      ? [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/agent/upload", label: "Agent Upload" },
        ]
      : role === "beneficiary"
        ? [{ href: "/", label: "Upload" }]
        : [{ href: "/login", label: "Login" }]

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-primary">
              SIH Credit Scoring
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            {role && (
              <Link
                href="/login"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/login" ? "text-primary border-b-2 border-primary" : "text-muted-foreground",
                )}
              >
                Switch Role
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
