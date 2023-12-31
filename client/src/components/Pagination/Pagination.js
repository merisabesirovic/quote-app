import React, { useContext } from "react";
import Pagination from "react-bootstrap/Pagination";
import { AppContext } from "../../context/AppContext";
import "./Pagination.css";

const PaginationBasic = () => {
  const { allQuotes, setAllQuotes, pageNum, setPageNum } =
    useContext(AppContext);
  let num = allQuotes.quotesCount / 3;
  let totalPages = num % 1 !== 0 ? num + 1 : num;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageClick = (number) => {
    setPageNum(number);
    scrollToTop();
  };

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === pageNum}
        onClick={() => handlePageClick(number)}
        className={number === pageNum ? "active-page" : ""}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{paginationItems}</Pagination>
      <br />
    </div>
  );
};

export default PaginationBasic;
