import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

function Example() {
  const [show, setShow] = useState(false);
  const { setAllQuotes } = useContext(AppContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const accessToken = "yuim98oq-e275-45a2-bc2e-b3098036d655";

  const [userInput, setUserInput] = useState({
    quoteText: "",
    author: "",
    tags: [],
  });

  const addQuote = async (input) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/quotes",
        {
          content: input.quoteText,
          author: input.author,
          tags: input.tags,
        },
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      );

      const info = response.data;

      console.log(info);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuote(userInput);
    handleClose();
  };

  const turnIntoArray = (string) => {
    const elements = string.split(",");
    return elements.map((element) => element.trim());
  };

  return (
    <>
      <Button
        style={{ backgroundColor: "rgb(31, 71, 51)" }}
        onClick={handleShow}
      >
        + Add your own quote
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your quote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Author"
                autoFocus
                value={userInput.author}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Add your quote</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                value={userInput.quoteText}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    quoteText: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add tags</Form.Label>
              <Form.Control
                value={userInput.tags.join(",")}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    tags: turnIntoArray(e.target.value),
                  }))
                }
                required
                type="text"
                placeholder="#tag"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "rgb(31, 71, 51)" }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            type="submit"
            style={{ backgroundColor: "rgb(31, 71, 51)" }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
