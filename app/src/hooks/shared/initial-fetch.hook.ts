import { useEffect } from 'react'

export function useInitialFetch(loadFn: () => void, shouldLoad: boolean) {
  useEffect(() => {
    if (!shouldLoad) return
    loadFn()
  }, [loadFn, shouldLoad])
}
