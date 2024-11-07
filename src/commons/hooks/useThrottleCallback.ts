/* eslint-disable react-hooks/exhaustive-deps */
import _ from 'lodash';
import { DependencyList, useCallback, useEffect, useRef } from 'react';

export default function useThrottleCallback<T extends (...args: any[]) => any>(
  callback: T,
  limit: number,
  deps: DependencyList
): T {
  const callbackRef = useRef<T>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  const throttledCallback = useCallback(
    _.throttle((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, limit),
    [limit]
  );

  useEffect(() => {
    return () => {
      throttledCallback.cancel();
    };
  }, [throttledCallback]);

  return throttledCallback as unknown as T;
}
