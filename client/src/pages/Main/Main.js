import React, { useEffect, useState } from "react";
import axios from "axios";
import QuoteCard from "../../components/QuoteCard/QuoteCard";

const accessToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";

export default function Main() {
  const [allQuotes, setAllQuotes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/quotes", {
          headers: { Authorization: "Bearer " + accessToken },
        });
        const info = response.data;
        setAllQuotes(info);
        console.log(info);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {allQuotes.quotes &&
        allQuotes.quotes.map((e) => (
          <QuoteCard
            key={e.id}
            author={e.author}
            createdAt={e.createdAt}
            content={e.content}
            tags={e.tags}
            percentage={Math.floor(
              (e.upvotesCount / (e.upvotesCount + e.downvotesCount)) * 100
            )}
          />
        ))}
    </div>
  );
}
