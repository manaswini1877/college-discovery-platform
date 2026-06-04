import Navbar from "@/components/Navbar"
import PredictorForm from "@/components/predictor/PredictorForm"
import { Landmark } from "lucide-react"

export const metadata = {
  title: "College Cutoff Predictor - UniDiscover",
  description: "Predict your chances of admission into IITs, NITs, and state engineering colleges based on your rank, category, and preferred exam.",
}

export default function PredictorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Header section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#eff6ff] to-[#dbeafe] py-10 border-b border-[#e5e7eb]">
        <div className="relative mx-auto max-w-4xl px-4 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-1.5 text-xs font-bold text-[#1a73e8]">
            <Landmark className="h-4 w-4 text-[#1a73e8]" />
            Admissions Predictor
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1a1a1a] sm:text-4xl">
            College Cutoff Predictor
          </h1>
          <p className="mt-2 text-sm text-[#6b7280] max-w-lg">
            Find out which premier engineering colleges match your score profile. Evaluates JEE Main, Advanced, and regional EAPCET/CET cutoffs.
          </p>
        </div>
      </header>

      {/* Predictor Form & Results */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10">
        <PredictorForm />
      </main>
    </div>
  )
}
