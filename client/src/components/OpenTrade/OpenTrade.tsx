import { ChangeEvent } from "react";
import { FormEvent, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import "./index.css";
import verifyVolumeData from "./verifyVolumeData";

export default function OpenTrade() {
  const [dropdownValue, setDropdownValue] = useState<string>(
    "Select your currency"
  );
  const [volume, setVolume] = useState<number>(0.5);

  function handleVolumeChange(event: ChangeEvent<HTMLInputElement>) {
    let eventValue: number = parseFloat(event.currentTarget.value);
    setVolume(verifyVolumeData(eventValue));
  }

  return (
    <div className="container-open-trade">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {dropdownValue}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setDropdownValue("GBPUSD")}>
            GBPUSD
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdownValue("USDGBP")}>
            USDGBP
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="trade-values-container">
        <button className="create-trade-btn buy-trade-btn">
          <div className="operation-btn">Buy</div>
          <span className="operation-value">
            {dropdownValue != "Select your currency" ? 1.10984 : 0}
          </span>
        </button>
        <div className="volume-container">
          <label htmlFor="" className="">
            Volume
          </label>
          <Form.Control
            className="input-volume"
            type="number"
            value={volume}
            onChange={handleVolumeChange}
            step="0.50"
          />
        </div>
        <button className="create-trade-btn sell-trade-btn">
          <div className="operation-btn">Sell</div>
          <span className="operation-value">
            {dropdownValue != "Select your currency" ? 1.10984 : 0}
          </span>
        </button>
      </div>
    </div>
  );
}
