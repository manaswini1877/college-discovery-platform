import { notFound } from "next/navigation"
import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import Navbar from "@/components/Navbar"
import CollegeDetailTabs from "@/components/college/CollegeDetailTabs"
import FavoriteButton from "@/components/college/FavoriteButton"
import { MapPin, Calendar, Award, Landmark, GraduationCap, IndianRupee, Trophy } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

// Dynamic Metadata Generation for SEO
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const { id } = params
  
  const college = await prisma.college.findUnique({
    where: { id },
  })

  if (!college) {
    return {
      title: "College Not Found - UniDiscover",
    }
  }

  return {
    title: `${college.name} - Location, Fees, Placements & Reviews | UniDiscover`,
    description: `Check out fees, courses, packages, and rating stats for ${college.name} located in ${college.city}, ${college.state}. Predict your admissions chances now!`,
  }
}

export default async function CollegeDetailPage(props: PageProps) {
  const params = await props.params
  const { id } = params

  const college = await prisma.college.findUnique({
    where: { id },
    include: {
      courses: true,
      reviews: {
        orderBy: { createdAt: "desc" },
      },
      cutoffs: {
        orderBy: { year: "desc" },
      },
    },
  })

  if (!college) {
    notFound()
  }

  const formatLakhs = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)} L`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* College Banner Header */}
      <section className="relative w-full overflow-hidden border-b border-[#e5e7eb] bg-white py-12 md:py-16">
        <div className="absolute inset-0 opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-md bg-[#eff6ff] border border-[#e5e7eb] px-2.5 py-0.5 text-xs font-bold text-[#1a73e8]">
                  <Landmark className="h-3.5 w-3.5" />
                  {college.type}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 border border-[#e5e7eb] px-2.5 py-0.5 text-xs font-bold text-[#6b7280]">
                  <Calendar className="h-3.5 w-3.5" />
                  Est: {college.established || "N/A"}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#1a1a1a] sm:text-4xl lg:text-5xl tracking-tight">
                {college.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                <MapPin className="h-4.5 w-4.5 text-[#1a73e8]" />
                <span>{college.city}, {college.state}</span>
              </div>
            </div>
            
            {/* CTA and rating wrapper */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="bg-white border border-[#e5e7eb] rounded-xl p-3.5 text-center flex flex-col justify-center">
                <div className="flex items-center justify-center gap-1 text-amber-600 font-extrabold text-lg">
                  <span>{college.rating.toFixed(1)}</span>
                  <svg className="w-5 h-5 fill-amber-400 stroke-amber-400" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <span className="text-[10px] text-[#6b7280] uppercase font-bold tracking-wider mt-0.5">Rating</span>
              </div>
              <FavoriteButton collegeId={college.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main details panel on left (takes 2 cols) */}
          <div className="lg:col-span-2">
            <CollegeDetailTabs college={college} />
          </div>

          {/* Quick Facts Sidebar on right (takes 1 col) */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 space-y-5 card">
                <h3 className="text-base font-bold text-[#1a1a1a] border-b border-[#e5e7eb] pb-3">
                  Quick Info Summary
                </h3>
              
                <ul className="space-y-4 text-sm text-[#6b7280]">
                  <li className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-2 text-[#6b7280]">
                      <IndianRupee className="h-4 w-4 text-[#1a73e8]" />
                      Average Annual Fee
                    </span>
                    <span className="font-bold text-[#1a1a1a]">{formatLakhs(college.fees)}</span>
                  </li>
                  <li className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-2 text-[#6b7280]">
                      <Award className="h-4 w-4 text-[#1a73e8]" />
                      Placement rate
                    </span>
                    <span className="font-bold text-emerald-600">{college.placement}%</span>
                  </li>
                  <li className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-2 text-[#6b7280]">
                      <Trophy className="h-4 w-4 text-[#1a73e8]" />
                      Highest Package
                    </span>
                    <span className="font-bold text-[#1a1a1a]">{formatLakhs(college.highestPackage)}</span>
                  </li>
                  <li className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-2 text-[#6b7280]">
                      <GraduationCap className="h-4 w-4 text-[#1a73e8]" />
                      Average Package
                    </span>
                    <span className="font-bold text-[#1a1a1a]">{formatLakhs(college.averagePackage)}</span>
                  </li>
                </ul>
              </div>
          </div>

        </div>
      </main>
    </div>
  )
}
