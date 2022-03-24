import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useDispatch } from "react-redux";
import { getCredentials } from "../../redux/actions/credentialsActions";

function PaginateOperations({ totalPage, currentPage, userId }) {
  const dispatch = useDispatch();
  console.log(currentPage===0, totalPage)
  function handleClick(e) {
    console.log(e.target.dataset);
    switch (e.target.dataset.name) {
      case "left": {
        const newCurrPage = currentPage === 0 ? 0 : currentPage - 1;

        dispatch(getCredentials(userId, newCurrPage, 2));
        break;
      }
      case "right": {
        const newCurrPage = currentPage + 1;
        dispatch(getCredentials(userId, newCurrPage, 2))
        break;
      }
      default:
        return;
    }
  }
  return (
    <div className="flex mt-4 text-gray-200 place-content-end">
      Page {currentPage+1 || 0} of {totalPage || 0}
      <div className="flex items-center ml-4 space-x-4" onClick={handleClick}>
        <div className="cursor-pointer" data-name="left">
          { currentPage>=1 ?<ArrowCircleLeftIcon className="pointer-events-none" />:null}
        </div>

        <div data-name="right" className="cursor-pointer">
          {currentPage+1 !==totalPage ? <ArrowCircleRightIcon className="pointer-events-none" />:null}
        </div>
      </div>
    </div>
  );
}

export default PaginateOperations;
