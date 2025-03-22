import { useAnimationMode } from '~/root';
import { Layout } from '~/components/layout/layout';
import { AnimatedLayout } from '~/components/layout/animated-layout';

/**
 * A utility hook that returns either the classic or animated component based on the current animation mode
 * @param classicComponent The component to render in classic mode
 * @param animatedComponent The component to render in animated mode
 * @returns The component to render based on the current animation mode
 */
export function useConditionalAnimation<T>(
  classicComponent: React.ComponentType<T>,
  animatedComponent: React.ComponentType<T>
) {
  const { mode } = useAnimationMode();
  return mode === 'classic' ? classicComponent : animatedComponent;
}

/**
 * A utility component that renders both classic and animated children stacked on top of each other
 * with appropriate opacity based on the current animation mode
 */
export function AnimationSwitch({
  classic,
  animated,
  transitionDuration = 0.5,
}: {
  classic: React.ReactNode;
  animated: React.ReactNode;
  transitionDuration?: number;
}) {
  const { mode } = useAnimationMode();

  return (
    <div className="relative">
      <div
        className="transition-opacity"
        style={{
          opacity: mode === 'classic' ? 1 : 0,
          position: 'relative',
          zIndex: mode === 'classic' ? 10 : 5,
          transitionDuration: `${transitionDuration}s`,
        }}
      >
        {classic}
      </div>
      <div
        className="transition-opacity"
        style={{
          opacity: mode === 'animated' ? 1 : 0,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: mode === 'animated' ? 10 : 5,
          transitionDuration: `${transitionDuration}s`,
        }}
      >
        {animated}
      </div>
    </div>
  );
}

/**
 * A consistent layout wrapper that maintains the same structure across animation modes
 * @returns The appropriate layout component based on animation mode
 */
export function useAnimationLayout() {
  const { mode } = useAnimationMode();
  return mode === 'classic' ? Layout : AnimatedLayout;
}
