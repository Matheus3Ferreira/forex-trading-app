import { useState, ChangeEvent } from "react";

import { Button, Form, Modal } from "react-bootstrap";
import api from "../../services/api";
import "./index.scss";

interface IModalProps {
  setWallet: React.Dispatch<React.SetStateAction<number>>;
}

export default function DepositModal({ setWallet }: IModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputAmount, setInputAmount] = useState<number>();

  async function depositValue() {
    const response = await api.put(
      "/users/",
      {
        sumResult: inputAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    setWallet(response.data.wallet);
  }

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    let eventValue: number = parseFloat(event.currentTarget.value);
    setInputAmount(eventValue);
  }

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
            placeholder="15,25"
            onChange={handleAmountChange}
            value={inputAmount}
          />
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={depositValue}>
            Deposit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
