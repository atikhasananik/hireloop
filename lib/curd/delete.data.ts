const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const deleteRecruterJobDelet = async (id: string) => {
  const res = await fetch(`${BASE_URL}/delete-recruiter-job/${id}`, {
    method: "DELETE",
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.message ?? `Delete failed with status ${res.status}`)
  }

  return data
}
