import { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

function Example() {
  const [show, setShow] = useState(false);
  const { allQuotes, setAllQuotes } = useContext(AppContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{ backgroundColor: "green" }} onClick={handleShow}>
        Add your own quote
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your quote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label></Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Author"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Add your quote</Form.Label>
              <Form.Control required as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add tags</Form.Label>
              <Form.Control required type="text" placeholder="#tag" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "green" }} onClick={handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            style={{ backgroundColor: "green" }}
            onClick={SubmitEvent}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
