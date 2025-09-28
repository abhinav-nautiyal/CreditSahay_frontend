import { Navigation } from "@/components/navigation"
import { BeneficiaryTable } from "@/components/beneficiary-table"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Credit Scoring Dashboard</h1>
          <p className="text-muted-foreground">View and manage beneficiary credit assessments</p>
        </div>
        <BeneficiaryTable />
      </main>
    </div>
  )
}
