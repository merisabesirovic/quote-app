import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();
const accessToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";

function ContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [allQuotes, setAllQuotes] = useState({});
  const [sort, setSort] = useState([]);
  const [all, setAll] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/quotes", {
        params: {
          pageSize: 3,
          page: pageNum,
          sortBy: sort[0],
          sortDirection: sort[1],
        },
        headers: { Authorization: "Bearer " + accessToken },
      });
      const info = response.data;
      setAllQuotes(info);
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNum, sort]);
  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:8000/quotes", {
        headers: { Authorization: "Bearer " + accessToken },
      });
      const info = response.data;
      setAll(info);
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleSortClick = (sortValue) => {
    setSort(sortValue);
  };

  const values = {
    token,
    setToken,
    allQuotes,
    setAllQuotes,
    pageNum,
    setPageNum,
    sort,
    handleSortClick,
    all,
    setAll,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
