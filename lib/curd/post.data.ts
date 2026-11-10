import { IJobPayload } from "@/app/dashboard/recruiter/new/page"


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const newJobPost = async (data:IJobPayload) => {
  const res = await fetch(`${BASE_URL}/job/new`,{
    method:"POST",
    headers:{
        "Content-Type":"Application/json"
    },
    body: JSON.stringify(data)
  })

  const resData = await res.json()
  
  return resData
}
