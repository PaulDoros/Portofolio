import { useCallback, useState } from 'react';

import { DivineGoldenGate, type DivineGoldenGateCopy } from './DivineGoldenGate';

interface PantheonGateIntroProps {
  targetId: string;
  onOpened?: () => void;
  copy?: Partial<DivineGoldenGateCopy>;
}

export function PantheonGateIntro({ targetId, onOpened, copy }: PantheonGateIntroProps) {
  const [dismissed, setDismissed] = useState(false);

  const handleComplete = useCallback(() => {
    onOpened?.();
    setDismissed(true);

    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, [onOpened, targetId]);

  if (dismissed) {
    return null;
  }

  return (
    <section className="relative h-screen min-h-[100dvh] overflow-hidden bg-[#050508] text-white">
      <DivineGoldenGate copy={copy} onComplete={handleComplete} />
    </section>
  );
}

export default PantheonGateIntro;
