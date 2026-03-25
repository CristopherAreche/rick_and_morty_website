import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ info, setPageNumber, pageNumber }) => {
  //el signo de interrogacion se usa para determinar si la info existe, entonces traeme .pages. Es como un manejador de errores.
  let [width, setWidth] = useState(window.innerWidth);
  let totalPages = info?.pages ?? 0;

  let updateDimension = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, []);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      className="pagination justify-content-center"
      forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
      nextLabel="Next"
      nextClassName="page-item page-nav"
      nextLinkClassName="page-link page-nav-link"
      previousLabel="Back"
      previousClassName="page-item page-nav"
      previousLinkClassName="page-link page-nav-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      marginPagesDisplayed={width < 576 ? 1 : 2}
      pageRangeDisplayed={width < 576 ? 1 : 2}
      activeClassName="active"
      onPageChange={(data) => {
        setPageNumber(data.selected + 1);
      }}
      pageCount={totalPages}
    />
  );
};
export default Pagination;
