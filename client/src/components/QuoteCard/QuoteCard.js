import React from "react";
import Card from "react-bootstrap/Card";
import "../../fonts/fonts.css";

function QuoteCard({ author, content, createdAt, tags, percentage }) {
  return (
    <Card
      className="shadow-lg rounded-lg"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Card.Header className="bg-slate-400 text-white">Quote</Card.Header>
      <Card.Body className="bg-teal-900 font-poppins">
        <blockquote className="bg-teal-950 p-5 rounded-md">
          <p className="text-white font-bold text-lg sm:text-xl md:text-2xl">
            {content}
          </p>
          <footer className="flex text-white justify-between items-center">
            <div>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold">
                {author}
              </p>
              <cite className="text-gray-300" title="Source Title">
                {createdAt}
              </cite>
              {tags.map((e) => (
                <p
                  key={e}
                  className="text-teal-300 text-sm sm:text-base md:text-lg"
                >
                  #{e}
                </p>
              ))}
            </div>
            <span
              className={
                "font-extrabold text-2xl" +
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
  );
}

export default QuoteCard;
