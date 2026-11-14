const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const getJson = async (path: string) => {
  const res = await fetch(`${BASE_URL}${path}`)
  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.message ?? `Request failed with status ${res.status}`)
  }
 
  return data
}

export const getRecruiterJoBData = async (email: string) =>
  getJson(`/get-recruiter-job/${encodeURIComponent(email)}`)

export const getSingleJob = async (id: string) =>
  getJson(`/get-single-job/${encodeURIComponent(id)}`)

export const getFilterJobsData = async (quary: string) => {
  const res = await fetch(`${BASE_URL}/get-filter-jobs?${quary}`)

  const data = await res.json()
  return data
}
