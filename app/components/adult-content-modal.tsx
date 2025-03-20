import { AlertTriangle, Shield, X, Lock } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { motion } from "framer-motion";

interface AdultContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  siteName: string;
}

export function AdultContentModal({
  isOpen,
  onClose,
  onConfirm,
  siteName,
}: AdultContentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-0" onPointerDownOutside={onClose}>
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-gradient-to-br from-destructive/20 to-destructive/10 p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="rounded-full bg-destructive/20 p-2 ring-2 ring-destructive/20">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <DialogTitle className="text-destructive font-bold">Adult Content Warning</DialogTitle>
            </motion.div>
          </div>
          <div className="p-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="flex items-start gap-4"
            >
              <div className="rounded-full bg-primary/10 p-2 ring-2 ring-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-2">
                <DialogDescription className="text-base">
                  <span className="font-medium text-foreground">{siteName}</span> contains adult content. 
                  Are you sure you want to proceed?
                </DialogDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>This content is restricted to adults only</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <DialogFooter className="p-6 pt-0">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            className="flex gap-3 w-full"
          >
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={onConfirm} 
              className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Proceed
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 