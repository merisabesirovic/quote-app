import React, { useEffect, useState } from "react";
import axios from "axios";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import PaginationBasic from "../../components/Pagination/Pagination";

const accessToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";

export default function Main() {
  const { allQuotes, setAllQuotes } = useContext(AppContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleUpvote = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/quotes/${id}/upvote`,
        {},
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDownvote = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/quotes/${id}/downvote`,
        {},
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="overflow-x-hidden bg-zinc-700 flex-col">
        {allQuotes.quotes &&
          allQuotes.quotes.map((e) => (
            <QuoteCard
              key={e.id}
              id={e.id}
              author={e.author}
              createdAt={e.createdAt}
              content={e.content}
              tags={e.tags}
              upvotesCount={e.upvotesCount}
              downvotesCount={e.downvotesCount}
              percentage={Math.floor(
                (e.upvotesCount / (e.upvotesCount + e.downvotesCount)) * 100
              )}
              onLike={() => handleUpvote(e.id)}
              onDislike={() => handleDownvote(e.id)}
            />
          ))}
        <div className="d-flex justify-content-center">
          <PaginationBasic onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
}
