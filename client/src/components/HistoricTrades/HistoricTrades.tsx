import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

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
}

export default function OpenedTableTrades({ trades }: ITradeProps) {
  const [historyTrades, setHistoryTrades] = useState<ITrade[]>([]);

  useEffect(() => {
    setHistoryTrades(trades);
    console.log(trades);
  }, [trades]);

  if (historyTrades.length <= 0)
    return (
      <div className="table-container no-value">
        <h3>Oh no! You don't have already trades.</h3>
        <h2>Let's start.</h2>
      </div>
    );
  return (
    <div className="table-container">
      <h1>All my trades</h1>
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
          {historyTrades.map((trade, key) => (
            <tr key={key}>
              <th>{trade._id}</th>
              <th>{trade.type}</th>
              <th>{trade.symbol}</th>
              <th>{trade.volume.toFixed(2)}</th>
              <th>{trade.openValueTrade}</th>
              <th>{trade.openAt.toString()}</th>
              <th>{trade.result}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
