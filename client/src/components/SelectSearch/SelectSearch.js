import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const accessToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";

export default function SelectSearch() {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { all, setAll } = useContext(AppContext);
  const { allQuotes, setAllQuotes } = useContext(AppContext);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredQuotes = filterQuotes();
    setAllQuotes({ quotes: filteredQuotes });
  }, [selectedTags, setAllQuotes]);

  useEffect(() => {
    console.log("Updated allQuotes:", allQuotes);
  }, [allQuotes]);

  useEffect(() => {
    console.log("Updated Tags:", tags);
  }, [tags]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/tags", {
        headers: { Authorization: "Bearer " + accessToken },
      });
      const tagsData = response.data.map((tag, index) => ({
        id: index,
        name: tag,
      }));
      console.log("Tags:", tagsData);
      setTags(tagsData);
    } catch (err) {
      console.log(err);
    }
  };

  const filterQuotes = () => {
    if (selectedTags.length === 0) {
      return all.quotes;
    }
    return all.quotes.filter((quote) => {
      return selectedTags.some((tag) => quote.tags.includes(tag.name));
    });
  };

  const handleSelection = (selectedList) => {
    setSelectedTags(selectedList);
    const filteredQuotes = filterQuotes();
    setAllQuotes({ quotes: filteredQuotes });
  };

  return (
    <div>
      {tags.length > 0 ? (
        <Multiselect
          options={tags}
          selectedValues={selectedTags}
          onSelect={handleSelection}
          onRemove={handleSelection}
          displayValue="name"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
