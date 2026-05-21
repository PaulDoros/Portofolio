import type { MetaFunction } from '@remix-run/node';
import { Outlet, useLocation } from '@remix-run/react';
import { MotionConfig } from 'framer-motion';

import { lazy, Suspense, useEffect, useState } from 'react';

const PantheonGateIntro = lazy(() =>
  import('~/components/pantheon-static/PantheonGateIntro').then(module => ({
    default: module.PantheonGateIntro,
  }))
);

const PantheonDashboardReplica = lazy(() =>
  import('~/components/pantheon-static/PantheonDashboardReplica').then(module => ({
    default: module.PantheonDashboardReplica,
  }))
);

const pantheonDemoGateCopy = {
  ariaLabel: 'Open the static Pantheon demo',
  badgeMobile: 'Static demo. No backend.',
  badgeDesktop: 'Static Pantheon replica with mock data, no backend, no secrets, no live agents.',
  eyebrow: 'Static Agent Realm',
  title: 'Pantheon Demo',
  titleMobileLines: ['Pantheon', 'Demo'],
  subtitle: 'Mock agents, tasks, factory, and commander flow',
  cta: 'Click to Open the Demo',
};

const pantheonDemoGateSessionKey = 'pantheon-demo-gate-opened:v1';

export const meta: MetaFunction = () => {
  return [
    { title: 'Pantheon Static Demo | Paul Ionut Doros' },
    {
      name: 'description',
      content:
        'A frontend-only static copy of the local Pantheon dashboard with the real gate intro, Olympus shell, production lanes, agent cards, tasks, factory, project, team, and commander demo surfaces.',
    },
  ];
};

export default function PantheonDemo() {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const isDemoHome = normalizedPath === '/pantheon-demo';
  const [demoVisible, setDemoVisible] = useState(false);
  const [gateStateLoaded, setGateStateLoaded] = useState(false);

  useEffect(() => {
    setDemoVisible(window.sessionStorage.getItem(pantheonDemoGateSessionKey) === '1');
    setGateStateLoaded(true);
  }, []);

  return isDemoHome ? (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen overflow-x-hidden bg-[#050508]">
        {!gateStateLoaded ? <div className="min-h-screen bg-[#050508]" /> : null}

        {gateStateLoaded && !demoVisible ? (
          <Suspense fallback={<div className="min-h-screen bg-[#050508]" />}>
            <PantheonGateIntro
              copy={pantheonDemoGateCopy}
              targetId="pantheon-static-dashboard"
              onOpened={() => {
                window.sessionStorage.setItem(pantheonDemoGateSessionKey, '1');
                setDemoVisible(true);
              }}
            />
          </Suspense>
        ) : null}

        {demoVisible ? (
          <section id="pantheon-static-dashboard">
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-[#101522] text-xs uppercase tracking-[0.32em] text-[#D4AF37]">
                  Mounting Olympus
                </div>
              }
            >
              <PantheonDashboardReplica />
            </Suspense>
          </section>
        ) : null}
      </main>
    </MotionConfig>
  ) : (
    <Outlet />
  );
}
