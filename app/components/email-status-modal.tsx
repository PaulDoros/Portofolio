import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface EmailStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error" | "sending";
  message: string;
}

export function EmailStatusModal({
  isOpen,
  onClose,
  status,
  message,
}: EmailStatusModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {status === "success" && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
            {status === "error" && <XCircle className="h-5 w-5 text-red-500" />}
            {status === "sending" && (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            )}
            {status === "success"
              ? "Message Sent Successfully!"
              : status === "error"
                ? "Failed to Send Message"
                : "Sending Message..."}
          </DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={status === "sending"}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
