import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./index.scss";

export default function DepositModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Deposity
      </Button>

      <Modal className="modal-container" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit your investiment!</Modal.Title>
        </Modal.Header>
        <div className="container-modal-body">
          <Form.Label>Amount value ($)</Form.Label>
          <Form.Control
            type="number"
            className="input-amount"
            placeholder="15.25"
          />
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Deposity
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
