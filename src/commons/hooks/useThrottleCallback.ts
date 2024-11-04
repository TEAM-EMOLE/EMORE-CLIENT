import { DependencyList, useCallback, useEffect, useRef, useState } from 'react';
import useThrottle from './useThrottle';

function useThrottleCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  limit: number,
  deps: DependencyList
): T {
  const [active, setActive] = useState(0);
  const throttledActive = useThrottle(active, limit);

  const argsRef = useRef<unknown>(null);
  const func = useCallback(callback, [callback, deps]);

  const throttledFunc = (...args: unknown[]) => {
    argsRef.current = args;
    setActive((prev) => prev + 1);
  };

  useEffect(() => {
    if (throttledActive === 0) return;
    func(argsRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [throttledActive]);

  return throttledFunc as T;
}

export default useThrottleCallback;
