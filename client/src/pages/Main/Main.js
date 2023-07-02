import React, { useContext } from "react";
import axios from "axios";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { AppContext } from "../../context/AppContext";
import PaginationBasic from "../../components/Pagination/Pagination";

const accessToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";

export default function Main() {
  const { allQuotes, setAllQuotes } = useContext(AppContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleUpvote = async (id) => {
    let updatedQuotes = [...allQuotes.quotes];
    updatedQuotes = updatedQuotes.map((quote) => {
      if (quote.id === id) {
        if (quote.givenVote === "none") {
          (async () => {
            try {
              const response = await axios.post(
                `http://localhost:8000/quotes/${id}/upvote`,
                {},
                {
                  headers: { Authorization: "Bearer " + accessToken },
                }
              );
              console.log(response.data);
              quote.upvotesCount += 1;
              quote.givenVote = "upvote";
              setAllQuotes((prevQuotes) => ({
                ...prevQuotes,
                quotes: updatedQuotes,
              }));
            } catch (error) {
              console.log(error.response.data);
            }
          })();
        } else if (quote.givenVote === "upvote") {
          (async () => {
            try {
              const response = await axios.delete(
                `http://localhost:8000/quotes/${id}/upvote`,
                {
                  headers: { Authorization: "Bearer " + accessToken },
                }
              );
              console.log(response.data);
              quote.upvotesCount -= 1;
              quote.givenVote = "none";
              setAllQuotes((prevQuotes) => ({
                ...prevQuotes,
                quotes: updatedQuotes,
              }));
            } catch (error) {
              console.log(error.response.data);
            }
          })();
        } else if (quote.givenVote === "downvote") {
          (async () => {
            try {
              const response = await axios.delete(
                `http://localhost:8000/quotes/${id}/downvote`,
                {
                  headers: { Authorization: "Bearer " + accessToken },
                }
              );
              console.log(response.data);
            } catch (error) {
              console.log(error.response.data);
              return;
            }
            try {
              const response = await axios.post(
                `http://localhost:8000/quotes/${id}/upvote`,
                {},
                {
                  headers: { Authorization: "Bearer " + accessToken },
                }
              );
              console.log(response.data);
              quote.upvotesCount += 1;
              quote.downvotesCount -= 1;
              quote.givenVote = "upvote";
              setAllQuotes((prevQuotes) => ({
                ...prevQuotes,
                quotes: updatedQuotes,
              }));
            } catch (error) {
              console.log(error.response.data);
            }
          })();
        }
      }
      return quote;
    });

    setAllQuotes((prevQuotes) => ({ ...prevQuotes, quotes: updatedQuotes }));
  };

  const handleDownvote = async (id) => {
    let updatedQuotes = [...allQuotes.quotes];
    updatedQuotes = updatedQuotes.map((quote) => {
      if (quote.id === id) {
        if (quote.givenVote === "none") {
          (async () => {
            try {
              const response = await axios.post(
                `http://localhost:8000/quotes/${id}/downvote`,
                {},
                {
                  headers: { Authorization: "Bearer " + accessToken },
                }
              );
              console.log(response.data);
              quote.downvotesCount += 1;
              quote.givenVote = "downvote";
              setAllQuotes((prevQuotes) => ({
                ...prevQuotes,
                quotes: updatedQuotes,
              }));
            } catch (error) {
              console.log(error.response.data);
            }
          })();
        } else if (quote.givenVote === "downvote") {
          (async () => {
            try {
              const response = await axios.delete(
                `http://localhost:8000/quotes/${id}/downvote`,
                {
                  headers: { Authorization: "Bearer " + accessToken },
                }
              );
              console.log(response.data);
              quote.downvotesCount -= 1;
              quote.givenVote = "none";
              setAllQuotes((prevQuotes) => ({
                ...prevQuotes,
                quotes: updatedQuotes,
              }));
            } catch (error) {
              console.log(error.response.data);
            }
          })();
        } else if (quote.givenVote === "upvote") {
          (async () => {
            try {
              const response = await axios.delete(
                `http://localhost:8000/quotes/${id}/upvote`,
                {
                  headers: { Authorization: "Bearer " + accessToken },
                }
              );
              console.log(response.data);
              try {
                const res = await axios.post(
                  `http://localhost:8000/quotes/${id}/downvote`,
                  {},
                  {
                    headers: { Authorization: "Bearer " + accessToken },
                  }
                );
                console.log(res.data);
                quote.upvotesCount -= 1;
                quote.downvotesCount += 1;
                quote.givenVote = "downvote";
                setAllQuotes((prevQuotes) => ({
                  ...prevQuotes,
                  quotes: updatedQuotes,
                }));
              } catch (error) {
                console.log(error.response.data);
              }
            } catch (error) {
              console.log(error.response.data);
            }
          })();
        }
      }
      return quote;
    });

    setAllQuotes((prevQuotes) => ({ ...prevQuotes, quotes: updatedQuotes }));
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
              percentage={
                e.upvotesCount === 0 && e.downvotesCount === 0
                  ? 0
                  : Math.floor(
                      (e.upvotesCount / (e.upvotesCount + e.downvotesCount)) *
                        100
                    )
              }
              onLike={() => handleUpvote(e.id)}
              onDislike={() => handleDownvote(e.id)}
              givenVote={e.givenVote}
            />
          ))}
        <div className="d-flex justify-content-center">
          <PaginationBasic onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
}
