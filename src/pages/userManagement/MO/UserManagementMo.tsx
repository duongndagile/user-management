import { useUsers } from "../../../hooks/useUsers";
import { useInfiniteScroll } from "../../../hooks/useInfinityScroll";
import { UserCard } from "../../../components/users/UserCard";
import { useCallback } from "react";

export const UserManagementMo = () => {
  const { users, isLoading, hasMore, loadMore, error, retry } = useUsers();

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      loadMore();
    }
  }, [isLoading, hasMore, loadMore]);
  
  const { targetRef } = useInfiniteScroll({
    loading: isLoading,
    hasMore,
    onLoadMore: handleLoadMore,
    rootMargin: "0px"
  });

  const handleRetry = useCallback(() => {
    retry({ append: true });
  }, [retry]);

  return (
    <div className="text-black max-w-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full bg-blue-600">
        <p className="text-3xl font-bold pt-8 pb-4 text-white flex justify-center bg-blue-600">Employee Directory</p>
      </div>
      <div className="pt-24 flex flex-col gap-4 px-4 w-[90vw] overflow-x-hidden">
        {users.map((user) => (
          <UserCard key={user.login.uuid} user={user} />
        ))}
        <div ref={targetRef} className="h-30 w-full flex items-center justify-center">
          {isLoading && <span className="text-gray-500">Loading more data...</span>}
          {error && (
            <div className="flex flex-col items-center w-full mt-8">
              <span className="text-red-500 mb-2">{error}</span>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleRetry}
                disabled={isLoading}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
