export interface User {
  id: string
  name: string
  email: string
  createdAt: string | Date
}

export interface Course {
  id: string
  name: string
  duration: string
  fees: number
  collegeId: string
}

export interface Review {
  id: string
  studentName: string
  rating: number
  comment: string
  collegeId: string
  createdAt: string | Date
}

export interface Cutoff {
  id: string
  collegeId: string
  exam: string
  category: string
  year: number
  openRank: number
  closeRank: number
}

export interface Favorite {
  id: string
  userId: string
  collegeId: string
  college?: College
  user?: User
}

export interface College {
  id: string
  name: string
  city: string
  state: string
  fees: number
  rating: number
  placement: number
  highestPackage: number
  averagePackage: number
  description: string
  imageUrl: string | null
  established: number | null
  type: string
  createdAt: string | Date
  courses?: Course[]
  reviews?: Review[]
  favorites?: Favorite[]
  cutoffs?: Cutoff[]
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string | null
}
