"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const beneficiaries = [
  { id: "BEN001", name: "Anita Sharma", compositeScore: 0.81, riskBand: "Low Risk", status: "Approved" },
  { id: "BEN002", name: "Rohan Verma", compositeScore: 0.62, riskBand: "Medium Risk", status: "Review" },
  { id: "BEN003", name: "Maya Singh", compositeScore: 0.51, riskBand: "High Risk", status: "Review" },
  { id: "BEN004", name: "Vikram Rao", compositeScore: 0.86, riskBand: "Low Risk", status: "Approved" },
  { id: "BEN005", name: "Priya Das", compositeScore: 0.39, riskBand: "High Risk", status: "Rejected" },
]

function riskBadgeVariant(riskBand: string) {
  if (riskBand === "Low Risk") return "default"
  if (riskBand === "Medium Risk") return "secondary"
  return "destructive"
}

function statusBadgeVariant(status: string) {
  if (status === "Approved") return "default"
  if (status === "Review") return "secondary"
  return "destructive"
}

export function BeneficiaryTable() {
  const [statusFilter, setStatusFilter] = useState<"All" | "Approved" | "Review" | "Rejected">("All")

  const filtered = useMemo(() => {
    if (statusFilter === "All") return beneficiaries
    return beneficiaries.filter((b) => b.status === statusFilter)
  }, [statusFilter])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Beneficiary Credit Scores</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as "All" | "Approved" | "Review" | "Rejected")}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Risk Band</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.name}</TableCell>
                <TableCell className="font-medium">{b.compositeScore.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={riskBadgeVariant(b.riskBand)}>{b.riskBand}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusBadgeVariant(b.status)}>{b.status}</Badge>
                </TableCell>
                <TableCell>
                  <Link href={`/beneficiary/${b.id}`}>
                    <Button variant="ghost" size="sm" aria-label={`View ${b.name}`}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
