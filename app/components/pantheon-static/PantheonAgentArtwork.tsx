import type { ComponentType } from 'react';

import type { PantheonAgent } from '~/data/pantheon-static';
import {
  AphroditeEmblem,
  ArgusEmblem,
  AthenaEmblem,
  AuraEmblem,
  DaedalusEmblem,
  DanteEmblem,
  FortunaEmblem,
  HeimdallEmblem,
  HeliosEmblem,
  HephaestusEmblem,
  HeraclesEmblem,
  HermesEmblem,
  KronosEmblem,
  LokiEmblem,
  MinervaEmblem,
  OdinEmblem,
  PlutusEmblem,
  PrometheusEmblem,
  PtahEmblem,
  RaEmblem,
  TalosEmblem,
  ThorEmblem,
  ThothEmblem,
  VulcanEmblem,
  ZeusEmblem,
} from './gods';

type ArtworkAgent = Pick<PantheonAgent, 'id' | 'name' | 'sigil' | 'avatar'>;

const EMBLEM_COMPONENTS: Record<string, ComponentType> = {
  aphrodite: AphroditeEmblem,
  argus: ArgusEmblem,
  athena: AthenaEmblem,
  aura: AuraEmblem,
  daedalus: DaedalusEmblem,
  dante: DanteEmblem,
  fortuna: FortunaEmblem,
  heimdall: HeimdallEmblem,
  helios: HeliosEmblem,
  hephaestus: HephaestusEmblem,
  heracles: HeraclesEmblem,
  hermes: HermesEmblem,
  kronos: KronosEmblem,
  loki: LokiEmblem,
  minerva: MinervaEmblem,
  odin: OdinEmblem,
  plutus: PlutusEmblem,
  prometheus: PrometheusEmblem,
  ptah: PtahEmblem,
  ra: RaEmblem,
  talos: TalosEmblem,
  thor: ThorEmblem,
  thoth: ThothEmblem,
  vulcan: VulcanEmblem,
  zeus: ZeusEmblem,
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function PantheonAgentArtwork({
  agent,
  className,
}: {
  agent: ArtworkAgent;
  className?: string;
}) {
  const Emblem = EMBLEM_COMPONENTS[agent.id];
  const sigilSrc = agent.sigil || agent.avatar;

  if (Emblem) {
    return (
      <div
        className={joinClasses(
          'pantheon-emblem-shell pantheon-emblem-shell--grid rounded-[1.65rem] border border-yellow-400/16 bg-[radial-gradient(circle_at_50%_32%,rgba(212,175,55,0.2),rgba(24,31,46,0.86)_68%,rgba(13,17,23,0.94)_100%)] px-3 py-4 shadow-[inset_0_1px_0_rgba(255,248,214,0.06)]',
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.14),transparent_42%)]" />
        <Emblem />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-[inherit] bg-gradient-to-t from-[rgba(13,17,23,0.68)] via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={joinClasses(
        'relative isolate aspect-square overflow-hidden rounded-[1.65rem] border border-yellow-400/10 bg-[radial-gradient(circle_at_50%_32%,rgba(212,175,55,0.2),rgba(24,31,46,0.86)_68%,rgba(13,17,23,0.94)_100%)]',
        className,
      )}
    >
      <img
        src={sigilSrc}
        alt={`${agent.name} sigil`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain object-center p-5 drop-shadow-[0_16px_28px_rgba(0,0,0,0.42)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.12),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a12]/92 via-[#0a0a12]/36 to-transparent" />
    </div>
  );
}
