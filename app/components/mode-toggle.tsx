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
        <Button variant="outline" size="sm" className="gap-2">
          {mode === 'classic' ? <Clock className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          {mode === 'classic' ? 'Classic' : 'Animated'}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader className="text-center">
          <SheetTitle className="text-2xl">Choose Display Mode</SheetTitle>
          <SheetDescription>Select how you'd like to experience this portfolio</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-2">
          <div
            className={`flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 p-6 transition-all ${
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
              Clean, simple design with minimal animations for a straightforward experience.
            </p>
            {mode === 'classic' && (
              <Button size="sm" className="mt-2">
                Currently Active
              </Button>
            )}
          </div>

          <div
            className={`flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 p-6 transition-all ${
              mode === 'animated'
                ? 'border-primary bg-primary/10'
                : 'border-muted hover:border-primary/50'
            }`}
            onClick={() => setMode('animated')}
          >
            <div className="rounded-full bg-muted p-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold">Animated</h3>
            <p className="text-center text-sm text-muted-foreground">
              Enhanced design with dynamic animations and visual effects for an immersive
              experience.
            </p>
            {mode === 'animated' && (
              <Button size="sm" className="mt-2">
                Currently Active
              </Button>
            )}
          </div>
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
