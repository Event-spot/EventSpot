import { IconBase } from "react-icons";
import PageLink from "./PageLink";
import styles from "./Pagination.module.scss";
import { PaginationItems } from "./PaginationLogic";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";



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
  
    return (
      <nav className={styles.pagination} aria-label="Pagination">
        <PageLink
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <IoIosArrowBack />
        </PageLink>
        {pageNums.map((pageNum, idx) => (
          <PageLink
            key={idx}
            active={currentPage === pageNum}
            disabled={isNaN(pageNum)}
            onClick={() => setCurrentPage(pageNum)}
          >
            {!isNaN(pageNum) ? pageNum : '...'}
          </PageLink>
        ))}
        <PageLink
          disabled={currentPage === lastPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <IoIosArrowForward />
        </PageLink>
      </nav>
    );
  }