import { useLayoutEffect } from 'react';

export const useLockBodyScroll = (lock: boolean) => {
  useLayoutEffect((): (() => void) => {
    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => (document.body.style.overflow = 'auto');
  }, [lock]);
};
