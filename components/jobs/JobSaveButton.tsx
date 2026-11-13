"use client"

import { useState } from "react"
import { Bookmark } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const JobSaveButton = () => {
  const [saved, setSaved] = useState(false)

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={saved ? "Remove job from saved" : "Save job"}
      aria-pressed={saved}
      onClick={() => setSaved((value) => !value)}
      className="text-white/35! hover:bg-white/5! hover:text-white! focus-visible:ring-white/30!"
    >
      <Bookmark
        className={cn("size-4", saved && "fill-violet-400 text-violet-400")}
        aria-hidden
      />
    </Button>
  )
}

export default JobSaveButton
