import "./index.scss";
import OpenTrade from "../../components/OpenTrade/OpenTrade";
import { useEffect, useState } from "react";
import DepositModal from "../../components/DepositModal/DepositModal";
import { Table } from "react-bootstrap";
import getUserData from "./getUserData";

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

export default function Dashboard() {
  const [userData, setUserData] = useState<IUser>({
    name: "",
    email: "",
    wallet: 0,
    trades: [],
  });

  useEffect(() => {
    getUserData(localStorage.token).then(({ user, trades }: any) =>
      setUserData({
        name: user.name,
        email: user.email,
        wallet: user.wallet,
        trades: trades,
      })
    );
  }, []);

  return (
    <div className="bg-dark text-white page-container">
      <header className="header-dashboard">
        <h1>Forex Trading App</h1>
        <div className="user-personal-data">
          <div className="wallet">
            <span className="amount-value">$ {userData.wallet.toFixed(2)}</span>
            <DepositModal />
          </div>
          <span>Hello {userData.name}</span>
        </div>
      </header>
      <main>
        <OpenTrade />
      </main>
      <footer className="dashboard-footer table-responsive">
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
            </tr>
          </thead>
          <tbody>
            {userData.trades.map((trade, key) => (
              <tr key={key}>
                <th>{trade._id}</th>
                <th>{trade.type}</th>
                <th>{trade.symbol}</th>
                <th>{trade.volume.toFixed(2)}</th>
                <th>{trade.openValueTrade}</th>
                <th>{trade.openAt.toString()}</th>
                <th>{trade?.result}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </footer>
    </div>
  );
}
