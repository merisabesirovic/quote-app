import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./SortMenu.css";
import { AppContext } from "../../context/AppContext";

function SortMenu() {
  const { handleSortClick } = useContext(AppContext);

  const handleSort = (sortValue) => {
    handleSortClick(sortValue);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort By
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSort(["createdAt", "asc"])}>
          Latest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort(["createdAt", "desc"])}>
          Earliest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort(["author", "asc"])}>
          Sort by author
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort(["upvotesCount", "desc"])}>
          Most liked
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort(["downvotesCount", "desc"])}>
          Most disliked
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortMenu;
