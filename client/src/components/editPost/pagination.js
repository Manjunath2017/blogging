import React from "react";
import { Link } from 'react-router-dom'
const Pagination = ({ totalNumberOfPages, changePageNo, currentPage }) => { //changePageNo this will reflect to previous page
  var pageNumber = [];
  for (var i = 1; i <= Math.ceil(totalNumberOfPages / 3); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
      {
          pageNumber.map(number => (            
            <li className={currentPage === number ? "active":"page-item"} key={number}>
              <Link to="#" className={"page-link" } onClick={() => changePageNo(number)} > {number} </Link>
            </li>
          ))
        }
        </ul>
    </nav>
  );
};
export default Pagination;