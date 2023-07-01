import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();
const accessToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";

function ContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [allQuotes, setAllQuotes] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/quotes", {
        params: {
          pageSize: 3,
          page: pageNum,
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
  }, [pageNum, accessToken]);

  const values = {
    token,
    setToken,
    allQuotes,
    setAllQuotes,
    pageNum,
    setPageNum,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
