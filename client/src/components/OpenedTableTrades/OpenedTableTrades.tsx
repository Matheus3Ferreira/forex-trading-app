import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import api from "../../services/api";
import "./index.scss";

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

interface ITradeProps {
  trades: ITrade[];
  currency: {
    bidPrice: number;
    askPrice: number;
  };
  symbol: string;
  setWallet: React.Dispatch<React.SetStateAction<number>>;
}

export default function OpenedTableTrades({
  trades,
  currency,
  symbol,
  setWallet,
}: ITradeProps) {
  const [openedTrades, setOpenedTrades] = useState<ITrade[]>([]);

  useEffect(() => {
    setOpenedTrades(
      trades.filter((trade) => !trade.closeAt || !trade.closeValueTrade)
    );
  }, [trades]);

  async function CloseTrade(tradeId: string) {
    const response = await api.put(
      "/trades/",
      { tradeId: tradeId },
      {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    setOpenedTrades(openedTrades.filter((trade) => trade._id !== tradeId));
    console.log(response);
    setWallet(response.data.wallet);
  }

  if (openedTrades.length <= 0)
    return (
      <div className="table-container no-value">
        <h3>Oh no! You don't have already trades opened.</h3>
        <h2>Let's start.</h2>
      </div>
    );
  return (
    <div className="table-container">
      <h1>Open trades</h1>
      <Table responsive="true" variant="dark" bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Symbol pair</th>
            <th>Volume</th>
            <th>Open Value</th>
            <th>Open At</th>
            <th>Result</th>
            <th>Close Trade</th>
          </tr>
        </thead>
        <tbody>
          {openedTrades
            .filter((trade) => trade.symbol === symbol)
            .map((trade, key) => (
              <tr key={key}>
                <th>{trade._id}</th>
                <th>{trade.type}</th>
                <th>{trade.symbol}</th>
                <th>{trade.volume.toFixed(2)}</th>
                <th>{trade.openValueTrade}</th>
                <th>{trade.openAt.toString()}</th>
                <th>
                  {trade.type == "buy"
                    ? (currency.bidPrice - trade.openValueTrade) *
                      (trade.volume * 100000)
                    : (trade.openValueTrade - currency.askPrice) *
                      (trade.volume * 100000)}
                </th>
                <th>
                  <Button
                    variant="danger"
                    onClick={() => {
                      CloseTrade(trade._id);
                    }}
                  >
                    Close Trade
                  </Button>
                </th>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
