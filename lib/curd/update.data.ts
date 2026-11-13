import type { IJobPayload } from "../type/type"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const updateJob = async (id: string, data: IJobPayload) => {
  const res = await fetch(`${BASE_URL}/update-job/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const resData = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(resData?.message ?? `Update failed with status ${res.status}`)
  }

  return resData
}
