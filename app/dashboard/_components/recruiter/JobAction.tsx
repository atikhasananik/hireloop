"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { deleteRecruterJobDelet } from "@/lib/curd/delete.data"
import { IJobData } from "@/lib/type/type"
import { MoreVertical, Pencil, Trash2, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const JobAction = ({ job }: { job: IJobData }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const Router = useRouter()

  const handleDeleteBtn = async () => {
    setIsDeleting(true)

    try {
      const res = await deleteRecruterJobDelet(job._id)

      if (!res?.acknowledged || Number(res?.deletedCount) <= 0) {
        toast.add({
          type: "error",
          title: "Job not deleted",
          description:
            "The server did not delete this job post. It may have already been removed.",
        })
        return
      }

      toast.add({
        type: "success",
        title: "Job deleted",
        description: `"${job.title}" has been removed successfully.`,
      })

      Router.refresh()
    } catch (error) {
      console.error("Failed to delete job:", error)

      toast.add({
        type: "error",
        title: "Failed to delete job",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      })
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <div className="flex items-center justify-end gap-1.5">
      <Link href={`/dashboard/recruiter/update/${job._id}`}>
        <Button
          type="button"
          size="sm"
          aria-label={`Update ${job.title}`}
          className="h-7! gap-1.5! rounded-md! bg-violet-600! px-2.5! text-[11px]! font-medium! text-white! shadow-[0_0_0_1px_rgba(139,92,246,0.35)]! hover:bg-violet-500!"
        >
          <Pencil className="size-3" aria-hidden />
          Update
        </Button>
      </Link>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          render={
            <Button variant="destructive">
              {" "}
              <Trash2 className="size-3.5" aria-hidden />
            </Button>
          }
        />
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete {job.title}</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the {job.title} job post. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBtn}
              variant="destructive"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`More actions for ${job.title}`}
        className="size-7! rounded-md! text-white/45! hover:bg-white/[0.06]! hover:text-white!"
      >
        <MoreVertical className="size-4" aria-hidden />
      </Button>
    </div>
  )
}

export default JobAction
