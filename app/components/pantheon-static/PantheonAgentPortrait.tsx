import type { PantheonAgent } from '~/data/pantheon-static';

type PortraitAgent = Pick<
  PantheonAgent,
  'name' | 'avatar' | 'pantheon' | 'domain' | 'tagline' | 'portraitOverrides'
>;

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function PantheonAgentPortrait({
  agent,
  className,
}: {
  agent: PortraitAgent;
  className?: string;
}) {
  const portraitOverride = agent.portraitOverrides?.ribbon;
  const portraitSrc = portraitOverride?.src || agent.avatar;
  const objectFit = portraitOverride?.objectFit || 'cover';
  const objectPosition = portraitOverride?.objectPosition || 'center 20%';

  return (
    <div
      className={joinClasses(
        'group/portrait relative isolate aspect-[16/8.75] overflow-hidden rounded-[1.35rem] border border-yellow-300/15 bg-[linear-gradient(180deg,rgba(44,34,15,0.72),rgba(15,17,24,0.88))]',
        className,
      )}
    >
      <img
        src={portraitSrc}
        alt={`${agent.name} avatar artwork`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-[1.01] saturate-[1.04] transition-transform duration-700 group-hover/portrait:scale-[1.06]"
        style={{ objectFit, objectPosition }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,244,204,0.2),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(8,8,12,0.04),rgba(8,8,12,0.22)_50%,rgba(8,8,12,0.56))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07070c] via-[#07070c]/62 to-transparent" />
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-yellow-100/45 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="mb-1 text-[10px] uppercase tracking-[0.32em] text-[#D4AF37]/65">
            Avatar Artwork
          </p>
          <p className="font-cinzel text-base text-white">{agent.name}</p>
          <p className="text-xs text-[#D4AF37]/80">{agent.domain}</p>
        </div>

        <div className="shrink-0 rounded-full border border-yellow-300/20 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-gray-200 backdrop-blur-sm">
          {agent.pantheon}
        </div>
      </div>
    </div>
  );
}
