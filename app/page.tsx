import { Navigation } from "@/components/navigation"
import { UploadForm } from "@/components/upload-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <UploadForm />
      </main>
    </div>
  )
}
