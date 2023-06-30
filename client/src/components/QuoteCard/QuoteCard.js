import Card from "react-bootstrap/Card";

function QuoteCard({ author, content, createdAt, tags }) {
  return (
    <Card>
      <Card.Header>Quote</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p> {content} </p>
          <footer className="blockquote-footer">
            {author} <cite title="Source Title">{createdAt}</cite>
            {tags.map((e) => (
              <p>#{e}</p>
            ))}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default QuoteCard;
