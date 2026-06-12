import { Sparkles, Clock } from 'lucide-react';
import { useAnimationMode } from '~/root';

import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from './ui/sheet';

export function ModeToggle() {
  const { mode, setMode } = useAnimationMode();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="border-current/15 bg-current/[0.04] hover:bg-current/[0.1] gap-2 border text-current hover:text-current"
        >
          {mode === 'classic' ? <Clock className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          {mode === 'classic' ? 'Classic' : 'Motion Lab'}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg">
        <SheetHeader className="text-center">
          <SheetTitle className="text-2xl">Choose Portfolio Mode</SheetTitle>
          <SheetDescription>Select the classic site or the cinematic local build.</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-2">
          <button
            type="button"
            className={`flex cursor-pointer flex-col items-center gap-4 rounded-lg border-2 p-6 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              mode === 'classic'
                ? 'border-primary bg-primary/10'
                : 'border-muted hover:border-primary/50'
            }`}
            onClick={() => setMode('classic')}
          >
            <div className="rounded-full bg-muted p-4">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Classic</h3>
            <p className="text-center text-sm text-muted-foreground">
              The clean deployed-style portfolio with familiar navigation and lighter motion.
            </p>
            {mode === 'classic' && (
              <Button size="sm" className="mt-2">
                Currently Active
              </Button>
            )}
          </button>

          <button
            type="button"
            className={`flex cursor-pointer flex-col items-center gap-4 rounded-lg border-2 p-6 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              mode === 'animated'
                ? 'border-primary bg-primary/10'
                : 'border-muted hover:border-primary/50'
            }`}
            onClick={() => setMode('animated')}
          >
            <div className="rounded-full bg-muted p-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Motion Lab</h3>
            <p className="text-center text-sm text-muted-foreground">
              The new local experience with cinematic sections, scroll motion, 3D accents, and
              stronger project storytelling.
            </p>
            {mode === 'animated' && (
              <Button size="sm" className="mt-2">
                Currently Active
              </Button>
            )}
          </button>
        </div>
        <SheetFooter className="flex-col">
          <SheetClose asChild>
            <Button className="w-full">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
