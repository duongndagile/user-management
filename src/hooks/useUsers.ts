import { useCallback, useEffect, useRef, useState } from "react";
import type { User, UserResponse, Info } from "../types/user.type";
import { getUsers } from "../api/users.api";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(7);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<Info | null>(null);
  const prevInfoRef = useRef<Info | null>(null);

  const seed = "user-list";
  const lastFetchedPage = useRef<number | null>(null);
  const failedPageRef = useRef<number | null>(null);
  const fetchUsers = useCallback(
    async (
      pageNumber: number,
      limitNumber: number = 7,
      append: boolean = false
    ) => {
      if (lastFetchedPage.current === pageNumber && !error) return;
      lastFetchedPage.current = pageNumber;
      try {
        setIsLoading(true);
        setError(null);
        setLimit(limitNumber);
        const data: UserResponse = await getUsers(
          pageNumber,
          limitNumber,
          seed
        );
        setUsers((prev) =>
          append && pageNumber > 1 ? [...prev, ...data.results] : data.results
        );
        prevInfoRef.current = info;
        setInfo(data.info);
        failedPageRef.current = null;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users");
        failedPageRef.current = pageNumber;
      } finally {
        setIsLoading(false);
      }
    },
    [info, error]
  );

  useEffect(() => {
    if (!error) {
      fetchUsers(page);
    }
  }, [page, fetchUsers]);

  const retry = useCallback(
    ({ append = false }: { append?: boolean }) => {
      if (failedPageRef.current !== null) {
        fetchUsers(failedPageRef.current, limit, append);
      }
    },
    [fetchUsers, limit]
  );

  let hasMore = true;
  if (info) {
    if (info.results < limit) {
      hasMore = false;
    } else if (prevInfoRef.current && info.page === prevInfoRef.current.page) {
      hasMore = false;
    }
  } else if (error) {
    hasMore = false;
  }

  const loadMore = () => {
    if (error) return;
    if (hasMore && !isLoading) {
      fetchUsers(page + 1, limit, true);
      setPage((prev) => prev + 1);
    }
  };
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(1, prev - 1));
  const changePage = (p: number) => setPage(p);
  const firstPage = () => setPage(1);
  const lastPage = () => setPage(users.length / limit);
  const refetch = () => fetchUsers(page);

  return {
    users,
    page,
    isLoading,
    error,
    hasMore,
    loadMore,
    nextPage,
    prevPage,
    changePage,
    firstPage,
    lastPage,
    refetch,
    retry,
  };
};
