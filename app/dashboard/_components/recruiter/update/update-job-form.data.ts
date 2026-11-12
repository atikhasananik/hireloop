export type JobFormState = {
  title: string
  companyName: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
}

export type JobFormField = keyof JobFormState

export type SetJobFormField = <K extends JobFormField>(
  key: K,
  value: JobFormState[K]
) => void

export const initialJobFormData: JobFormState = {
  title: "Frontend Developer",
  companyName: "HirePulse Network",
  category: "Engineering & Tech",
  jobType: "full-time",
  isRemote: true,
  location: "New York, USA",
  deadline: "2025-05-30",
  minSalary: "25",
  maxSalary: "40",
  frequency: "hour",
  responsibilities:
    "Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products.",
  qualifications:
    "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers",
}
