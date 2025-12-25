import { useEffect, useRef } from "react"

interface UseInfiniteScrollOptions {
  loading: boolean
  hasMore: boolean
  onLoadMore: () => void
  rootMargin?: string
}

export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  rootMargin = "0px",
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!targetRef.current) return;

    if (loading || !hasMore) {
      observerRef.current?.disconnect();
      return;
    }

    observerRef.current?.disconnect();
    let triggered = false;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading && hasMore && !triggered) {
          triggered = true;
          onLoadMore();
          observerRef.current?.disconnect();
        }
      },
      { rootMargin }
    );
    observerRef.current.observe(targetRef.current);
    return () => observerRef.current?.disconnect();
  }, [loading, hasMore, onLoadMore, rootMargin]);

  return { targetRef };
}