import React, { useCallback } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export const Pagination = React.memo(
  ({
    page,
    totalPages,
    onPageChange,
    onNextPage,
    onPrevPage,
  }: PaginationProps) => {
    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    const handleNextPage = useCallback(() => {
      if (isLastPage) return;
      onNextPage();
    }, [onNextPage, isLastPage]);

    const handlePrevPage = useCallback(() => {
      if (isFirstPage) return;
      onPrevPage();
    }, [onPrevPage, isFirstPage]);

    const handleChangePage = useCallback(
      (p: number) => {
        console.log("Changing to page:", p);
        onPageChange(p);
      },
      [onPageChange]
    );

    return (
      <div className="flex items-center justify-center gap-2 mt-6">
        <div
          onClick={handlePrevPage}
          className="px-3 py-2 disabled:opacity-50 text-black"
        >
          <p className="px-3 py-2 hover:underline hover:text-blue-500 cursor-pointer">
            Previous
          </p>
        </div>

        {(() => {
          const pageButtons = [];
          const maxButtons = 7;
          if (totalPages <= maxButtons) {
            for (let p = 1; p <= totalPages; p++) {
              pageButtons.push(
                <div
                  key={p}
                  onClick={() => handleChangePage(p)}
                  className={`px-3 py-2 hover:underline cursor-pointer ${
                    p === page
                      ? "text-blue-500 font-bold text-xl"
                      : "text-black hover:text-blue-500"
                  }`}
                >
                  <p>{p}</p>
                </div>
              );
            }
          } else {
            const showLeftEllipsis = page > 4;
            const showRightEllipsis = page < totalPages - 3;
            pageButtons.push(
              <div
                key={1}
                onClick={() => handleChangePage(1)}
                className={`px-3 py-2 hover:underline cursor-pointer ${
                  page === 1 ? "text-blue-500 font-bold text-xl" : "text-black hover:text-blue-500"
                }`}
              >
                <p>1</p>
              </div>
            );

            if (showLeftEllipsis) {
              pageButtons.push(
                <span key="left-ellipsis" className="px-2 text-black">...</span>
              );
            }

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPages - 1, page + 1);
            for (let p = start; p <= end; p++) {
              if (p === 1 || p === totalPages) continue;
              pageButtons.push(
                <div
                  key={p}
                  onClick={() => handleChangePage(p)}
                  className={`px-3 py-2 hover:underline cursor-pointer ${
                    p === page
                      ? "text-blue-500 font-bold text-xl"
                      : "text-black hover:text-blue-500"
                  }`}
                >
                  <p>{p}</p>
                </div>
              );
            }

            if (showRightEllipsis) {
              pageButtons.push(
                <span key="right-ellipsis" className="px-2 text-black">...</span>
              );
            }

            pageButtons.push(
              <div
                key={totalPages}
                onClick={() => handleChangePage(totalPages)}
                className={`px-3 py-2 hover:underline cursor-pointer ${
                  page === totalPages ? "text-blue-500 font-bold text-xl" : "text-black hover:text-blue-500"
                }`}
              >
                <p>{totalPages}</p>
              </div>
            );
          }
          return pageButtons;
        })()}

        <div
          onClick={handleNextPage}
          className="px-3 py-2 disabled:opacity-50 text-black"
        >
          <p className="px-3 py-2 hover:underline hover:text-blue-500 cursor-pointer">
            Next
          </p>
        </div>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";
