import * as React from 'react';

import { MantineTransition, Transition } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';

function useTransition(amount = 50, id = ''): boolean {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => {
      setMounted(false);
    };
  }, []);

  React.useEffect(() => {
    setMounted(false);
    setTimeout(() => {
      setMounted(true);
    }, amount);
  }, [id]);

  return mounted;
}

export function TransitionWrapper({
  children,
  transition,
  duration = 200,
}: {
  children(styles?: React.CSSProperties): React.ReactElement;
  transition: MantineTransition;
  duration?: number;
}) {
  const mounted = useTransition();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return children();
  }

  return (
    <Transition
      mounted={mounted}
      transition={transition}
      duration={duration}
      timingFunction="ease-in-out">
      {styles => children(styles)}
    </Transition>
  );
}
