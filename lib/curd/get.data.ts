const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL


export const getRecruiterJoBData = async (email:string) => {
  const res = await fetch(`${BASE_URL}/get-recruiter-job/${email}`)
  const data = await res.json()
  return data
}
