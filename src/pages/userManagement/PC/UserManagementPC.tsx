import { useCallback } from "react";
import { UserTable } from "../../../components/users/UserTable";
import { useUsers } from "../../../hooks/useUsers";

export const UserManagementPC = () => {
  const {
    users,
    page,
    error,
    isLoading,
    changePage,
    nextPage,
    prevPage,
    retry,
  } = useUsers();

  const totalPages = 7;

  const handlePageChange = useCallback(
    (p: number) => {
      changePage(p);
    },
    [changePage]
  );

  const handleRetry = useCallback(() => {
    retry({ append: false });
  }, [retry]);

  if (error)
    return (
      <div className="flex flex-col items-center w-full">
        <p className="text-red-500">{error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );

  return (
    <div>
      <p className="text-3xl font-bold mb-4 text-black flex flex-start">
        Employee Directory
      </p>
      <UserTable
        users={users}
        page={page}
        totalPages={totalPages}
        loadingData={isLoading}
        onPageChange={handlePageChange}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </div>
  );
};
