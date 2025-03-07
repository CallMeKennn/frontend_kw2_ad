"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

interface LoadingProps {
  open?: boolean;
}

export function LoadingOverlay({ open = true }: LoadingProps) {
  return (
    <Dialog open={open} modal>
      <DialogContent className="max-w-md border-none bg-transparent shadow-none">
        <DialogTitle className="sr-only">
          Trạng thái tải
        </DialogTitle>
        <DialogDescription asChild>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <span className="text-lg font-semibold text-white">
              Đang xử lý...
            </span>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}