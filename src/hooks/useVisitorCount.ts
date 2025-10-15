import { useEffect, useMemo, useState } from 'react';

interface VisitorCountResult {
  count: number | null;
  isLoading: boolean;
  error: string | null;
}

const STORAGE_BASE_KEY = 'kp-visitor-count-hit';

type CounterMode = 'get' | 'hit';

const buildCounterApiTargets = (mode: CounterMode, namespace: string, key: string) => {
  const safeNamespace = namespace.replace(/[^a-zA-Z0-9_-]/g, '-');
  const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '-');
  const base = `https://api.counterapi.dev/v1/${safeNamespace}/${safeKey}`;
  const target = mode === 'hit' ? `${base}/up` : base;
  const urlEncodedTarget = encodeURIComponent(target);

  return [
    target,
    `https://api.allorigins.win/raw?url=${urlEncodedTarget}`,
    `https://cors.isomorphic-git.org/${target}`,
  ];
};

export const useVisitorCount = (): VisitorCountResult => {
  const [state, setState] = useState<VisitorCountResult>({
    count: null,
    isLoading: true,
    error: null,
  });

  const { namespace, key } = useMemo(() => {
    const envNamespace = import.meta.env.VITE_COUNT_API_NAMESPACE;
    const envKey = import.meta.env.VITE_COUNT_API_KEY;

    return {
      namespace: typeof envNamespace === 'string' && envNamespace.trim().length > 0 ? envNamespace : 'kosan-portfolio',
      key: typeof envKey === 'string' && envKey.trim().length > 0 ? envKey : 'visitors',
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const controller = new AbortController();
    let cancelled = false;
    const storageKey = `${STORAGE_BASE_KEY}:${namespace}/${key}`;
    const mode: CounterMode = window.sessionStorage.getItem(storageKey) ? 'get' : 'hit';

    const fetchCount = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const targets = buildCounterApiTargets(mode, namespace, key);
        const data = await fetchWithFallback(targets, controller.signal);

        if (cancelled) return;

        if (typeof data.count === 'number') {
          setState({ count: data.count, isLoading: false, error: null });
          if (mode === 'hit') {
            window.sessionStorage.setItem(storageKey, '1');
          }
        } else {
          throw new Error('Counter API returned an unexpected payload');
        }
      } catch (error) {
        if (cancelled) return;
        setState({
          count: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    fetchCount();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [namespace, key]);

  return state;
};

export default useVisitorCount;
const fetchWithFallback = async (urls: string[], signal: AbortSignal) => {
  let lastError: unknown = null;

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        signal,
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        lastError = new Error(`Counter API responded with ${response.status}`);
        continue;
      }

      const text = await response.text();
      const parsed = JSON.parse(text) as { count?: number };
      return parsed;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Counter API failed');
};
