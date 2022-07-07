import { ChangeEvent } from "react";
import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import api from "../../services/api";
import "./index.scss";
import verifyVolumeData from "./verifyVolumeData";

interface ITrade {
  _id: string;
  volume: number;
  openValueTrade: number;
  type: string;
  symbol: string;
  user: string;
  openAt: Date;
  closeAt: Date;
  closeValueTrade: number;
  result: number;
}

interface IUser {
  name: string;
  email: string;
  wallet: number;
  trades: ITrade[];
}

interface IOpenTradeProps {
  symbol: React.Dispatch<React.SetStateAction<string>>;
  currency: {
    bidPrice: number;
    askPrice: number;
  };
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
  userData: IUser;
}

interface ICreateTrade {
  symbol: string;
  volume: number;
  type: string;
}

export default function OpenTrade({
  symbol,
  currency,
  setUserData,
  userData,
}: IOpenTradeProps) {
  const [dropdownValue, setDropdownValue] = useState<string>(
    "Select your currency"
  );
  const [volume, setVolume] = useState<number>(0.5);

  function handleVolumeChange(event: ChangeEvent<HTMLInputElement>) {
    let eventValue: number = parseFloat(event.currentTarget.value);
    setVolume(verifyVolumeData(eventValue));
  }

  async function createTrade({ symbol, volume, type }: ICreateTrade) {
    const response = await api.post(
      "/trades/",
      { symbol, volume, type },
      {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    setUserData({ ...userData, trades: [...userData.trades, response.data] });
    return console.log(userData.trades);
  }

  return (
    <div className="container-open-trade">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {dropdownValue}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setDropdownValue("GBPUSD");
              symbol("GBPUSD");
            }}
          >
            GBPUSD
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setDropdownValue("USDGBP");
              symbol("USDGBP");
            }}
          >
            USDGBP
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="trade-values-container">
        <button
          className="create-trade-btn buy-trade-btn"
          onClick={() =>
            createTrade({ symbol: dropdownValue, volume: volume, type: "buy" })
          }
        >
          <div className="operation-btn">Buy</div>
          <span className="operation-value">
            {dropdownValue !== "Select your currency" ? currency.bidPrice : 0}
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
        <button
          className="create-trade-btn sell-trade-btn"
          onClick={() =>
            createTrade({ symbol: dropdownValue, volume: volume, type: "sell" })
          }
        >
          <div className="operation-btn">Sell</div>
          <span className="operation-value">
            {dropdownValue !== "Select your currency" ? currency.askPrice : 0}
          </span>
        </button>
      </div>
    </div>
  );
}
