import React from "react";
import Card from "react-bootstrap/Card";
import "../../fonts/fonts.css";

function QuoteCard({ author, content, createdAt, tags, percentage }) {
  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleString();
    return formattedDate;
  };

  return (
    <div
      className="row justify-content-center mb-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] hover:drop-shadow-2xl p-10"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="col-lg-6 col-md-8 col-sm-10">
        <Card className="drop-shadow-lg ">
          <Card.Header className="bg-slate-400 text-white p-2">
            Quote
          </Card.Header>
          <Card.Body className="bg-teal-900 font-poppins p-3">
            <blockquote className="bg-teal-950 p-2 rounded-md">
              <p className="text-white font-bold text-md sm:text-lg md:text-xl">
                {content}
              </p>
              <footer className="flex text-white justify-between items-center">
                <div>
                  <p className="text-md sm:text-lg md:text-xl font-semibold">
                    {author}
                  </p>
                  <cite className="text-gray-300 text-sm" title="Source Title">
                    {formatDate(createdAt)}
                  </cite>
                  {tags.map((e) => (
                    <p
                      key={e}
                      className="text-teal-300 text-xs sm:text-sm md:text-md"
                    >
                      #{e}
                    </p>
                  ))}
                </div>
                <span
                  className={
                    "font-extrabold text-lg" +
                    (percentage >= 0 && percentage <= 21
                      ? " text-orange-600"
                      : percentage > 21 && percentage <= 45
                      ? " text-yellow-500"
                      : percentage > 45 && percentage <= 70
                      ? " text-lime-300"
                      : percentage > 70 && percentage <= 100
                      ? " text-green-700"
                      : "")
                  }
                >
                  {percentage}%
                </span>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default QuoteCard;