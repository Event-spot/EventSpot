import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import PageLink from "./PageLink";
import styles from "./Pagination.module.scss";
import { PaginationItems } from "./PaginationLogic";

export type PageLinkProps = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage,
}: PageLinkProps) {
  const pageNums = PaginationItems(currentPage, lastPage, maxLength);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    scrollToTop(); // Wywołanie funkcji scrollToTop po zmianie strony
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <PageLink
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        <IoIosArrowBack />
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={currentPage === pageNum}
          disabled={isNaN(pageNum)}
          onClick={() => handlePageClick(pageNum)}
        >
          {!isNaN(pageNum) ? pageNum : '...'}
        </PageLink>
      ))}
      <PageLink
        disabled={currentPage === lastPage}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        <IoIosArrowForward />
      </PageLink>
    </nav>
  );
}
