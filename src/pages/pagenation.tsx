import React, { useState, useEffect } from 'react';

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void; // 페이지 변경 시 부모 컴포넌트에서 처리 가능
}

const ArticlePagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [currentRange, setCurrentRange] = useState<number>(0);

  useEffect(() => {
    // 현재 페이지가 속한 그룹(5개 단위) 계산
    const range = Math.floor((currentPage - 1) / 5);
    setCurrentRange(range);
  }, [currentPage]);

  useEffect(() => {
    // 현재 그룹의 페이지 목록 생성 (5개씩)
    const start = currentRange * 5 + 1;
    const end = Math.min(start + 4, totalPages);
    const pages: number[] = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i,
    );
    setPageNumbers(pages);
  }, [currentRange, totalPages]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page); // 부모 컴포넌트에서 데이터 요청 가능
  };

  const handleNextRange = () => {
    if ((currentRange + 1) * 5 < totalPages) {
      const newRange = currentRange + 1;
      setCurrentRange(newRange);
      handlePageClick(newRange * 5 + 1); // 다음 그룹의 첫 번째 페이지로 이동
    }
  };

  const handlePrevRange = () => {
    if (currentRange > 0) {
      const newRange = currentRange - 1;
      setCurrentRange(newRange);
      handlePageClick(newRange * 5 + 1); // 이전 그룹의 첫 번째 페이지로 이동
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-10 mb-10">
      <button
        onClick={handlePrevRange}
        disabled={currentRange === 0}
        className="px-2 py-1 border rounded disabled:opacity-50 sm:px-3 sm:py-1"
      >
        &lt;
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-2 py-1 border rounded sm:px-3 sm:py-1 ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white text-black'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextRange}
        disabled={(currentRange + 1) * 5 >= totalPages}
        className="px-2 py-1 border rounded disabled:opacity-50 sm:px-3 sm:py-1"
      >
        &gt;
      </button>
    </div>
  );
};

export default ArticlePagination;
