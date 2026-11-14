export interface IJobData {
  _id: string
  title: string
  companyName: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  frequency: string
  jobPostBy: string
  jobPosterRole: string
  minSalary: number
  maxSalary: number
  qualifications: string
  responsibilities: string
  candidates: number
}

export interface IJobPayload {
  _id?:string
  title: string
  companyName: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: number
  maxSalary: number
  frequency: string
  responsibilities: string
  qualifications: string
  jobPostBy: string
  jobPosterRole: string
  candidates: number
}
