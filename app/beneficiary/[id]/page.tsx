import { Navigation } from "@/components/navigation"
import { BeneficiaryDetail } from "@/components/beneficiary-detail"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BeneficiaryPageProps {
  params: {
    id: string
  }
}

export default function BeneficiaryPage({ params }: BeneficiaryPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <BeneficiaryDetail beneficiaryId={params.id} />
      </main>
    </div>
  )
}
